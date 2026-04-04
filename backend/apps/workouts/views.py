from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Max
from .models import Workout, WorkoutLog
from .serializers import WorkoutSerializer, WorkoutLogSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WorkoutLogViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WorkoutLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # Métricas de performance do usuário
    @action(detail=False, methods=['get'])
    def stats(self, request):
        user = request.user
        last_7_days = timezone.now() - timedelta(days=7)
    
        # Consistência
        count_7_days = WorkoutLog.objects.filter(user=user, date__gte=last_7_days).count()
        
        total_volume = WorkoutLog.objects.filter(user=user).aggregate(Sum('total_volume'))['total_volume__sum'] or 0

        personal_record = WorkoutLog.objects.filter(user=user).aggregate(Max('exercise_logs__weight_used'))['exercise_logs__weight_used__max'] or 0

        return Response({
            "weekly_consistency": count_7_days,
            "total_volume_kg": total_volume,
            "personal_record": personal_record,
            "workouts_completed": WorkoutLog.objects.filter(user=user).count()
        })