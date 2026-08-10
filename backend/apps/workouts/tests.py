from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import Workout, Exercise, WorkoutLog, ExerciseLog


class WorkoutModelTests(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='testuser', password='pass')

	def test_workout_str(self):
		w = Workout.objects.create(user=self.user, name='Full Body', day='SEG')
		self.assertIn('Full Body', str(w))

	def test_exercise_str(self):
		w = Workout.objects.create(user=self.user, name='Legs', day='TER')
		e = Exercise.objects.create(workout=w, name='Squat', sets=3, reps=8, weight=80.0)
		self.assertIn('Squat', str(e))

class WorkoutLogTests(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='logger', password='pass')
		self.workout = Workout.objects.create(user=self.user, name='Push', day='QUA')

	def test_workoutlog_and_exerciselog_creation(self):
		wl = WorkoutLog.objects.create(user=self.user, workout_protocol=self.workout, total_volume=100.0, duration_minutes=45)
		el = ExerciseLog.objects.create(workout_log=wl, exercise_template=None, name='Bench', sets_completed=3, reps_completed=8, weight_used=40.0)
		self.assertEqual(wl.exercise_logs.count(), 1)
		self.assertEqual(str(el), 'Bench - 40.0kg')

class WorkoutApiTests(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='apiuser', password='pass')
		self.client = APIClient()
		response = self.client.post('/api/token/', {'username': 'apiuser', 'password': 'pass'}, format='json')
		self.assertEqual(response.status_code, 200)
		self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")

	def test_workout_endpoints_require_authentication(self):
		unauthenticated_client = APIClient()
		response = unauthenticated_client.get('/api/workouts/')
		self.assertEqual(response.status_code, 401)

	def test_create_and_list_workout(self):
		payload = {
			'name': 'Full Body',
			'day': 'SEG',
			'exercises': [
				{'name': 'Supino', 'sets': 3, 'reps': 8, 'weight': 60.0},
			],
		}
		response = self.client.post('/api/workouts/', payload, format='json')
		self.assertEqual(response.status_code, 201)
		self.assertEqual(response.data['name'], 'Full Body')
		self.assertEqual(response.data['day_display'], 'Segunda')
		self.assertEqual(len(response.data['exercises']), 1)

		list_response = self.client.get('/api/workouts/')
		self.assertEqual(list_response.status_code, 200)
		self.assertEqual(len(list_response.data), 1)

	def test_stats_endpoint_returns_metrics(self):
		workout = Workout.objects.create(user=self.user, name='Push', day='TER')
		workout_log = WorkoutLog.objects.create(user=self.user, workout_protocol=workout, total_volume=100.0, duration_minutes=45)
		ExerciseLog.objects.create(workout_log=workout_log, exercise_template=None, name='Bench', sets_completed=3, reps_completed=8, weight_used=40.0)

		response = self.client.get('/api/workouts/logs/stats/')
		self.assertEqual(response.status_code, 200)
		self.assertIn('weekly_consistency', response.data)
		self.assertIn('total_volume_kg', response.data)
		self.assertIn('personal_record', response.data)
		self.assertEqual(response.data['workouts_completed'], 1)
