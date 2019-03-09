from django.contrib import admin
from django.conf.urls import include, url

from .views import login, index, ranking

urlpatterns = [
    url(r'^login/$', login, name='user_login'),
    url(r'^index/$', index, name='user_index' ),
    url(r'ranking/$', ranking, name='user_ranking'),

]
