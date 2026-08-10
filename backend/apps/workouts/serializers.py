from rest_framework import serializers
from .models import Workout, Exercise, WorkoutLog, ExerciseLog


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'sets', 'reps', 'weight']

    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("O nome do exercício é obrigatório.")
        return value.strip()

    def validate_sets(self, value):
        if value is None or value <= 0:
            raise serializers.ValidationError("O número de séries deve ser maior que zero.")
        return value

    def validate_reps(self, value):
        if value is None or value <= 0:
            raise serializers.ValidationError("O número de repetições deve ser maior que zero.")
        return value

    def validate_weight(self, value):
        if value is None:
            return 0.0
        if value < 0:
            raise serializers.ValidationError("O peso não pode ser negativo.")
        return value

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

        if not name or not name.strip():
            raise serializers.ValidationError({ 'name': 'O nome do treino é obrigatório.' })
        if not day:
            raise serializers.ValidationError({ 'day': 'O dia do treino é obrigatório.' })

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
    
    def update(self, instance, validated_data):
        # Atualiza campos simples do treino
        exercises_data = validated_data.pop('exercises', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if exercises_data is not None:
            # Map existing exercises by id
            existing = {e.id: e for e in instance.exercises.all()}
            sent_ids = []

            for ex in exercises_data:
                ex_id = ex.get('id', None)
                if ex_id and ex_id in existing:
                    # update
                    obj = existing[ex_id]
                    obj.name = ex.get('name', obj.name)
                    obj.sets = ex.get('sets', obj.sets)
                    obj.reps = ex.get('reps', obj.reps)
                    obj.weight = ex.get('weight', obj.weight)
                    obj.save()
                    sent_ids.append(ex_id)
                else:
                    # create new
                    Exercise.objects.create(workout=instance, **ex)

            # delete removed exercises
            for ex_id, ex_obj in existing.items():
                if ex_id not in sent_ids:
                    ex_obj.delete()

        return instance
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

    def update(self, instance, validated_data):
        exercise_logs_data = validated_data.pop('exercise_logs', None)

        # Atualiza campos básicos (data, duração, etc)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if exercise_logs_data is not None:
            instance.exercise_logs.all().delete()
            
            volume_calculado = 0
            for log_data in exercise_logs_data:
                ExerciseLog.objects.create(workout_log=instance, **log_data)
                volume_calculado += (
                    log_data.get('weight_used', 0) * 
                    log_data.get('reps_completed', 0) * 
                    log_data.get('sets_completed', 0)
                )
            
            instance.total_volume = volume_calculado

        instance.save()
        return instance
    
