from django.contrib import admin
from django.conf.urls import include, url

from .views import login

urlpatterns = [
    url(r'^login/$', login, name='user_login'),

]
