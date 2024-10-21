from django.urls import path
from . import views

urlpatterns = [
    path('members/', views.get_members, name='get_members'),
    path('members/<int:pk>/', views.member_details, name='get_member'),
    path('members/add/', views.add_member, name='add_member'),
]
