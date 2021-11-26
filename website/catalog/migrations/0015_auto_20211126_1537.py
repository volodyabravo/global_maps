# Generated by Django 3.2.7 on 2021-11-26 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0014_alter_vectorimages_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='delivery_type',
        ),
        migrations.AddField(
            model_name='order',
            name='delivery',
            field=models.IntegerField(blank=True, null=True, verbose_name='Delivery'),
        ),
        migrations.DeleteModel(
            name='DeliveryType',
        ),
    ]
