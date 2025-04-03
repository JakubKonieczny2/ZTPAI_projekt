from rest_framework import serializers
from .models import User, Doctor, Appointments

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'role']

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = ['user', 'specialization']

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()
    patient = UserSerializer()

    class Meta:
        model = Appointments
        fields = ['id', 'doctor', 'patient', 'appointment_date', 'appointment_time', 'status']