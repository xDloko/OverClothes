from django.urls import path
from . import views

urlpatterns = [
    path('Home/login', views.Login.as_view(), name='login'),

    path('Home/logout', views.Logout.as_view(), name='logout'),

    path('Home/', views.Home.as_view(), name='home'),
    path('categoria/<slug:categoria_slug>/', views.CategoriaDetalle.as_view(), name='categoria_detalle'),
    path('Home/profile', views.Profile.as_view(), name='profile'),
    path('Home/search', views.Search.as_view(), name='search'),
]