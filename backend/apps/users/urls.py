from django.urls import path
from .views import RegisterUserView, CurrentUserView, LogoutView

urlpatterns = [
    path("register/", RegisterUserView.as_view()),
    path("me/", CurrentUserView.as_view()),
    path("logout/", LogoutView.as_view()),
]