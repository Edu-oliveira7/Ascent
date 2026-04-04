from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkoutViewSet, WorkoutLogViewSet

router = DefaultRouter()
router.register(r'', WorkoutViewSet, basename='workout')
router.register(r'logs', WorkoutLogViewSet, basename='workoutlog')

urlpatterns = [
    path('', include(router.urls)),
]