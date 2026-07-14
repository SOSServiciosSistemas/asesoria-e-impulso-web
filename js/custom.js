document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('solid-nav');
        } else {
            navbar.classList.remove('solid-nav');
        }
    });
});

// =========================================
    // Lógica del Cartel Emergente (Póster)
    // =========================================
    const welcomeBanner = document.getElementById('welcome-banner');
    const closeBannerBtn = document.getElementById('close-banner');

    // 🔴 PANEL DE CONTROL DEL PÓSTER 🔴
    // CambiaR a 'false' para apagar el cartel cuando no haya eventos.
    const mostrarCartel = true; 
    
    // Cambiar este nombre cada vez que subas un póster nuevo (ej. 'poster_septiembre', 'poster_promo1').
    // Esto fuerza a que los usuarios que ya cerraron el viejo, vean el nuevo.
    const versionCartel = 'poster_agosto_2026'; 

    if (welcomeBanner) {
        // Si mostrarCartel es falso, o si el usuario ya cerró esta versión específica, lo ocultamos.
        if (!mostrarCartel || sessionStorage.getItem(versionCartel)) {
            welcomeBanner.style.display = 'none';
        } else {
            // Función para cerrar el cartel
            const closeBanner = () => {
                welcomeBanner.classList.add('hidden');
                sessionStorage.setItem(versionCartel, 'true');
                setTimeout(() => {
                    welcomeBanner.style.display = 'none';
                }, 300);
            };

            // Activar botón de cierre
            if (closeBannerBtn) {
                closeBannerBtn.addEventListener('click', closeBanner);
            }
        }
    }