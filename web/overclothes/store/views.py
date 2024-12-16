from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def main(request):
    template = loader.get_template('home/index.html')
    return HttpResponse(template.render())
    

