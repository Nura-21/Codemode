# Generated by Django 4.0.4 on 2022-05-01 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_money_type_money_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='codemodeuser',
            name='balance',
            field=models.IntegerField(default=0),
        ),
    ]
