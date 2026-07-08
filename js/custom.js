document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animación básica de las barras
        menuToggle.classList.toggle('is-active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Efecto sombra en el navbar al hacer scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            navbar.style.height = '70px';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.height = '80px';
        }
    });
});