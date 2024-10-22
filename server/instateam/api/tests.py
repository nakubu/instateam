from rest_framework import status
from rest_framework.test import APITestCase
from .models import Member

class MemberTests(APITestCase):
    def test_add_member(self):
        """
        Ensure we can create a new member object.
        """
        url = '/api/members/add/'
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john.doe@site.com',
            'phone': '123-456-7890',
            'role': 'regular'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Member.objects.count(), 1)
        self.assertEqual(Member.objects.get().first_name, 'John')

    def test_get_members(self):
        """
        Ensure we can get a list of members.
        """
        Member.objects.create(first_name='John', last_name='Doe', email='john.doe@site.com', phone='123-456-7890', role='admin')
        url = '/api/members/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_member_detail(self):
        """
        Ensure we can get a specific member's details.
        """
        member = Member.objects.create(first_name='Test', last_name='User', email='test.user@site.com', phone='123-456-7890', role='regular')
        url = f'/api/members/{member.id}/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'Test')

    def test_update_member(self):
        """
        Ensure we can update a member's information.
        """
        member = Member.objects.create(first_name='Test', last_name='User', email='test.user@site.com', phone='123-456-7890', role='regular')
        url = f'/api/members/{member.id}/'
        data = {
            'first_name': 'Updated',
            'last_name': 'Name',
            'email': 'updated.name@example.com',
            'phone': '999-888-7777',
            'role': 'admin'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        member.refresh_from_db()
        self.assertEqual(member.first_name, 'Updated')

    def test_delete_member(self):
        """
        Ensure we can delete a member.
        """
        member = Member.objects.create(first_name='Test', last_name='User', email='test.user@site.com', phone='123-456-7890', role='regular')
        url = f'/api/members/{member.id}/'
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Member.objects.count(), 0)
