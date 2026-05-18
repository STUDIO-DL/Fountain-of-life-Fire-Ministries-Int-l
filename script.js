const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const mainImg = document.querySelector('.main-slide img');
const miniCards = document.querySelectorAll('.mini-card');

function setupMenuToggle() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenu || !menuClose || !navLinks) {
        return;
    }

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.add('active');
    });

    menuClose.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

setupMenuToggle();

if (prevBtn && nextBtn && mainImg && miniCards.length) {
    const images = ['../images/photo1.jpg', '../images/photo2.jpg', '../images/photo3.jpg'];
    let current = 0;

    function updateSlider() {
        mainImg.src = images[current];
        miniCards.forEach(card => card.classList.remove('active'));
        miniCards[current].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % images.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        updateSlider();
    });

    updateSlider();
    setInterval(() => {
        current = (current + 1) % images.length;
        updateSlider();
    }, 4000);
}