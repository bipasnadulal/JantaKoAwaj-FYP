from authorities.models import Authority
def assign_authority(category):
    """
    Assigns the appropriate authority based on the complaint category selected by the user.
    """
    category = category.strip()
    authority_map = {
        "Public Infrastructure": "Municipality Office",
        "Environment": "Environment Agency",
        "Municipal Guard": "Nagar Prahari",
        "Education": "Education Office",
        "Agriculture and Livestocks": "Agriculture Department"
    }

    role = authority_map.get(category)
    if not role:
        raise ValueError(f"No authority mapping found for category '{category}'")

    # Use filter(...).first() to avoid MultipleObjectsReturned
    authority = Authority.objects.filter(role__iexact=role).first()
    if not authority:
        raise ValueError(f"No authority found for role '{role}' in category '{category}'")

    return authority

    