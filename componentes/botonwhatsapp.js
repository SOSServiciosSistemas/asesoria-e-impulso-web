document.addEventListener("DOMContentLoaded", () => {
    // Inyecta FontAwesome si la página aún no lo tiene
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    // Inyecta los CSS del botón flotante
    const style = document.createElement('style');
    style.innerHTML = `
        /* Botón Principal Flotante */
        .btn-whatsapp-flotante { 
            position: fixed; 
            right: 20px; 
            bottom: 20px; 
            z-index: 9999; 
            width: 60px; 
            height: 60px; 
            border-radius: 50%; 
            background-color: #25D366; 
            color: white; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 32px; 
            text-decoration: none;
            animation: breathe 2s ease-in-out infinite; 
            transition: transform 0.3s ease, box-shadow 0.3s ease; 
            outline: none !important; 
            -webkit-tap-highlight-color: transparent; 
        }
        .btn-whatsapp-flotante i { 
            color: #fff; 
            animation: beat 2s ease-in-out infinite; 
        }
        .btn-whatsapp-flotante:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        }

        /* Keyframes de animación */
        @keyframes breathe { 
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); } 
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); } 
            100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); } 
        }
        @keyframes beat { 
            0% { transform: scale(1); } 
            50% { transform: scale(1.12); } 
            100% { transform: scale(1); } 
        }

        /* Responsivo */
        @media (max-width: 768px) { 
            .btn-whatsapp-flotante { right: 15px; bottom: 15px; width: 55px; height: 55px; font-size: 28px; } 
        }
    `;
    document.head.appendChild(style);

    // Texto prellenado convertido a formato URL (reemplaza espacios por %20, etc.)
    const mensaje = encodeURIComponent("Hola, me interesa conocer mas de Asesoria e Impulso, ¿podrían proporcionarme más información?");
    const numero = "5214775985500";

    // Inyecta la estructura HTML del botón
    const whatsappHTML = `
        <a href="https://wa.me/${numero}?text=${mensaje}" target="_blank" class="btn-whatsapp-flotante" aria-label="Contactar por WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
    `;
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);
});