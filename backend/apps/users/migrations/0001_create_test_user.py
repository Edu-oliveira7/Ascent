from django.conf import settings
from django.db import migrations


def create_carlos_user(apps, schema_editor):
    User = apps.get_model(settings.AUTH_USER_MODEL)
    if not User.objects.filter(username='Carlos').exists():
        User.objects.create_user(
            username='Carlos',
            email='carlos@example.com',
            password='Carlos123',
            first_name='Carlos',
            last_name='Silva'
        )


def delete_carlos_user(apps, schema_editor):
    User = apps.get_model(settings.AUTH_USER_MODEL)
    User.objects.filter(username='Carlos').delete()


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RunPython(create_carlos_user, reverse_code=delete_carlos_user),
    ]
