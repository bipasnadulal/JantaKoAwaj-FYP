
def assign_authority(category):
    """
    Assigns the appropriate authority based on the complaint category selected by the user.
    """

    authority_map={
        "Public Infrastructure": "Municipality Office",
        "Environment": "Environment Protection Agency",
        "Municipal Guard": "Local Police Department",
        "Education": "District Education Office",
        "Agriculture and Livestocks": "Agriculture Department"
    }

    assigned_authority = authority_map.get(category, "General Authority")

    return assigned_authority