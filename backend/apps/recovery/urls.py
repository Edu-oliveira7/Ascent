from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SleepLogViewSet, NutritionLogViewSet, RecoveryScoreViewSet

router = DefaultRouter()
router.register(r'sleep', SleepLogViewSet, basename='sleep')
router.register(r'nutrition', NutritionLogViewSet, basename='nutrition')
router.register(r'scores', RecoveryScoreViewSet, basename='recovery-score')

urlpatterns = [
    path('', include(router.urls)),
]
