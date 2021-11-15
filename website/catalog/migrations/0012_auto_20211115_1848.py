# Generated by Django 3.2.7 on 2021-11-15 15:48

import colorfield.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0011_auto_20211115_0921'),
    ]

    operations = [
        migrations.CreateModel(
            name='VectorColors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True, verbose_name='Is this active')),
                ('order', models.IntegerField(default=1, verbose_name='Position in list')),
                ('color_background', colorfield.fields.ColorField(default='#FF0000', max_length=18)),
                ('color_vector', colorfield.fields.ColorField(default='#FF0000', max_length=18)),
                ('color_text', colorfield.fields.ColorField(default='#FF0000', max_length=18)),
            ],
            options={
                'verbose_name': 'Цвет векторной карты',
                'verbose_name_plural': 'Цвета векторных карт',
            },
        ),
        migrations.CreateModel(
            name='VectorImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True, verbose_name='Is this active')),
                ('order', models.IntegerField(default=1, verbose_name='Position in list')),
                ('image', models.ImageField(blank=True, upload_to='uploads/images/vectors/', verbose_name='Image')),
            ],
            options={
                'verbose_name': 'Изображение векторной карты',
                'verbose_name_plural': 'Изображения векторных карт',
            },
        ),
        migrations.AlterModelOptions(
            name='deliverytype',
            options={'verbose_name': 'Способ доставки', 'verbose_name_plural': 'Способы доставки'},
        ),
        migrations.AlterField(
            model_name='maptheme',
            name='image',
            field=models.ImageField(blank=True, upload_to='uploads/images/themes/', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='maptheme',
            name='product',
            field=models.IntegerField(choices=[(1, 'Sky map'), (2, 'Street map'), (3, 'Vector image')], default=1, verbose_name='Map'),
        ),
        migrations.AlterField(
            model_name='mapversions',
            name='image',
            field=models.ImageField(blank=True, upload_to='uploads/images/versions/', verbose_name='Image'),
        ),
    ]
