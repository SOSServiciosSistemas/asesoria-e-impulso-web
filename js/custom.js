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
    const mostrarCartel = false; 
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


    // =========================================
    // Lógica del Carrusel 3D (Autogenerado y Auto-scroll)
    // =========================================
    const carouselWrapper = document.getElementById('carousel-3d');
    
    if (carouselWrapper) {
        // LISTA DE IMÁGENES (agregar el nombre aquí cuando se tengan nuevas)
        const listaImagenes = [
            "IMG_4653.webp", "IMG_4654.webp", "IMG_4655.webp", "IMG_6440.webp", 
            "IMG_6445.webp", "IMG_6458.webp", "IMG_6465.webp", "IMG_6475.webp",
            "IMG_6484.webp", "IMG_6494.webp", "IMG_6497.webp", "IMG_6504.webp",
            "IMG_6524.webp", "IMG_6540.webp", "IMG_6549.webp", "IMG_6554.webp",
            "IMG_6561.webp", "IMG_6565.webp", "IMG_6570.webp", "IMG_6575.webp",
            "IMG_6578.webp", "IMG_6580.webp", "IMG_6582.webp", "IMG_6591.webp",
            "IMG_6613.webp", "IMG_6621.webp", "IMG_6634.webp", "IMG_6638.webp",
            "IMG_6642.webp", "IMG_6649.webp", "IMG_6653.webp"
        ];

        // CONSTRUIR EL HTML AUTOMÁTICAMENTE
        listaImagenes.forEach((nombreArchivo, index) => {
            const htmlCaja = `
            <div class="carousel-item">
                <div class="carousel-box">
                    <img src="img/Carrusel/${nombreArchivo}" alt="Proyecto ${index + 1}"/>
                </div>
            </div>`;
            carouselWrapper.insertAdjacentHTML('beforeend', htmlCaja);
        });

        // INICIALIZAR EL MOTOR DEL CARRUSEL (Versión Infinita)
        const $items = document.querySelectorAll('.carousel-item');
        $items.forEach(item => item.style.setProperty('--items', $items.length));

        let progress = 0;
        let startX = 0;
        let isDown = false;
        
        // Ajusta la velocidad
        const autoPlaySpeed = 0.02; 
        const speedWheel = 0.02;
        const speedDrag = -0.1;

        const animate = () => {
            // Truco matemático para crear un círculo infinito (mantiene el valor entre 0 y 100)
            progress = ((progress % 100) + 100) % 100; 
            
            // Índice de la foto que está al frente
            const active = Math.floor((progress / 100) * $items.length);
            const half = Math.floor($items.length / 2);

            $items.forEach((item, index) => {
                // Calcular distancia circular para que fluyan de un lado a otro sin cortarse
                let offset = index - active;
                if (offset > half) offset -= $items.length;
                else if (offset < -half) offset += $items.length;
                
                // Asignar profundidad (Z-index): El activo siempre está al frente
                const zIndex = $items.length - Math.abs(offset);
                
                item.style.setProperty('--zIndex', zIndex);
                item.style.setProperty('--active', offset / $items.length);
            });
        };
        
        animate();

        // Bucle infinito: avanza siempre hacia adelante
        const autoPlayLoop = () => {
            if (!isDown) { 
                progress += autoPlaySpeed;
                animate();
            }
            requestAnimationFrame(autoPlayLoop);
        };
        
        requestAnimationFrame(autoPlayLoop);

        // Controles de interacción
        $items.forEach((item, i) => {
            item.addEventListener('click', () => {
                // Al hacer clic, centrar la imagen calculando su posición
                progress = (i / $items.length) * 100;
                animate();
            });
        });

        const handleWheel = e => {
            e.preventDefault(); 
            const wheelProgress = e.deltaY * speedWheel;
            progress = progress + wheelProgress;
            animate();
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const mouseProgress = (x - startX) * speedDrag;
            progress = progress + mouseProgress;
            startX = x;
            animate();
        };

        const handleMouseDown = e => {
            isDown = true; 
            startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        };

        const handleMouseUp = () => {
            isDown = false; 
        };

        carouselWrapper.addEventListener('wheel', handleWheel, { passive: false });
        carouselWrapper.addEventListener('mousedown', handleMouseDown);
        carouselWrapper.addEventListener('touchstart', handleMouseDown, { passive: true });
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove, { passive: true });
        window.addEventListener('touchend', handleMouseUp);
    }