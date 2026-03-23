from rest_framework import serializers
from .models import Workout, Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'sets', 'reps', 'weight']

class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, required=False)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'day', 'exercises']
        read_only_fields = ['created_at']

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises', [])
        workout = Workout.objects.create(**validated_data)
        for exercise_data in exercises_data:
            Exercise.objects.create(workout=workout, **exercise_data)
        return workout