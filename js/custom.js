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