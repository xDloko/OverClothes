document.addEventListener('DOMContentLoaded', function () {
    const btnCategorias = document.getElementById('mostrar-categorias');
    const categoriasMenu = document.querySelector('categorias-submenu');

    
    btnCategorias.addEventListener('click', function () {
        categoriasMenu.classList.toggle('visible'); 
    });

    
    document.addEventListener('click', function (event) {
        if (!btnCategorias.contains(event.target) && !categoriasMenu.contains(event.target)) {
            categoriasMenu.classList.remove('visible'); 
        }
    });
});
s