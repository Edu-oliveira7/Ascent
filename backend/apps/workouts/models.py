from django.db import models
from django.contrib.auth.models import User


class Workout(models.Model):

    DAYS_OF_WEEK = [
        ('SEG', 'Segunda'),
        ('TER', 'Terça'),
        ('QUA', 'Quarta'),
        ('QUI', 'Quinta'),
        ('SEX', 'Sexta'),
        ('SAB', 'Sábado'),
        ('DOM', 'Domingo'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="workouts"
    )

    name = models.CharField(max_length=100)
    day = models.CharField(
        max_length=20,
        choices=DAYS_OF_WEEK
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.name} ({self.get_day_display()})"
    
class Exercise(models.Model):
    workout = models.ForeignKey(
        Workout,
        on_delete=models.CASCADE,
        related_name="exercises"
    )
    name = models.CharField(max_length=100)
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.FloatField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.name} - {self.sets} sets x {self.reps} reps"
    
class WorkoutLog(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="workout_logs"
    )
    workout_protocol = models.ForeignKey(
        Workout, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )
    
    date = models.DateTimeField(auto_now_add=True)
    total_volume = models.FloatField(default=0.0) 
    duration_minutes = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['-date'] # Mais recentes primeiro no Dashboard

    def __str__(self):
        return f"Sessão em {self.date.strftime('%d/%m/%Y')} - {self.user.username}"

class ExerciseLog(models.Model):
    workout_log = models.ForeignKey(
        WorkoutLog, 
        on_delete=models.CASCADE, 
        related_name="exercise_logs"
    )
    # Referência ao exercício do protocolo
    exercise_template = models.ForeignKey(
        Exercise, 
        on_delete=models.SET_NULL, 
        null=True
    )
    
    # Dados reais do dia 
    name = models.CharField(max_length=100)
    sets_completed = models.IntegerField()
    reps_completed = models.IntegerField()
    weight_used = models.FloatField()

    def __str__(self):
        return f"{self.name} - {self.weight_used}kg"