# Generated by Django 3.2.7 on 2021-12-07 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0031_auto_20211206_0233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maporder',
            name='orientation',
            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='orientation'),
        ),
    ]
