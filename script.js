const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const mainImg = document.querySelector('.main-slide img');
const miniCards = document.querySelectorAll('.mini-card');

const SUPPORTED_LANGS = ['en', 'es', 'fr'];
const DEFAULT_LANG = 'es';
const languageDetails = {
    en: { label: 'EN', flag: '🇬🇧' },
    es: { label: 'ES', flag: '🇪🇸' },
    fr: { label: 'FR', flag: '🇫🇷' }
};

const translationsCache = {};
const defaultStrings = {};

function getLocaleBase() {
    return window.location.pathname.replace(/\\/g, '/').includes('/pages/')
        ? '../src/locales/'
        : 'src/locales/';
}

async function loadLocale(lang) {
    if (translationsCache[lang]) {
        return translationsCache[lang];
    }
    const response = await fetch(`${getLocaleBase()}${lang}.json`);
    if (!response.ok) {
        throw new Error(`Failed to load locale: ${lang}`);
    }
    translationsCache[lang] = await response.json();
    return translationsCache[lang];
}

async function ensureLocale(lang) {
    if (translationsCache[lang]) {
        return translationsCache[lang];
    }
    return loadLocale(lang);
}

async function ensureLocalesForLanguage(lang) {
    const langsToLoad = lang === DEFAULT_LANG
        ? [DEFAULT_LANG]
        : [lang, DEFAULT_LANG];

    await Promise.all(langsToLoad.map(ensureLocale));
}

function readElementDefault(el) {
    if (el.dataset.i18nAttr) {
        return (el.getAttribute(el.dataset.i18nAttr) || '').trim();
    }
    if (el.dataset.i18nHtml === 'true') {
        return el.innerHTML.replace(/\s+/g, ' ').trim();
    }
    return el.textContent.replace(/\s+/g, ' ').trim();
}

function captureDefaultsFromDOM() {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        if (!key) {
            return;
        }

        if (!el.dataset.i18nDefault) {
            const value = readElementDefault(el);
            if (value) {
                el.dataset.i18nDefault = value;
            }
        }

        if (el.dataset.i18nDefault) {
            defaultStrings[key] = el.dataset.i18nDefault;
        }
    });

    const titleEl = document.querySelector('title[data-i18n-key]');
    if (titleEl) {
        const key = titleEl.dataset.i18nKey;
        if (!titleEl.dataset.i18nDefault) {
            const value = titleEl.textContent.trim();
            if (value) {
                titleEl.dataset.i18nDefault = value;
            }
        }
        if (titleEl.dataset.i18nDefault) {
            defaultStrings[key] = titleEl.dataset.i18nDefault;
        }
    }
}

function getTranslation(lang, page, key) {
    if (lang === DEFAULT_LANG && defaultStrings[key]) {
        return defaultStrings[key];
    }

    const languagePack = translationsCache[lang] || translationsCache[DEFAULT_LANG] || {};
    const pageMap = languagePack[page] || {};
    const common = languagePack.common || {};

    if (key.startsWith('common.')) {
        const commonKey = key.slice('common.'.length);
        const commonValue = commonKey.split('.').reduce((obj, part) => (obj ? obj[part] : null), common);
        if (commonValue) {
            return commonValue;
        }
    }

    const pageKey = key.startsWith(`${page}.`) ? key.slice(page.length + 1) : key;
    const pageValue = pageKey.split('.').reduce((obj, part) => (obj ? obj[part] : null), pageMap);
    if (pageValue) {
        return pageValue;
    }

    const commonValue = key.split('.').reduce((obj, part) => (obj ? obj[part] : null), common);
    if (commonValue) {
        return commonValue;
    }

    if (lang !== DEFAULT_LANG) {
        const spanishPack = translationsCache[DEFAULT_LANG] || {};
        const spanishPageMap = spanishPack[page] || {};
        const spanishCommon = spanishPack.common || {};

        if (key.startsWith('common.')) {
            const commonKey = key.slice('common.'.length);
            const fallback = commonKey.split('.').reduce((obj, part) => (obj ? obj[part] : null), spanishCommon);
            if (fallback) {
                return fallback;
            }
        }

        const spanishPageKey = key.startsWith(`${page}.`) ? key.slice(page.length + 1) : key;
        const spanishPageValue = spanishPageKey.split('.').reduce((obj, part) => (obj ? obj[part] : null), spanishPageMap);
        if (spanishPageValue) {
            return spanishPageValue;
        }

        const spanishCommonValue = key.split('.').reduce((obj, part) => (obj ? obj[part] : null), spanishCommon);
        if (spanishCommonValue) {
            return spanishCommonValue;
        }
    }

    return defaultStrings[key] || null;
}

function getCurrentPage() {
    return document.body.dataset.page
        || window.location.pathname.split('/').pop().replace('.html', '')
        || 'index';
}

function translatePage(lang) {
    const page = getCurrentPage();
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        const translation = getTranslation(lang, page, key);
        if (!translation) {
            return;
        }
        if (el.dataset.i18nAttr) {
            el.setAttribute(el.dataset.i18nAttr, translation);
        } else if (el.dataset.i18nHtml === 'true') {
            el.innerHTML = translation;
        } else {
            el.textContent = translation;
        }
    });

    const titleEl = document.querySelector('title[data-i18n-key]');
    if (titleEl) {
        const titleTranslation = getTranslation(lang, page, titleEl.dataset.i18nKey);
        if (titleTranslation) {
            document.title = titleTranslation;
        }
    }
}

