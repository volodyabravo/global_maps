# Generated by Django 3.2.7 on 2021-10-09 15:20

from django.db import migrations, models
import djmoney.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0002_auto_20211003_1706'),
    ]

    operations = [
        migrations.CreateModel(
            name='MapOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(choices=[(1, 'Created'), (2, 'Generated'), (3, 'Error')], default=0, verbose_name='Status')),
                ('date', models.DateTimeField(auto_now=True, verbose_name='Date and time')),
                ('data', models.JSONField(blank=True, null=True, verbose_name='JSON data')),
                ('image', models.ImageField(blank=True, upload_to='uploads/images/generated/', verbose_name='Generated image')),
            ],
        ),
        migrations.CreateModel(
            name='MapPrices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price_currency', djmoney.models.fields.CurrencyField(choices=[('EUR', 'EUR €'), ('USD', 'USD $'), ('RUB', 'Руб. ₽')], default='RUB', editable=False, max_length=3)),
                ('price', djmoney.models.fields.MoneyField(decimal_places=2, default_currency='RUB', max_digits=10, null=True, verbose_name='Price')),
                ('product', models.IntegerField(choices=[(1, 'Sky map'), (2, 'Street map')], default=0, unique=True, verbose_name='Map')),
            ],
        ),
        migrations.CreateModel(
            name='MapSize',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True, verbose_name='Is this active')),
                ('order', models.IntegerField(default=1, verbose_name='Position in list')),
                ('name', models.CharField(max_length=500, verbose_name='Name')),
                ('height', models.PositiveIntegerField(verbose_name='Height')),
                ('width', models.PositiveIntegerField(verbose_name='Width')),
                ('price_currency', djmoney.models.fields.CurrencyField(choices=[('EUR', 'EUR €'), ('USD', 'USD $'), ('RUB', 'Руб. ₽')], default='RUB', editable=False, max_length=3)),
                ('price', djmoney.models.fields.MoneyField(decimal_places=2, default_currency='RUB', max_digits=10, null=True, verbose_name='Price')),
            ],
        ),
        migrations.CreateModel(
            name='MapTheme',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True, verbose_name='Is this active')),
                ('order', models.IntegerField(default=1, verbose_name='Position in list')),
                ('product', models.IntegerField(choices=[(1, 'Sky map'), (2, 'Street map')], default=0, verbose_name='Map')),
                ('name', models.CharField(max_length=500, verbose_name='Name')),
                ('preview', models.ImageField(blank=True, upload_to='uploads/images/preview/', verbose_name='Preview image')),
                ('data', models.JSONField(blank=True, null=True, verbose_name='JSON data')),
            ],
        ),
        migrations.CreateModel(
            name='MapVersions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True, verbose_name='Is this active')),
                ('order', models.IntegerField(default=1, verbose_name='Position in list')),
                ('version', models.IntegerField(choices=[(1, 'Web version'), (2, 'Print version')], default=0, verbose_name='Map Producing Version')),
                ('price_currency', djmoney.models.fields.CurrencyField(choices=[('EUR', 'EUR €'), ('USD', 'USD $'), ('RUB', 'Руб. ₽')], default='RUB', editable=False, max_length=3)),
                ('price', djmoney.models.fields.MoneyField(decimal_places=2, default_currency='RUB', max_digits=10, null=True, verbose_name='Price')),
                ('name', models.CharField(max_length=500, verbose_name='Name')),
                ('image', models.ImageField(blank=True, upload_to='uploads/images/static/', verbose_name='Image')),
            ],
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='Size',
        ),
        migrations.DeleteModel(
            name='Theme',
        ),
    ]