
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
# Register your models here.

class CustomUserAdmin(UserAdmin):
    # Add additional fields here if you have added any
    # For exam
    list_display = ('username', 'email', 'first_name', 'last_name', 'subscription', 'customer')
    pass

admin.site.register(CustomUser,CustomUserAdmin)