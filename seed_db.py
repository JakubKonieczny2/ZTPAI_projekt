import os
import django
import random
from datetime import date, timedelta, time

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from api.models import User, Doctor, Appointments
from django.contrib.auth.hashers import make_password

Appointments.objects.all().delete()
Doctor.objects.all().delete()
User.objects.all().delete()

users_data = [
    {"first_name": "Kamil", "last_name": "Zdun", "email": "kamil@example.com", "password": make_password("password"), "role": "patient"},
    {"first_name": "Kuba", "last_name": "Nowak", "email": "kuba@example.com", "password": make_password("password"), "role": "doctor"},
    {"first_name": "admin", "last_name": "admin", "email": "admin@example.com", "password": make_password("admin"), "role": "admin"},
]

for i in range(4, 21):
    users_data.append({
        "first_name": f"Pacjent{i}",
        "last_name": f"Nazwisko{i}",
        "email": f"pacjent{i}@example.com",
        "password": make_password("password"),
        "role": "patient"
    })
for i in range(21, 31):
    users_data.append({
        "first_name": f"Lekarz{i}",
        "last_name": f"Nazwisko{i}",
        "email": f"lekarz{i}@example.com",
        "password": make_password("password"),
        "role": "doctor"
    })

users = [User.objects.create(**u) for u in users_data]

specializations = ["Kardiolog", "Chirurg", "Dermatolog", "Pediatra", "Ortopeda"]
doctors = []
for user in User.objects.filter(role="doctor"):
    spec = random.choice(specializations)
    doctors.append(Doctor.objects.create(user=user, specialization=spec))

for i in range(1, 31):
    doctor = random.choice(doctors)
    patient = random.choice(list(User.objects.filter(role="patient"))) if i % 3 == 0 else None
    status = "RESERVED" if patient else "AVAILABLE"
    Appointments.objects.create(
        doctor=doctor,
        patient=patient,
        appointment_date=date(2025, 5, 1) + timedelta(days=random.randint(0, 60)),
        appointment_time=time(hour=random.randint(8, 16), minute=0),
        status=status
    )

print("Baza danych została wypełniona przykładowymi danymi.")
