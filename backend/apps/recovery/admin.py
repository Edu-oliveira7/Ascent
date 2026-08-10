from django.contrib import admin
from .models import SleepLog, NutritionLog, RecoveryScore


class SleepLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'duration_hours', 'quality')
    list_filter = ('date', 'quality')
    search_fields = ('user__username',)


class NutritionLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'meal_type', 'description', 'calories')
    list_filter = ('date', 'meal_type')
    search_fields = ('user__username', 'description')


class RecoveryScoreAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'energy_level', 'muscle_soreness', 'stress_level', 'overall_recovery')
    list_filter = ('date',)
    search_fields = ('user__username',)


admin.site.register(SleepLog, SleepLogAdmin)
admin.site.register(NutritionLog, NutritionLogAdmin)
admin.site.register(RecoveryScore, RecoveryScoreAdmin)
