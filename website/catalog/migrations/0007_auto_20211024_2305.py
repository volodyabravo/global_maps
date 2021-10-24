# Generated by Django 3.2.7 on 2021-10-24 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0006_auto_20211024_1756'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='ammo_id',
            field=models.IntegerField(blank=True, null=True, verbose_name='ammo lead id'),
        ),
        migrations.AddField(
            model_name='order',
            name='name',
            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='Name'),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'Created'), (2, 'Generated'), (3, 'Error')], default=1, verbose_name='Status'),
        ),
        migrations.AlterUniqueTogether(
            name='mapprices',
            unique_together={('size', 'version')},
        ),
    ]
