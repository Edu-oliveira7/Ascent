from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SleepLog, NutritionLog, RecoveryScore
from .serializers import SleepLogSerializer, NutritionLogSerializer, RecoveryScoreSerializer


class SleepLogViewSet(viewsets.ModelViewSet):
    serializer_class = SleepLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SleepLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NutritionLogViewSet(viewsets.ModelViewSet):
    serializer_class = NutritionLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return NutritionLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RecoveryScoreViewSet(viewsets.ModelViewSet):
    serializer_class = RecoveryScoreSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecoveryScore.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
