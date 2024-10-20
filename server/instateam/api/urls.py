from django.urls import path
from . import views

urlpatterns = [
    path('team_members/', views.get_team_members, name='get_team_members'),
    # path('team_members/<int:pk>/', views.get_team_member, name='get_team_member'),
    path('team_members/create/', views.create_team_member, name='create_team_member'),
]
