# Generated by Django 3.1.4 on 2020-12-20 07:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='parent',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='catalog.category'),
        ),
        migrations.AlterField(
            model_name='category',
            name='code',
            field=models.SlugField(blank=True),
        ),
    ]
