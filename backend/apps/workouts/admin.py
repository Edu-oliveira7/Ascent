from django.contrib import admin
from .models import Workout, Exercise, WorkoutLog, ExerciseLog


admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(WorkoutLog)
admin.site.register(ExerciseLog)