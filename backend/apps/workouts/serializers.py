from rest_framework import serializers
from .models import Workout, Exercise, WorkoutLog, ExerciseLog


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

    def validate(self, attrs):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        name = attrs.get('name')
        day = attrs.get('day')

        if user and name and day:
            existing = Workout.objects.filter(user=user, name=name, day=day)
            if self.instance:
                existing = existing.exclude(pk=self.instance.pk)
            if existing.exists():
                raise serializers.ValidationError("Já existe um treino com o mesmo nome e dia.")

        return attrs

    def create(self, validated_data):
        # Remove exercises da lista principal para criar o Workout primeiro
        exercises_data = validated_data.pop('exercises', [])
        workout = Workout.objects.create(**validated_data)

        for exercise_data in exercises_data:
            Exercise.objects.create(workout=workout, **exercise_data)
        return workout
    
class ExerciseLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseLog
        fields = ['id', 'exercise_template', 'name', 'sets_completed', 'reps_completed', 'weight_used']

class WorkoutLogSerializer(serializers.ModelSerializer):
    exercise_logs = ExerciseLogSerializer(many=True)
    date_display = serializers.DateTimeField(source='date', format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        model = WorkoutLog
        fields = ['id', 'workout_protocol', 'date', 'date_display', 'total_volume', 'duration_minutes', 'exercise_logs']
        read_only_fields = ['total_volume'] 

    def create(self, validated_data):
        exercise_logs_data = validated_data.pop('exercise_logs')
        
        volume_calculado = sum(
            log['weight_used'] * log['reps_completed'] * log['sets_completed'] 
            for log in exercise_logs_data
        )
        
        # 2. Criar a sessão de treino com o volume calculado
        workout_log = WorkoutLog.objects.create(
            total_volume=volume_calculado, 
            **validated_data
        )

        # 3. Criar os logs de cada exercício
        for log_data in exercise_logs_data:
            ExerciseLog.objects.create(workout_log=workout_log, **log_data)
            
        return workout_log
    
