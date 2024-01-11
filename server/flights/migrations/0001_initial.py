# Generated by Django 5.0.1 on 2024-01-11 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('state', models.CharField(choices=[('Pre-Flight', 'Pre Flight'), ('In-Flight', 'In Flight'), ('Post-Flight', 'Post Flight')], default='Pre-Flight', max_length=20)),
            ],
        ),
    ]