function setupLanguageSwitcher() {
    const langToggle = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');
    const langOptions = document.querySelectorAll('.lang-option');
    if (!langToggle || !langMenu || !langOptions.length) {
        return;
    }

    function closeLangMenu() {
        langMenu.classList.remove('active');
        langToggle.setAttribute('aria-expanded', 'false');
    }

    function openLangMenu() {
        langMenu.classList.add('active');
        langToggle.setAttribute('aria-expanded', 'true');
    }

    function updateLanguage(lang) {
        const details = languageDetails[lang] || languageDetails.es;
        langToggle.querySelector('.lang-flag').textContent = details.flag;
        langToggle.querySelector('.lang-label').textContent = details.label;
        localStorage.setItem('siteLanguage', lang);
        ensureLocalesForLanguage(lang)
            .then(() => translatePage(lang))
            .catch(error => console.error('Locale loading failed:', error));
        langOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });
    }

    const savedLang = localStorage.getItem('siteLanguage') || 'es';
    updateLanguage(savedLang);

    langToggle.addEventListener('click', () => {
        if (langMenu.classList.contains('active')) {
            closeLangMenu();
        } else {
            openLangMenu();
        }
    });

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            updateLanguage(option.dataset.lang);
            closeLangMenu();
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.lang-switcher')) {
            closeLangMenu();
        }
    });
}

function setupMenuToggle() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const navLinks = document.getElementById('navLinks');
    const langMenu = document.getElementById('langMenu');
    const langToggle = document.getElementById('langToggle');

    if (!mobileMenu || !menuClose || !navLinks) {
        return;
    }

    let overlay = document.getElementById('menuOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'menuOverlay';
        overlay.className = 'menu-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);
    }

    function openMenu() {
        navLinks.classList.add('active');
        mobileMenu.setAttribute('aria-expanded', 'true');
        menuClose.setAttribute('aria-hidden', 'false');
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');
        if (langMenu) {
            langMenu.classList.remove('active');
            if (langToggle) langToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
        menuClose.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
    }

    mobileMenu.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
        return;
    }

    const messageBox = document.getElementById('formMessage');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const lang = localStorage.getItem('siteLanguage') || 'es';
        const page = getCurrentPage();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !phone || !message) {
            messageBox.textContent = getTranslation(lang, page, 'contacto.errorRequired');
            messageBox.className = 'form-feedback error';
            return;
        }

        if (!emailRegex.test(email)) {
            messageBox.textContent = getTranslation(lang, page, 'contacto.errorEmail');
            messageBox.className = 'form-feedback error';
            return;
        }

        const defaultLabel = submitBtn.dataset.i18nKey
            ? getTranslation(lang, page, submitBtn.dataset.i18nKey)
            : submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = getTranslation(lang, page, 'contacto.sending');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, subject, message })
            });

            if (response.ok) {
                messageBox.textContent = getTranslation(lang, page, 'contacto.success');
                messageBox.className = 'form-feedback success';
                form.reset();
            } else {
                messageBox.textContent = getTranslation(lang, page, 'contacto.errorSend');
                messageBox.className = 'form-feedback error';
            }
        } catch {
            messageBox.textContent = getTranslation(lang, page, 'contacto.errorConnection');
            messageBox.className = 'form-feedback error';
        }

        submitBtn.disabled = false;
        submitBtn.textContent = defaultLabel;
    });
}

function setupMembershipForm() {
    const countrySelect = document.getElementById('country');
    const normalAddress = document.getElementById('normalAddress');
    const equatorialAddress = document.getElementById('equatorialAddress');
    if (!countrySelect || !normalAddress || !equatorialAddress) {
        return;
    }

    countrySelect.addEventListener('change', function () {
        const isEquatorial = this.value === 'Guinea Ecuatorial' || this.value === 'Equatorial Guinea' || this.value === 'Guinée équatoriale';
        normalAddress.classList.toggle('hidden', isEquatorial);
        equatorialAddress.classList.toggle('hidden', !isEquatorial);
    });
}

function setupHeroSlider() {
    if (!prevBtn || !nextBtn || !mainImg || !miniCards.length) {
        return;
    }

    const imageBasePath = window.location.pathname.replace(/\\/g, '/').includes('/pages/')
        ? '../src/images/'
        : 'src/images/';
    const photoNames = ['photo1', 'photo2', 'photo3'];
    const supportsWebp = document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp');
    const extension = supportsWebp ? 'webp' : 'jpg';
    const images = photoNames.map(name => `${imageBasePath}${name}.${extension}`);
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

function setupFlyerDialog() {
    const dialog = document.getElementById('flyerDialog');
    if (!dialog) {
        return;
    }

    const banner = document.querySelector('.ramas-flyer-banner');
    const openButtons = document.querySelectorAll('[data-flyer-open]');
    const closeButtons = document.querySelectorAll('[data-flyer-close]');

    function openDialog() {
        dialog.showModal();
    }

    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            openDialog();
        });
    });

    if (banner) {
        banner.addEventListener('click', (event) => {
            if (event.target.closest('[data-flyer-open]')) {
                return;
            }
            openDialog();
        });
    }

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => dialog.close());
    });

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}

async function initApp() {
    captureDefaultsFromDOM();
    setupMenuToggle();

    const savedLang = localStorage.getItem('siteLanguage') || DEFAULT_LANG;
    try {
        await ensureLocalesForLanguage(savedLang);
    } catch (error) {
        console.error('Locale loading failed:', error);
        if (!translationsCache[DEFAULT_LANG]) {
            await loadLocale(DEFAULT_LANG);
        }
    }

    setupLanguageSwitcher();
    setupContactForm();
    setupMembershipForm();
    setupHeroSlider();
    setupFlyerDialog();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
