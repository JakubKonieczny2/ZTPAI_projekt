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
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
    patient = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Appointments
        fields = ['id', 'doctor', 'patient', 'appointment_date', 'appointment_time', 'status']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['doctor'] = DoctorSerializer(instance.doctor).data
        rep['patient'] = UserSerializer(instance.patient).data if instance.patient else None
        return rep
