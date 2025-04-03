from django.urls import path
from .views import user_list, user_detail, doctor_list, doctor_detail, appointment_list, appointment_detail

urlpatterns = [
    path('users/', user_list, name='user-list'),  
    path('users/<int:pk>/', user_detail, name='user-detail'), 

    path('doctors/', doctor_list, name='doctor-list'),
    path('doctors/<int:pk>/', doctor_detail, name='doctor-detail'),

    path('appointments/', appointment_list, name='appointment-list'),
    path('appointments/<int:pk>/', appointment_detail, name='appointment-detail'),
]