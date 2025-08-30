from django.core.management.base import BaseCommand
from authorities.models import Authority
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = 'Create initial authorities'

    def handle(self, *args, **kwargs):
        authorities = [
            {"email": "edu@example.com", "password": "edu1234", "name": "Education Office", "role": "Education Office"},
            {"email": "infra@example.com", "password": "infra1234", "name": "Municipality Office", "role": "Municipality Office"},
            {"email": "env@example.com", "password": "env1234", "name": "Environment Agency", "role": "Environment Agency"},
            {"email": "agri@example.com", "password": "agri1234", "name": "Agriculture Department", "role": "Agriculture Department"},
            {"email": "guard@example.com", "password": "guard1234", "name": "Nagar Prahari", "role": "Nagar Prahari"},
        ]

        for a in authorities:
            if not Authority.objects.filter(email=a["email"]).exists():
                a["password"] = make_password(a["password"])  # ✅ hash password
                Authority.objects.create(**a)

        self.stdout.write(self.style.SUCCESS("Default authorities created (with hashed passwords)"))
