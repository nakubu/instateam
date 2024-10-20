from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import TeamMember
from .serializers import TeamMemberSerializer

@api_view(['GET'])
def get_team_members(request):
    team_members = TeamMember.objects.all()
    serializer = TeamMemberSerializer(team_members, many=True)
    return Response(serializer.data)

# @api_view(['GET'])
# def get_team_member(request, pk):
#     team_member = TeamMember.objects.get(id=pk)
#     serializer = TeamMemberSerializer(team_member, many=False)
#     return Response(serializer.data)

@api_view(['POST'])
def create_team_member(request):
    serializer = TeamMemberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
