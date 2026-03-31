from rest_framework import serializers
from .models import Workout, Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'sets', 'reps', 'weight']

class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, required=False)
    day_display = serializers.CharField(source='get_day_display', read_only=True)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'day', 'day_display', 'exercises']

    def create(self, validated_data):
        # Remove exercises da lista principal para criar o Workout primeiro
        exercises_data = validated_data.pop('exercises', [])
        workout = Workout.objects.create(**validated_data)
        
        # Cria cada exercício vinculado ao novo Workout
        for exercise_data in exercises_data:
            Exercise.objects.create(workout=workout, **exercise_data)
        return workout