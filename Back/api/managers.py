from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.db.models import Sum


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, nickname, password=None, **kwargs):
        if not nickname:
            raise ValueError("Nickname must not be empty")

        user = self.model(nickname=nickname, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, nickname, password, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)

        if kwargs.get('is_staff') is False:
            raise ValueError('You must set is_staff to True')

        return self.create_user(nickname, password, **kwargs)


class MoneyManager(models.Manager):
    def count_sum(self):
        money = self.get_queryset()
        return money.aggregate(Sum('amount'))
