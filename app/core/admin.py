"""
Django admin customization.
"""
from core import models
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserAdmin(BaseUserAdmin):
    """Defin the admin pages for users."""

    ordering = ["id"]
    list_display = ["email", "name"]


admin.site.register(models.User, UserAdmin)
