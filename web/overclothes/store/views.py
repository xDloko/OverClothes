from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views import View
import requests


#Api URL
api_url = 'http://localhost:3000/Prave/'

# Create your views here.
def main(request):
    template = loader.get_template('home/index.html')
    return HttpResponse(template.render())
    

class Home(View):
    template_name = 'home/index.html'
    def get(self, request, *args, **kwargs):
        producto_id = kwargs.get('producto_id')  
        response = requests.get(f"{self.api_url}{producto_id}/")

        if response.status_code == 200:
            producto = response.json()  
        else:
            producto = None  

        return render(request, self.template_name, {'producto': producto})
    