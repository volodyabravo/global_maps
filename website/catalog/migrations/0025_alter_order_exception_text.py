# Generated by Django 3.2.7 on 2021-12-04 01:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0024_alter_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='exception_text',
            field=models.TextField(blank=True, max_length=5000, null=True, verbose_name='Exception'),
        ),
    ]
