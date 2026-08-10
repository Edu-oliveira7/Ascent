from django.db import models
from django.contrib.auth.models import User


class SleepLog(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sleep_logs"
    )
    date = models.DateField(auto_now_add=True)
    duration_hours = models.FloatField()  # Horas de sono
    quality = models.IntegerField(choices=[
        (1, 'Muito Ruim'),
        (2, 'Ruim'),
        (3, 'Normal'),
        (4, 'Bom'),
        (5, 'Excelente')
    ])
    notes = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-date']
        unique_together = ['user', 'date']

    def __str__(self):
        return f"Sono - {self.user.username} ({self.date}): {self.duration_hours}h"


class NutritionLog(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="nutrition_logs"
    )
    date = models.DateField(auto_now_add=True)
    meal_type = models.CharField(
        max_length=20,
        choices=[
            ('BREAKFAST', 'Café da Manhã'),
            ('LUNCH', 'Almoço'),
            ('SNACK', 'Lanche'),
            ('DINNER', 'Janta'),
            ('OTHER', 'Outro')
        ]
    )
    description = models.CharField(max_length=200)
    calories = models.IntegerField(blank=True, null=True)
    protein_g = models.FloatField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.get_meal_type_display()} - {self.user.username} ({self.date})"


class RecoveryScore(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="recovery_scores"
    )
    date = models.DateField(auto_now_add=True)
    energy_level = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)])  # 1-10
    muscle_soreness = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)])  # 1-10
    stress_level = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)])  # 1-10
    overall_recovery = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)])  # 1-10

    class Meta:
        ordering = ['-date']
        unique_together = ['user', 'date']

    def __str__(self):
        return f"Recuperação - {self.user.username} ({self.date}): {self.overall_recovery}/10"
