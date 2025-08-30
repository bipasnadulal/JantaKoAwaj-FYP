from .models import Authority

CATEGORY_TO_ROLE = {
    "Public Infrastructure": "infrastructure",
    "Environment": "environment",
    "Municipal Guard": "police",
    "Education": "education",
    "Agriculture and Livestocks": "agriculture",
}

def get_authorities_for_category(category: str):
    role = CATEGORY_TO_ROLE.get(category)
    if role:
        return Authority.objects.filter(role__iexact=role)
    return Authority.objects.none()

def assign_authority(category: str):
    authority_map = {
        "Public Infrastructure": "Municipality Office",
        "Environment": "Environment Agency",
        "Municipal Guard": "Nagar Prahari",
        "Education": "Education Office",
        "Agriculture and Livestocks": "Agriculture Department"
    }

    role_name = authority_map.get(category)
    if role_name:
        try:
            authority = Authority.objects.get(name__iexact=role_name)
        except Authority.DoesNotExist:
            authority = None
    else:
        authority = None

    return authority
