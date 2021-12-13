# Generated by Django 3.2.7 on 2021-12-13 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0036_alter_maporder_exception_text'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='surname',
        ),
        migrations.AlterField(
            model_name='maporder',
            name='date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Date and time'),
        ),
        migrations.AlterField(
            model_name='order',
            name='delivery_price',
            field=models.IntegerField(default=0, verbose_name='Delivery price'),
        ),
    ]
