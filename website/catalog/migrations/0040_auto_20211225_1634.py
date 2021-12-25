# Generated by Django 3.2.7 on 2021-12-25 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0039_mapversions_sizes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mapversions',
            name='sizes',
        ),
        migrations.AddField(
            model_name='mapsize',
            name='versions',
            field=models.ManyToManyField(to='catalog.MapVersions'),
        ),
    ]