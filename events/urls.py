from django.contrib import admin
from django.conf.urls import include, url

from .views import host_event

urlpatterns = [
    url(r'^host/$', host_event, name='host_event'),

]