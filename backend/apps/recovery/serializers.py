from rest_framework import serializers
from .models import SleepLog, NutritionLog, RecoveryScore


class SleepLogSerializer(serializers.ModelSerializer):
    quality_display = serializers.CharField(source='get_quality_display', read_only=True)

    class Meta:
        model = SleepLog
        fields = ['id', 'date', 'duration_hours', 'quality', 'quality_display', 'notes']


class NutritionLogSerializer(serializers.ModelSerializer):
    meal_type_display = serializers.CharField(source='get_meal_type_display', read_only=True)

    class Meta:
        model = NutritionLog
        fields = ['id', 'date', 'meal_type', 'meal_type_display', 'description', 'calories', 'protein_g', 'notes']


class RecoveryScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryScore
        fields = ['id', 'date', 'energy_level', 'muscle_soreness', 'stress_level', 'overall_recovery']
