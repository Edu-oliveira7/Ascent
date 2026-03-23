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