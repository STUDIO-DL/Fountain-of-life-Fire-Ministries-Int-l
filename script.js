// --- LÓGICA DEL MENÚ MÓVIL INTERACTIVO (ABRIR / CERRAR CON X) ---
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const navLinks = document.getElementById('navLinks');

// Abrir menú lateral al tocar las tres barras
mobileMenu.addEventListener('click', () => {
    navLinks.classList.add('active');
});

// Cerrar menú lateral al tocar la X
menuClose.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

// Opcional: Cerrar el menú automáticamente al hacer clic en cualquier enlace
const links = navLinks.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});


// --- LÓGICA DEL SLIDER NATIVO ---
const sliderContainer = document.getElementById('sliderContainer');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalSlides = slides.length;
let autoSlideInterval;

function updateSlider(index) {
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    sliderContainer.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    updateSlider(currentIndex + 1);
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    updateSlider(currentIndex - 1);
    resetAutoSlide();
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.getAttribute('data-index'));
        updateSlider(targetIndex);
        resetAutoSlide();
    });
});

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        updateSlider(currentIndex + 1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

startAutoSlide();
const images = ["photo1.jpg", "photo2.jpg", "photo3.jpg"];
let current = 0;

const mainImg = document.querySelector(".main-slide img");
const miniCards = document.querySelectorAll(".mini-card img");

function updateSlider(){
    mainImg.src = images[current];

    document.querySelectorAll(".mini-card").forEach(card=>{
        card.classList.remove("active");
    });

    document.querySelectorAll(".mini-card")[current].classList.add("active");
}

document.getElementById("nextBtn").onclick = () => {
    current = (current + 1) % images.length;
    updateSlider();
};

document.getElementById("prevBtn").onclick = () => {
    current = (current - 1 + images.length) % images.length;
    updateSlider();
};

setInterval(()=>{
    current = (current + 1) % images.length;
    updateSlider();
}, 4000);