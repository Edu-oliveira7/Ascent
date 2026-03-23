from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Workout
from .serializers import WorkoutSerializer
from .permissions import IsOwner

class WorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)