from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Member
from .serializers import MemberSerializer

@api_view(['GET'])
def get_members(request):
    members = Member.objects.all()
    serializer = MemberSerializer(members, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_member(request):
    serializer = MemberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def member_details(request, pk):
    try:
        member = Member.objects.get(id=pk)
    except Member.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MemberSerializer(member)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = MemberSerializer(member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
