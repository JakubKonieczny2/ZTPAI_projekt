from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Doctor, Appointments
from .serializers import UserSerializer, DoctorSerializer, AppointmentSerializer

# Widoki dla User

@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Utworzono użytkownika",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "error": "Nie można utworzyć użytkownika",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"error": "Użytkownik nie istnieje"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Zaktualizowano użytkownika",
                "data": serializer.data
            })
        return Response({
            "error": "Błąd podczas aktualizacji użytkownika",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response({"message": "Usunięto użytkownika"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.get(email=email)
        if check_password(password, user.password):
            return Response({
                "message": "Zalogowano pomyślnie",
                "user": UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Nieprawidłowe hasło"}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({"error": "Użytkownik nie istnieje"}, status=status.HTTP_404_NOT_FOUND)

# Widoki dla Doctor

@api_view(['GET', 'POST'])
def doctor_list(request):
    if request.method == 'GET':
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Utworzono lekarza",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "error": "Nie można utworzyć lekarza",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def doctor_detail(request, pk):
    try:
        doctor = Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        return Response({"error": "Lekarz nie istnieje"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = DoctorSerializer(doctor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Zaktualizowano lekarza",
                "data": serializer.data
            })
        return Response({
            "error": "Błąd podczas aktualizacji lekarza",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        doctor.delete()
        return Response({"message": "Usunięto lekarza"}, status=status.HTTP_204_NO_CONTENT)

# Widoki dla Appointment

@api_view(['GET', 'POST'])
def appointment_list(request):
    if request.method == 'GET':
        appointments = Appointments.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Utworzono wizytę",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "error": "Nie można utworzyć wizyty",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def appointment_detail(request, pk):
    try:
        appointment = Appointments.objects.get(pk=pk)
    except Appointments.DoesNotExist:
        return Response({"error": "Wizyta nie istnieje"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        partial = request.method == 'PATCH'
        serializer = AppointmentSerializer(appointment, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Zaktualizowano wizytę",
                "data": serializer.data
            })
        return Response({
            "error": "Błąd podczas aktualizacji wizyty",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        appointment.delete()
        return Response({"message": "Usunięto wizytę"}, status=status.HTTP_204_NO_CONTENT)
