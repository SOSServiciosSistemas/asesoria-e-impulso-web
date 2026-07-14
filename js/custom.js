document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // Lógica del Menú Móvil y Navbar Animado
    // =========================================
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768 && navLinks) {
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

    // =========================================
    // Lógica del Cartel Emergente y Próximos Eventos
    // =========================================
    const welcomeBanner = document.getElementById('welcome-banner');
    const closeBannerBtn = document.getElementById('close-banner');

    // Panel de Control del Cartel
    const mostrarCartel = true; 
    const versionCartel = 'poster_agosto_2026'; 

    // Función reutilizable para abrir el cartel
    const openBanner = () => {
        if (welcomeBanner) {
            welcomeBanner.style.display = 'flex';
            // Pequeño delay para asegurar que el display 'flex' se aplique antes de quitar la clase hidden
            setTimeout(() => {
                welcomeBanner.classList.remove('hidden');
            }, 10);
        }
    };

    // Función reutilizable para cerrar el cartel
    const closeBanner = () => {
        if (welcomeBanner) {
            welcomeBanner.classList.add('hidden');
            // Guardamos en la sesión que ya se cerró
            sessionStorage.setItem(versionCartel, 'true');
            // Esperamos a que termine la animación en CSS antes de quitarlo del flujo
            setTimeout(() => {
                welcomeBanner.style.display = 'none';
            }, 300);
        }
    };

    if (welcomeBanner) {
        // Control inicial de carga de página
        if (!mostrarCartel || sessionStorage.getItem(versionCartel)) {
            welcomeBanner.style.display = 'none';
            welcomeBanner.classList.add('hidden'); // Asegura consistencia de clases
        } else {
            // Si es primera vez en la sesión, se muestra abierto por defecto
            openBanner();
        }

        // Asignar el evento de cerrar a la 'X'
        if (closeBannerBtn) {
            closeBannerBtn.addEventListener('click', closeBanner);
        }
    }

    // Evento para abrir el cartel desde las cajas de eventos
    const modalTriggers = document.querySelectorAll('.open-modal-btn');
    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                openBanner();
            });
        });
    }
});