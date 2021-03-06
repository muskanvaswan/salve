# Generated by Django 3.1.5 on 2021-04-03 11:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_auto_20210403_1231'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='short description of interest name', max_length=80)),
                ('description', models.TextField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='The channel Character sequence or name', max_length=80)),
                ('number_of_users', models.IntegerField(default=0)),
                ('interests', models.ManyToManyField(blank=True, help_text='Interests asscociated with this channel', related_name='channels', to='chat.Interest')),
            ],
        ),
        migrations.AddField(
            model_name='message',
            name='channel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat.channel'),
        ),
    ]
