# Generated by Django 3.2.7 on 2021-12-29 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0042_alter_order_payment_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='mapversions',
            name='bottompic',
            field=models.ImageField(blank=True, upload_to='uploads/images/versions/bottompic/', verbose_name='Image bottom'),
        ),
    ]
