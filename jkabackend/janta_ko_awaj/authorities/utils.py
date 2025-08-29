from authorities.models import Authority

CATEGORY_TO_ROLE ={
    "Public Infrastructure": "infrastructure",
    "Environment": "environment",
    "Municipal Guard": "police",
    "Education": "education",
    "Agriculture and Livestocks": "agriculture",
}

def get_authorities_for_category(category: str):
    """Return a queryset of Authority objects that should get this category’s complaints."""
    role = CATEGORY_TO_ROLE.get(category)
    if role:
        return Authority.objects.filter(role__iexact=role)
    # fallback: notify all authorities (or none)
    return Authority.objects.none()
