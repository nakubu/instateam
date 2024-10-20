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

# @api_view(['GET'])
# def get_member(request, pk):
#     member = Member.objects.get(id=pk)
#     serializer = MemberSerializer(member, many=False)
#     return Response(serializer.data)

@api_view(['POST'])
def create_member(request):
    serializer = MemberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
