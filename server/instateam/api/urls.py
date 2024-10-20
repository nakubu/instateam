from django.urls import path
from . import views

urlpatterns = [
    path('members/', views.get_members, name='get_members'),
    # path('members/<int:pk>/', views.get_member, name='get_member'),
    path('members/create/', views.create_member, name='create_member'),
]
