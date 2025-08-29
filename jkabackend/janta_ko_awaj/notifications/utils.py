from django.conf import settings
from django.core.mail import send_mail
from notifications.models import Notification
from authorities.utils import get_authorities_for_category


def notify_user(user, complaint, message: str):
    Notification.objects.create(
        recipient_user=user,
        complaint=complaint,
        message=message
    )

def notify_authority(authority, complaint, message: str):
    Notification.objects.create(
        recipient_authority=authority,
        complaint=complaint,
        message=message
    )

def notify_assigned_authorities_for_complaint(complaint):
    """Notify relevant authorities when a complaint is assigned (or classified genuine)."""
    for auth in get_authorities_for_category(complaint.category):
        notify_authority(
            authority=auth,
            complaint=complaint,
            message=f"New complaint assigned: '{complaint.title}' in {complaint.municipality}, {complaint.district}."
        )

def notify_vote_thresholds(complaint, agree_votes: int, total_votes: int):
    """
    Notify when agree % crosses thresholds (25, 50, 80).
    Uses complaint.last_threshold_notified to avoid duplicate alerts.
    """
    if total_votes == 0:
        return

    pct = int((agree_votes / total_votes) * 100)
    thresholds = [25, 50, 80]

    # to avoid circular import issues 
    from complaints.models import Complaint
    last = getattr(complaint, "last_threshold_notified", 0)
    fire = None
    for t in thresholds:
        if pct >= t and last < t:
            fire = t
    if not fire:
        return

    # Notify authorities
    for auth in get_authorities_for_category(complaint.category):
        notify_authority(
            authority=auth,
            complaint=complaint,
            message=f"Complaint '{complaint.title}' reached {fire}% community support. Please review."
        )

    # Notify user
    notify_user(
        user=complaint.user,
        complaint=complaint,
        message=f"Your complaint '{complaint.title}' reached {fire}% support."
    )

    # media alert at >= 80%
    if fire >= 80:
        try:
            send_mail(
                subject=f"[Media Alert] High support complaint: {complaint.title}",
                message=f"Complaint '{complaint.title}' in {complaint.municipality}, {complaint.district} reached {pct}% support.",
                from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
                recipient_list=getattr(settings, "MEDIA_ALERT_EMAILS", []),
                fail_silently=True,
            )
        except Exception:
            pass

    # persist last fired threshold
    Complaint.objects.filter(pk=complaint.pk).update(last_threshold_notified=fire)
