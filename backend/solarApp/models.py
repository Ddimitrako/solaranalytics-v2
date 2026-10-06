from django.db import models
from django.contrib.auth.models import AbstractUser
from djstripe.models import Customer, Subscription, Product


# Create your models here.
class CustomUser(AbstractUser):
  subscription = models.ForeignKey(Subscription, null=True, blank=True,on_delete=models.SET_NULL)
  customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.SET_NULL)
  product = models.ForeignKey(Product,null=True, blank=True,on_delete=models.SET_NULL )
  analysis_requests = models.IntegerField(default=0)
  max_analysis_requests = models.IntegerField(default=3)
  class Meta:
    verbose_name = 'Custom User'
    verbose_name_plural = 'Custom Users'




