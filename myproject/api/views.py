from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  
    serializer_class = UserSerializer
