from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.template import loader
from django.views import View
import requests


#Api URL
api_url = 'http://localhost:3000/OverClothes/'

# Create your views here.
def main(request):
    template = loader.get_template('home/index.html')
    return HttpResponse(template.render())
    

class Home(View):
    template_name = 'home/index.html' 
    api_url = 'http://localhost:3000/OverClothes/allproducts'
    def get(self, request, *args, **kwargs):
        
        producto_id = kwargs.get('producto_id')
        if not producto_id:
            response = requests.get(f"{self.api_url}")
        else:
            response = requests.get(f"{self.api_url}/{producto_id}")

        if response.status_code == 200:
            data = response.json()
            productos = data.get("body", []) #Obtiene los productos devueltos por la api
        else:
            productos = None
        oferts = []
        for x in productos:
            if x['offer'] == 1:
                oferts.append(x)
            #limite a la cantidad de x de items a mostrarse en la pagina sin el buscador:
            if len(oferts) >= 10:
                break

        categ = {'Camiseta', 'Pantalon'}

    

        return render(request, self.template_name, {
            'productos': productos,
            'oferts': oferts,
            'token': bool(request.session.get('token')),
            'categorias':  categ
        })
    

class Login(View):
    template_name = 'login/login.html' 
    api_url = 'http://localhost:3000/OverClothes' 

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    
    def post(self, request, *args, **kwargs):

        if request.POST.get('type') == 'login':
            email = request.POST.get('email')
            password = request.POST.get('password')

            payload = {
                'email': email,
                'password': password,
            }
            
            response = requests.post(f"{self.api_url}/login", json=payload)
            if response.status_code == 200:
                data = response.json()
                user_data = data.get('body', {}).get('user')
                token = data.get('body', {}).get('token')
                if token:
                    request.session['token'] = token  
                    request.session['user'] = user_data  
                    
                    return redirect('/Home')

                else:
                    return render(request, self.template_name, {'error': 'Error al obtener el token.'})
            else:
                return render(request, self.template_name, {'error': 'Credenciales inválidas. Por favor, intenta nuevamente.'})
        
        else:
            name = request.POST.get('name')
            email = request.POST.get('email')
            password = request.POST.get('password')

            payload = {
                'name': name,
                'email': email,
                'password': password,
            }

            response = requests.post(f"{self.api_url}/register", json=payload)
            if response.status_code == 200:
                data = response.json()
                
                return render(request, self.template_name, {'message': 'Usuario creado exitosamente'})
            else:
                return render(request, self.template_name, {'error': 'Error al crear el usuario.'})
        
class Logout(View):
    template_name = 'login/login.html' 
    api_url = 'http://localhost:3000/OverClothes' 
    
    def get(self, request, *args, **kwargs):
        if request.session.get('token'):
            payload = {'token': request.session['token']}
            requests.post(f"{self.api_url}/logout", json=payload)
            del request.session['token']
            del request.session['user']
            print('Sesión cerrada')
            return redirect('home')
        return redirect('login')

class Profile(View):
    template_name = 'profile/profile.html' 
    api_url = 'http://localhost:3000/OverClothes' 

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {
            'user': request.session.get('user'),
            'token': bool(request.session.get('token')),
        })

    

        

class Search(View):
    template_name = 'home/search.html' 
    api_url = 'http://localhost:3000/OverClothes/allproducts' 
    def get(self, request, *args, **kwargs):
        
        producto_id = kwargs.get('producto_id')
        if not producto_id:
            response = requests.get(f"{self.api_url}")
        else:
            response = requests.get(f"{self.api_url}/{producto_id}")

        if response.status_code == 200:
            data = response.json()
            productos = data.get("body", []) 
        else:
            productos = None
        oferts = []
        for x in productos:
            if x['offer'] == 1:
                oferts.append(x)
            #limite a la cantidad de x de items a mostrarse en la pagina sin el buscador:
            if len(oferts) >= 10:
                break

        categ = {'Camiseta', 'Pantalon'}
        
        return render(request, self.template_name, {'productos': productos, 'oferts': oferts, 'categorias':  categ})

class CategoriaDetalle(View):
    template_name = 'home/categoria_detalle.html'  
    api_url = 'http://localhost:3000/OverClothes/categories' 

    def get(self, request, *args, **kwargs):
        
        categ = {'Camiseta', 'Pantalon'}
        return render(request, self.template_name, {'categorias':  categ})