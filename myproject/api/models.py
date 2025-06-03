from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    ROLES = (
        ('admin', 'admin'),
        ('doctor', 'doctor'),
        ('patient', 'patient'),
    )

    username = None
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLES, default='patient')

    class Meta:
        db_table = 'users'

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_') and not self.password.startswith('bcrypt_'):
            self.password = make_password(self.password)
        if self.role:
            self.role = self.role.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    specialization = models.CharField(max_length=100)

    class Meta:
        db_table = 'doctors'

    def __str__(self):
        return f"Dr. {self.user.last_name} - {self.specialization}"

class Appointments(models.Model):
    STATUS_CHOICES = (
        ('RESERVED', 'RESERVED'),
        ('AVAILABLE', 'AVAILABLE'),
    )

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='doctor_appointments')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_appointments', null=True, blank=True)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='AVAILABLE')

    class Meta:
        db_table = 'appointments'
