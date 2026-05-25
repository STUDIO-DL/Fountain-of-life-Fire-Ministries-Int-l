const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const mainImg = document.querySelector('.main-slide img');
const miniCards = document.querySelectorAll('.mini-card');

const languageDetails = {
    en: { label: 'EN', flag: '🇬🇧' },
    es: { label: 'ES', flag: '🇪🇸' },
    fr: { label: 'FR', flag: '🇫🇷' }
};

const translations = {
    en: {
        common: {
            nav: {
                home: 'Home',
                about: 'About Us',
                services: 'Services',
                events: 'Events',
                branches: 'Branches',
                social: 'Social Media',
                testimony: 'Testimonies',
                contact: 'Contact'
            },
            langEnglish: 'English',
            langSpanish: 'Español',
            langFrench: 'Français',
            chooseLanguage: 'Language',
            openMenu: 'Open menu',
            closeMenu: 'Close menu',
            brand: "Fountain of Life Fire Ministries Int'l (N.V.C)",
            copyright: '© 2026 Fountain of Life Fire Ministries Int\'l (N.V.C)'
        },
        nav: {
            home: 'Home',
            about: 'About Us',
            services: 'Services',
            events: 'Events',
            branches: 'Branches',
            social: 'Social Media',
            testimony: 'Testimonies',
            contact: 'Contact'
        },
        index: {
            hero: {
                tag: 'Spirit · Community · Renewal',
                title: 'Experience a real encounter with God',
                text: 'Discover our services, activities, and gatherings designed to inspire, heal, and renew your faith. Each image reflects the strength and unity of a modern spiritual family.',
                btnJoin: 'Join Now',
                btnBranches: 'Find a Branch'
            },
            vision: {
                text: 'At Fountain of Life Fire Ministry Int\'l we believe in the transforming power of God’s presence. We are a house of worship, restoration, and spiritual revival. Here lives are renewed, hearts are ignited, and destinies are restored. We raise a generation full of faith, purpose, and passion for Christ. This is a place where the fountain of life never stops flowing.',
                btnReadMore: 'Read More'
            },
            services: {
                sectionSpan: 'Join us in worship',
                sectionTitle: 'Service Schedule'
            },
            welcome: {
                tag: 'WELCOME',
                title: 'New Here?',
                text: 'We would love to meet you, walk with you, and help you take your first steps into this family of faith.',
                btn: 'I’m new here'
            },
            gallery: {
                card1: { tag: 'Live Service', title: 'Message of Faith and Power' },
                card2: { tag: 'Gathering', title: 'Voice of Revival' },
                card3: { tag: 'Healing', title: 'Healing Prayer' },
                card4: { tag: 'Youth', title: 'Family Worship' },
                card5: { tag: 'Congregation', title: 'Worship Service' }
            },
            serviceCards: {
                card1: { title: 'Sunday Worship Service', timezone: 'Timezone: GMT+1', detail1Label: '1st Service:', detail1Value: '8:00 am - 10:00 am', detail2Label: '2nd Service:', detail2Value: '10:00 am - 12:00 pm' },
                card2: { title: 'Bible Study', timezone: 'Timezone: GMT+1', detailLabel: 'Every Monday:', detailValue: '5:00 pm - 6:30 pm' },
                card3: { title: 'Healing Service', timezone: 'Timezone: GMT+1', detailLabel: 'Every Tuesday:', detailValue: '9:00 am' },
                card4: { title: 'Deliverance Service', timezone: 'Timezone: GMT+1', detailLabel: 'Every Thursday:', detailValue: '5:00 pm - 6:30 pm' },
                card5: { title: 'Youth Meeting', timezone: 'Timezone: GMT+1', detailLabel: 'Every Saturday:', detailValue: '3:00 pm' }
            },
            testimonyCard: {
                tag: 'LIVES TRANSFORMED',
                title: 'Faith Testimonials',
                text: 'Discover real stories of healing, restoration, and miracles God has done in our congregation.',
                link: 'View testimonies'
            },
            upcomingCard: {
                tag: 'UPCOMING EVENTS',
                title: 'Upcoming Programs',
                text: 'Discover the next programs and activities of our community to join and grow in faith.',
                link: 'View events'
            },
            branchCard: {
                tag: 'NEAR YOU',
                title: 'Find a Branch',
                text: 'Locate the nearest branch and join us in person for our services, meetings and spiritual activities.',
                link: 'Search branch'
            }
        },
        conocenos: {
            heroTitle: 'About Us',
            heroText: 'We are a spiritual family called to preach salvation by demonstrating the power of God. Here you will discover who we are, why we exist, and how we work to restore destinies in the name of Jesus Christ.',
            section1Title: '1. Who we are',
            section1Text: 'We are Fountain of life, Fire ministry, the church of Christ entrusted to preach salvation by demonstrating the power of God. We are not just a meeting place: we are a house where the Word is preached and the power of God is manifested to transform real lives.',
            section1Highlight: 'Fountain of life, Fire ministry',
            section2Title: '2. Why we exist / Our mission',
            section2Text: 'Our mission is to reveal Jesus and restore people’s destinies. We saw that many know God from afar, but do not experience His power to overcome oppression, heal their families, and walk in purpose. That is why we bring the word of salvation focused on deliverance, prosperity, and the establishment of marriages according to God’s design.',
            section2Highlight: 'Our mission is to reveal Jesus and restore people’s destinies',
            section3Title: '3. What sets us apart',
            section3Text: 'In line with the divine calling of our spiritual father, we work in:',
            section3Item1Highlight: 'Deliverance',
            section3Item1Text: 'We minister to break spiritual chains that hold back your progress.',
            section3Item2Highlight: 'Biblical prosperity',
            section3Item2Text: 'We teach you to walk in provision and purpose, not in lack.',
            section3Item3Highlight: 'Marriage establishment',
            section3Item3Text: 'We support families and couples to restore their home according to God’s plan.',
            section3Closing: 'All under the direction of the call of our spiritual father.',
            section4Title: '4. Leadership',
            section4Text: 'We are under the coverage and direction of spiritual father',
            section4Highlight: 'Rev. Anthony Ifesinachi O.',
            section4TextRest: 'You can learn more about his ministry and daily word on his official Facebook account: Anthony Ifesinachi. We believe in the importance of spiritual covering and fatherhood in ministry.',
            section5Title: '5. Proof of what we believe',
            section5Text: 'We do not preach theory only. We are a church where the power of God is demonstrated to heal, deliver, and restore. If you are looking for a place where faith is practical and visible, this is your place.',
            section6Title: '6. How we work',
            section6Text: 'Pure Word, God’s presence first, and accompaniment. We do not leave you alone after Sunday. We help you walk the process.',
            section6Item1Highlight: 'Pure Word',
            section6Item1Text: 'We preach the complete Bible, not half truths.',
            section6Item2Highlight: 'God’s presence first',
            section6Item2Text: 'We seek that every meeting is a real encounter, not a show.',
            section6Item3Highlight: 'Accompaniment',
            section6Item3Text: 'We do not leave you alone after Sunday. We help you walk the process.',
            section7Title: '7. Call to action',
            section7TextPart1: 'If you feel that your life, your family, or your destiny needs a change, come meet us.',
            section7Strong: 'Visit us at our next service',
            section7TextPart2: 'or connect with the word of our spiritual father Anthony Ifesinachi on Facebook.'
        },
        miembro: {
            heroTitle: 'Membership',
            heroText: 'Become part of our family of faith',
            welcomeTitle: 'Welcome to Fountain of Life Fire Ministry Int\'l',
            welcomeText: 'We are excited that you have decided to take this step. Complete this form to officially join our Christian community and grow spiritually with us.',
            formTitle: 'Membership Form',
            labelName: 'First Name *',
            labelSurname: 'Last Name *',
            labelEmail: 'Email Address *',
            labelPhone: 'Phone *',
            labelCountry: 'Country *',
            optionSelectCountry: 'Select country',
            optionCountry1: 'Equatorial Guinea',
            optionCountry2: 'Nigeria',
            optionCountry3: 'Spain',
            optionCountry4: 'Mexico',
            optionCountry5: 'United States',
            labelApartment: 'Apartment / Suite',
            labelCity: 'City *',
            labelState: 'State / Province *',
            labelPostal: 'Postal Code *',
            labelNeighborhood: 'Neighborhood *',
            labelMemberChurch: 'Are you a member of another church?',
            labelPrayer: 'Expectations / Prayer Requests',
            submitButton: 'Submit Form',
            optionYes: 'Yes',
            optionNo: 'No'
        },
        ramas: {
            heroTitle: 'Find a Branch',
            heroText: 'Find a Fuente of life branch near you and join us in worship and spiritual growth.',
            branchesTitle: 'Fuente de Vida Branches',
            branchesText: 'Visit us at any of our available branches.',
            branch1: {
                location: 'Malabo, Equatorial Guinea',
                phone: '+222 588 652|| 222 245 201',
                address: 'Avenida Hassan II, near the city center.'
            },
            branch2: {
                location: 'Rebola, Equatorial Guinea',
                phone: '222 588 652|| 222 245 201',
                address: 'Main road in Rebola, next to the market.'
            },
            branch3: {
                location: 'Owerri, Nigeria',
                phone: '+234 800 123 7890',
                address: 'NO. 6 NEKEDE OLD ROAD, OWERRI.'
            },
            locationBtn: 'View location'
        },
        redes_sociales1: {
            heroBreadcrumbs: 'Home · Social Media',
            heroTitle: 'Connect With Us',
            sectionTitle: 'Our Digital Platforms',
            sectionSubtitle: 'Follow our activities and receive God’s word around the world.',
            liveNotice: '• LIVE: We broadcast our faith services weekly through Facebook Live.',
            facebookTitle: 'Facebook',
            facebookText: 'Live services',
            youtubeTitle: 'YouTube',
            youtubeText: 'Sermons and worship',
            instagramTitle: 'Instagram',
            instagramText: 'Moments and photos',
            tiktokTitle: 'TikTok',
            tiktokText: 'Short messages',
            activitiesText: 'Official ministry schedules and activity days.'
        },
        contacto: {
            metaTitle: "Contact Us | Fountain of Life Fire Ministries Int'l (N.L.C)",
            title: 'Contact Us',
            intro: 'We would love to meet you, walk with you, and help you take your first steps into this family of faith.',
            addressTitle: 'Address',
            emailTitle: 'Email',
            phoneTitle: 'Phone',
            formTitle: 'Send us a message',
            formIntro: 'Complete the form and we will respond as soon as possible.',
            labelName: 'Full Name',
            placeholderName: 'Your name',
            labelEmail: 'Email Address',
            placeholderEmail: 'your@email.com',
            labelPhone: 'Phone',
            placeholderPhone: 'Your number',
            labelSubject: 'Subject',
            optionGeneral: 'General Inquiry',
            optionPrayer: 'Prayer Request',
            optionTestimony: 'Share Testimony',
            optionNew: 'I Am New Here',
            labelMessage: 'Message',
            placeholderMessage: 'How can we help you?',
            submitButton: 'Send Message'
        },
        testimonio: {
            metaTitle: "Submit Testimony | Fountain of Life Fire Ministries Int'l (N.L.C)",
            pageTitle: 'Submit Testimony',
            pageSubtitle: 'Share your experience and help others know the power of God.',
            labelName: 'Name *',
            placeholderName: 'Enter your name',
            labelSurname: 'Surname *',
            placeholderSurname: 'Enter your surname',
            labelGender: 'Gender *',
            optionSelectGender: 'Select',
            optionFemale: 'Female',
            optionMale: 'Male',
            labelCityCountry: 'City | Country *',
            placeholderCityCountry: 'Example: Madrid, Spain',
            labelEmail: 'Email Address *',
            placeholderEmail: 'email@example.com',
            labelDate: 'Date for the Testimony *',
            labelTestimony: 'Your Testimony *',
            textareaPlaceholder: 'Write your testimony here...',
            labelUpload: 'Files related to the testimony',
            buttonText: 'Submit Testimony',
            noFilesText: 'No file selected',
            fileNote: 'Up to 5 files • PDF • JPG • PNG • Video • 10MB per file',
            noAttachments: 'No attached files',
            fileLabel: 'File',
            requiredError: '⚠️ Please complete all required fields.',
            sendingStatus: 'Sending testimony',
            successStatus: '✅ Testimony sent successfully! God bless you.',
            errorStatus: '❌ Error sending. Please try again.'
        }
    },
    es: {
        common: {
            nav: {
                home: 'Inicio',
                about: 'Conócenos',
                services: 'Servicios',
                events: 'Eventos',
                branches: 'Sucursales',
                social: 'Redes Sociales',
                testimony: 'Testimonios',
                contact: 'Contacto'
            },
            langEnglish: 'English',
            langSpanish: 'Español',
            langFrench: 'Français',
            chooseLanguage: 'Idioma',
            openMenu: 'Abrir menú',
            closeMenu: 'Cerrar menú',
            brand: 'Fuente de vida ministerio de fuego int\'l (N.V.C)',
            copyright: '© 2026 Fountain of Life Fire Ministries Int\'l (N.V.C)'
        },
        nav: {
            home: 'Inicio',
            about: 'Conócenos',
            services: 'Servicios',
            events: 'Eventos',
            branches: 'Sucursales',
            social: 'Redes Sociales',
            testimony: 'Testimonios',
            contact: 'Contacto'
        },
        index: {
            hero: {
                tag: 'Espíritu · Comunidad · Renovación',
                title: 'Vive un encuentro real con Dios',
                text: 'Descubre nuestros servicios, actividades y reuniones diseñadas para inspirar, sanar y renovar tu fe. Cada imagen refleja la fuerza y unidad de una familia espiritual moderna.',
                btnJoin: 'Únete ahora',
                btnBranches: 'Encuentra una rama'
            },
            vision: {
                text: 'En Fuente de Vida Ministerio de Fuego creemos en el poder transformador de la presencia de Dios. Somos una casa de adoración, restauración y avivamiento espiritual. Aquí vidas son renovadas, corazones son encendidos y destinos son restaurados. Levantamos una generación llena de fe, propósito y pasión por Cristo. Este es un lugar donde la fuente de vida nunca deja de fluir.',
                btnReadMore: 'Leer más'
            },
            services: {
                sectionSpan: 'Únete a nosotros en la adoración',
                sectionTitle: 'Horarios De Servicio'
            },
            welcome: {
                tag: 'BIENVENIDO',
                title: '¿Eres Nuevo Aquí?',
                text: 'Nos encantaría conocerte, acompañarte y ayudarte a dar tus primeros pasos en esta familia de fe.',
                btn: 'Soy nuevo aquí'
            },
            gallery: {
                card1: { tag: 'Servicio en Vivo', title: 'Mensaje de fe y poder' },
                card2: { tag: 'Encuentro', title: 'Voz de avivamiento' },
                card3: { tag: 'Sanación', title: 'Oración de sanación' },
                card4: { tag: 'Juventud', title: 'Adoración en familia' },
                card5: { tag: 'Congregación', title: 'Culto de adoración' }
            },
            serviceCards: {
                card1: { title: 'Servicio de Adoración Dominical', timezone: 'Zona Horaria: GMT+1', detail1Label: '1er Servicio:', detail1Value: '8:00 am - 10:00 am', detail2Label: '2do Servicio:', detail2Value: '10:00 am - 12:00 pm' },
                card2: { title: 'Estudio Bíblico', timezone: 'Zona Horaria: GMT+1', detailLabel: 'Cada Lunes:', detailValue: '5:00 pm - 6:30 pm' },
                card3: { title: 'Servicio de Sanación', timezone: 'Zona Horaria: GMT+1', detailLabel: 'Cada Martes:', detailValue: '9:00 am' },
                card4: { title: 'Servicio de Liberación', timezone: 'Zona Horaria: GMT+1', detailLabel: 'Cada Jueves:', detailValue: '5:00 pm - 6:30 pm' },
                card5: { title: 'Reunión Juvenil', timezone: 'Zona Horaria: GMT+1', detailLabel: 'Cada Sábado:', detailValue: '3:00 pm' }
            },
            testimonyCard: {
                tag: 'VIDAS TRANSFORMADAS',
                title: 'Testimonios de Fe',
                text: 'Descubre historias reales de sanación, restauración y milagros que Dios ha hecho en nuestra congregación.',
                link: 'Ver testimonios'
            },
            upcomingCard: {
                tag: 'PRÓXIMOS EVENTOS',
                title: 'Próximos Programas',
                text: 'Conoce los próximos programas y actividades de nuestra comunidad para unirte y crecer en la fe.',
                link: 'Ver eventos'
            },
            branchCard: {
                tag: 'CERCA DE TI',
                title: 'Encuentra Una Rama',
                text: 'Localiza la sucursal más cercana y únete presencialmente a nuestros servicios, reuniones y actividades espirituales.',
                link: 'Buscar sucursal'
            }
        },
        conocenos: {
            heroTitle: 'Conócenos',
            heroText: 'Somos una familia espiritual llamada a predicar salvación demostrando el poder de Dios. Aquí descubrirás quiénes somos, por qué existimos y cómo trabajamos para restaurar destinos en el nombre de Jesucristo.',
            section1Title: '1. Quiénes somos',
            section1Text: 'Somos Fuente de Vida, Ministerio de Fuego, la iglesia de Cristo encomendada a predicar salvación demostrando el poder de Dios. No somos solo un lugar de reunión: somos una casa donde la Palabra se predica y el poder de Dios se manifiesta para transformar vidas reales.',
            section1Highlight: 'Fuente de Vida, Ministerio de Fuego',
            section2Title: '2. Por qué existimos / Nuestra misión',
            section2Text: 'Nuestra misión es revelar a Jesús y restaurar el destino de la gente. Vimos que muchos conocen de Dios de lejos, pero no experimentan su poder para salir de la opresión, sanar sus familias y caminar en propósito. Por eso traemos la palabra de salvación enfocada en liberación, prosperidad y el establecimiento de matrimonios conforme al diseño de Dios.',
            section2Highlight: 'Nuestra misión es revelar a Jesús y restaurar el destino de la gente',
            section3Title: '3. Qué nos distingue',
            section3Text: 'En línea con el llamado divino de nuestro padre espiritual, obramos en:',
            section3Item1Highlight: 'Liberación',
            section3Item1Text: 'Ministramos para romper ataduras espirituales que frenan tu avance.',
            section3Item2Highlight: 'Prosperidad bíblica',
            section3Item2Text: 'Enseñamos a caminar en provisión y propósito, no en escasez.',
            section3Item3Highlight: 'Establecimiento de matrimonios',
            section3Item3Text: 'Acompañamos a familias y parejas a restaurar su hogar según el plan de Dios.',
            section3Closing: 'Todo bajo la dirección del llamado de nuestro padre espiritual.',
            section4Title: '4. Liderazgo',
            section4Text: 'Estamos bajo la cobertura y dirección del padre espiritual',
            section4Highlight: 'Rev. Anthony Ifesinachi O.',
            section4TextRest: 'Puedes conocer más de su ministerio y palabra diaria en su cuenta oficial de Facebook: Anthony Ifesinachi. Creemos en la importancia de la cobertura espiritual y la paternidad en el ministerio.',
            section5Title: '5. Prueba de lo que creemos',
            section5Text: 'No predicamos solo teoría. Somos una iglesia donde se demuestra el poder de Dios para sanar, liberar y restaurar. Si buscas un lugar donde la fe sea práctica y visible, este es tu lugar.',
            section6Title: '6. Cómo trabajamos',
            section6Text: 'Palabra sin adulterar, presencia de Dios primero y acompañamiento. No te dejamos solo después del domingo. Te ayudamos a caminar el proceso.',
            section6Item1Highlight: 'Palabra sin adulterar',
            section6Item1Text: 'Predicamos la Biblia completa, no medias verdades.',
            section6Item2Highlight: 'Presencia de Dios primero',
            section6Item2Text: 'Buscamos que cada reunión sea un encuentro real, no un show.',
            section6Item3Highlight: 'Acompañamiento',
            section6Item3Text: 'No te dejamos solo después del domingo. Te ayudamos a caminar el proceso.',
            section7Title: '7. Llamado a la acción',
            section7TextPart1: 'Si sientes que tu vida, tu familia o tu destino necesitan un cambio, ven a conocernos.',
            section7Strong: 'Visítanos en nuestro próximo servicio',
            section7TextPart2: 'o conéctate con la palabra de nuestro padre espiritual Anthony Ifesinachi en Facebook.'
        },
        miembro: {
            heroTitle: 'Membresía',
            heroText: 'Forma parte de nuestra familia de fe',
            welcomeTitle: 'Bienvenido a Fuente de Vida Ministerio de Fuego Int\'l',
            welcomeText: 'Estamos emocionados de que hayas decidido dar este paso. Completa este formulario para formar parte oficialmente de nuestra comunidad cristiana y crecer espiritualmente junto a nosotros.',
            formTitle: 'Formulario de Membresía',
            labelName: 'Nombre *',
            labelSurname: 'Apellido *',
            labelEmail: 'Correo Electrónico *',
            labelPhone: 'Teléfono *',
            labelCountry: 'País *',
            optionSelectCountry: 'Seleccione país',
            optionCountry1: 'Guinea Ecuatorial',
            optionCountry2: 'Nigeria',
            optionCountry3: 'España',
            optionCountry4: 'México',
            optionCountry5: 'Estados Unidos',
            labelApartment: 'Apartamento / Suite',
            labelCity: 'Ciudad *',
            labelState: 'Estado / Provincia *',
            labelPostal: 'Código Postal *',
            labelNeighborhood: 'Barrio *',
            labelMemberChurch: '¿Es miembro de otra iglesia?',
            labelPrayer: 'Expectativas / Peticiones de oración',
            submitButton: 'Enviar Formulario',
            optionYes: 'Sí',
            optionNo: 'No'
        },
        ramas: {
            heroTitle: 'Localiza una Sucursal',
            heroText: 'Encuentra una sucursal de Fuente de Vida cerca de ti y acompáñanos en adoración y crecimiento espiritual.',
            branchesTitle: 'Sucursales de Fuente de Vida',
            branchesText: 'Visítanos en cualquiera de nuestras sucursales disponibles.',
            branch1: {
                location: 'Malabo, Guinea Ecuatorial',
                phone: '222 588 652|| 222 245 201',
                address: 'Avenida Hassan II, cerca del centro de la ciudad.'
            },
            branch2: {
                location: 'Rebola, Guinea Ecuatorial',
                phone: '222 588 652|| 222 245 201',
                address: 'Carretera principal de Rebola, junto al mercado.'
            },
            branch3: {
                location: 'Owerri, Nigeria',
                phone: '222 588 652|| 222 245 201',
                address: 'NO. 6 NEKEDE OLD ROAD, OWERRI, NIGERIA.'
            },
            locationBtn: 'Ver ubicación'
        },
        redes_sociales1: {
            heroBreadcrumbs: 'Home · Redes Sociales',
            heroTitle: 'Conéctate Con Nosotros',
            sectionTitle: 'Nuestras Plataformas Digitales',
            sectionSubtitle: 'Sigue nuestras actividades y recibe la palabra de Dios en todo el mundo.',
            liveNotice: '• EN DIRECTO: Transmitimos nuestros servicios de fe cada semana a través de Facebook Live.',
            facebookTitle: 'Facebook',
            facebookText: 'Servicios en vivo',
            youtubeTitle: 'YouTube',
            youtubeText: 'Prédicas y Alabanzas',
            instagramTitle: 'Instagram',
            instagramText: 'Momentos y Fotos',
            tiktokTitle: 'TikTok',
            tiktokText: 'Mensajes Cortos',
            activitiesText: 'Horarios oficiales y días de actividades del ministerio.'
        },
        contacto: {
            metaTitle: "Contáctanos | Fountain of Life Fire Ministries Int'l (N.L.C)",
            title: 'Contáctanos',
            intro: 'Nos encantaría conocerte, acompañarte y ayudarte a dar tus primeros pasos en esta familia de fe.',
            addressTitle: 'Dirección',
            emailTitle: 'Correo',
            phoneTitle: 'Teléfono',
            formTitle: 'Envíanos un mensaje',
            formIntro: 'Completa el formulario y te responderemos lo antes posible.',
            labelName: 'Nombre Completo',
            placeholderName: 'Tu nombre',
            labelEmail: 'Correo Electrónico',
            placeholderEmail: 'tu@email.com',
            labelPhone: 'Teléfono',
            placeholderPhone: 'Tu número',
            labelSubject: 'Asunto',
            optionGeneral: 'Consulta General',
            optionPrayer: 'Petición de Oración',
            optionTestimony: 'Compartir Testimonio',
            optionNew: 'Soy Nuevo Aquí',
            labelMessage: 'Mensaje',
            placeholderMessage: '¿Cómo podemos ayudarte?',
            submitButton: 'Enviar Mensaje'
        },
        testimonio: {
            metaTitle: "Enviar Testimonio | Fountain of Life Fire Ministries Int'l (N.L.C)",
            pageTitle: 'Enviar Testimonio',
            pageSubtitle: 'Comparte tu experiencia y ayuda a otros a conocer el poder de Dios.',
            labelName: 'Nombre *',
            placeholderName: 'Ingrese su nombre',
            labelSurname: 'Apellidos *',
            placeholderSurname: 'Ingrese sus apellidos',
            labelGender: 'Género *',
            optionSelectGender: 'Seleccione',
            optionFemale: 'Mujer',
            optionMale: 'Hombre',
            labelCityCountry: 'Ciudad | País *',
            placeholderCityCountry: 'Ejemplo: Madrid, España',
            labelEmail: 'Correo Electrónico *',
            placeholderEmail: 'correo@ejemplo.com',
            labelDate: 'Fecha para el Testimonio *',
            labelTestimony: 'Su Testimonio *',
            textareaPlaceholder: 'Escriba aquí su testimonio...',
            labelUpload: 'Archivos relacionados con el testimonio',
            buttonText: 'Enviar Testimonio',
            noFilesText: 'Ningún archivo seleccionado',
            fileNote: 'Máximo 5 archivos • PDF • JPG • PNG • Video • 10MB por archivo',
            noAttachments: 'Sin archivos adjuntos',
            fileLabel: 'Archivo',
            requiredError: '⚠️ Por favor complete todos los campos requeridos.',
            sendingStatus: 'Enviando testimonio',
            successStatus: '✅ ¡Testimonio enviado con éxito! Que Dios le bendiga.',
            errorStatus: '❌ Error al enviar. Por favor intente nuevamente.'
        }
    },
    fr: {
        common: {
            nav: {
                home: 'Accueil',
                about: 'À propos',
                services: 'Services',
                events: 'Événements',
                branches: 'Succursales',
                social: 'Réseaux',
                testimony: 'Témoignages',
                contact: 'Contact'
            },
            langEnglish: 'English',
            langSpanish: 'Español',
            langFrench: 'Français',
            chooseLanguage: 'Langue',
            openMenu: 'Ouvrir le menu',
            closeMenu: 'Fermer le menu',
            brand: 'Fontaine de Vie Ministère du Feu Int\'l (N.V.C)',
            copyright: '© 2026 Fountain of Life Fire Ministries Int\'l (N.V.C)'
        },
        nav: {
            home: 'Accueil',
            about: 'À propos',
            services: 'Services',
            events: 'Événements',
            branches: 'Succursales',
            social: 'Réseaux',
            testimony: 'Témoignages',
            contact: 'Contact'
        },
        index: {
            hero: {
                tag: 'Esprit · Communauté · Renouveau',
                title: 'Vivez une rencontre réelle avec Dieu',
                text: 'Découvrez nos services, activités et réunions conçus pour inspirer, guérir et renouveler votre foi. Chaque image reflète la force et l’unité d’une famille spirituelle moderne.',
                btnJoin: 'Rejoindre maintenant',
                btnBranches: 'Trouver une branche'
            },
            vision: {
                text: 'Chez Source de Vie Ministère du Feu Int\'l, nous croyons au pouvoir transformateur de la présence de Dieu. Nous sommes une maison de culte, de restauration et de réveil spirituel. Ici, les vies sont renouvelées, les cœurs sont enflammés et les destinées sont restaurées. Nous élevons une génération pleine de foi, de but et de passion pour le Christ. C’est un lieu où la fontaine de vie ne cesse jamais de couler.',
                btnReadMore: 'En savoir plus'
            },
            services: {
                sectionSpan: 'Rejoignez-nous dans l’adoration',
                sectionTitle: 'Horaires de service'
            },
            welcome: {
                tag: 'BIENVENUE',
                title: 'Nouveau ici ?',
                text: 'Nous serions ravis de vous rencontrer, de vous accompagner et de vous aider à faire vos premiers pas dans cette famille de foi.',
                btn: 'Je suis nouveau ici'
            },
            gallery: {
                card1: { tag: 'Service en direct', title: 'Message de foi et de puissance' },
                card2: { tag: 'Rassemblement', title: 'Voix du réveil' },
                card3: { tag: 'Guérison', title: 'Prière de guérison' },
                card4: { tag: 'Jeunesse', title: 'Adoration en famille' },
                card5: { tag: 'Congrégation', title: 'Culte d’adoration' }
            },
            serviceCards: {
                card1: { title: 'Service d’adoration du dimanche', timezone: 'Fuseau horaire : GMT+1', detail1Label: '1er service :', detail1Value: '8h00 - 10h00', detail2Label: '2ème service :', detail2Value: '10h00 - 12h00' },
                card2: { title: 'Étude biblique', timezone: 'Fuseau horaire : GMT+1', detailLabel: 'Chaque lundi :', detailValue: '17h00 - 18h30' },
                card3: { title: 'Service de guérison', timezone: 'Fuseau horaire : GMT+1', detailLabel: 'Chaque mardi :', detailValue: '9h00' },
                card4: { title: 'Service de délivrance', timezone: 'Fuseau horaire : GMT+1', detailLabel: 'Chaque jeudi :', detailValue: '17h00 - 18h30' },
                card5: { title: 'Réunion de jeunesse', timezone: 'Fuseau horaire : GMT+1', detailLabel: 'Chaque samedi :', detailValue: '15h00' }
            },
            testimonyCard: {
                tag: 'VIES TRANSFORMÉES',
                title: 'Témoignages de foi',
                text: 'Découvrez des histoires réelles de guérison, de restauration et de miracles que Dieu a accomplis dans notre congrégation.',
                link: 'Voir les témoignages'
            },
            upcomingCard: {
                tag: 'ÉVÉNEMENTS À VENIR',
                title: 'Programmes à venir',
                text: 'Découvrez les prochains programmes et activités de notre communauté pour rejoindre et grandir dans la foi.',
                link: 'Voir les événements'
            },
            branchCard: {
                tag: 'PRÈS DE VOUS',
                title: 'Trouvez une succursale',
                text: 'Trouvez une succursale de Source de Vie près de chez vous et rejoignez-nous en adoration et croissance spirituelle.',
                link: 'Rechercher une succursale'
            }
        },
        conocenos: {
            heroTitle: 'À propos de nous',
            heroText: 'Nous sommes une famille spirituelle appelée à prêcher le salut en démontrant la puissance de Dieu. Ici, vous découvrirez qui nous sommes, pourquoi nous existons et comment nous travaillons pour restaurer des destinées au nom de Jésus-Christ.',
            section1Title: '1. Qui nous sommes',
            section1Text: 'Nous sommes Fontaine de Vie, Ministère du Feu, l\'église du Christ chargée de prêcher le salut en démontrant la puissance de Dieu. Nous ne sommes pas seulement un lieu de réunion : nous sommes une maison où la Parole est prêchée et la puissance de Dieu se manifeste pour transformer des vies réelles.',
            section1Highlight: 'Fontaine de Vie, Ministère du Feu',
            section2Title: '2. Pourquoi nous existons / Notre mission',
            section2Text: 'Notre mission est de révéler Jésus et de restaurer la destinée des gens. Nous avons vu que beaucoup connaissent Dieu de loin, mais n’expérimentent pas Sa puissance pour sortir de l’oppression, guérir leurs familles et marcher dans le but. C’est pourquoi nous apportons la parole de salut axée sur la délivrance, la prospérité et l’établissement des mariages selon le dessein de Dieu.',
            section2Highlight: 'Notre mission est de révéler Jésus et de restaurer la destinée des gens',
            section3Title: '3. Ce qui nous distingue',
            section3Text: 'Voici ce qui nous distingue des autres ministères :',
            section3Item1Highlight: 'Délivrance',
            section3Item1Text: 'Nous ministrons pour briser les chaînes spirituelles qui empêchent votre progrès.',
            section3Item2Highlight: 'Prospérité biblique',
            section3Item2Text: 'Nous vous enseignons à marcher dans la provision et le but, pas dans le manque.',
            section3Item3Highlight: 'Établissement des mariages',
            section3Item3Text: 'Nous accompagnons les familles et les couples à restaurer leur foyer selon le plan de Dieu.',
            section3Closing: 'Le tout sous la direction de l’appel de notre père spirituel.',
            section4Title: '4. Leadership',
            section4Text: 'Nous sommes sous la couverture et la direction du père spirituel',
            section4Highlight: 'Rev. Anthony Ifesinachi O.',
            section4TextRest: 'Vous pouvez en savoir plus sur son ministère et sa parole quotidienne sur son compte Facebook officiel : Rev. Anthony Ifesinachi O. Nous croyons en l’importance de la couverture spirituelle et de la paternité dans le ministère.',
            section5Title: '5. Preuve de ce en quoi nous croyons',
            section5Text: 'Nous ne prêchons pas seulement la théorie. Nous sommes une église où la puissance de Dieu se manifeste pour guérir, délivrer et restaurer. Si vous cherchez un lieu où la foi est pratique et visible, c’est votre place.',
            section6Title: '6. Comment nous travaillons',
            section6Text: 'Parole pure, présence de Dieu en premier et accompagnement. Nous ne vous laissons pas seul après le dimanche. Nous vous aidons à marcher le processus.',
            section6Item1Highlight: 'Parole pure',
            section6Item1Text: 'Nous prêchons la Bible complète, pas des demi-vérités.',
            section6Item2Highlight: 'Présence de Dieu d’abord',
            section6Item2Text: 'Nous cherchons à ce que chaque réunion soit une rencontre réelle, pas un spectacle.',
            section6Item3Highlight: 'Accompagnement',
            section6Item3Text: 'Nous ne vous laissons pas seul après le dimanche. Nous vous aidons à marcher le processus.',
            
            section7TextPart1: 'Si vous sentez que votre vie, votre famille ou votre destinée ont besoin d’un changement, venez nous rencontrer.',
            section7Strong: 'Visitez-nous lors de notre prochain service',
            section7TextPart2: 'ou connectez-vous à la parole de notre père spirituel Rev. Anthony Ifesinachi O. sur Facebook.'
        },
        miembro: {
            heroTitle: 'Adhésion',
            heroText: 'Faites partie de notre famille de foi',
            welcomeTitle: 'Bienvenue à Fontaine de Vie Ministère du Feu Int\'l',
            welcomeText: 'Nous sommes ravis que vous ayez décidé de faire ce pas. Remplissez ce formulaire pour faire officiellement partie de notre communauté chrétienne et grandir spirituellement avec nous.',
            formTitle: 'Formulaire d’adhésion',
            labelName: 'Prénom *',
            labelSurname: 'Nom *',
            labelEmail: 'Adresse e-mail *',
            labelPhone: 'Téléphone *',
            labelCountry: 'Pays *',
            optionSelectCountry: 'Sélectionnez le pays',
            optionCountry1: 'Guinée équatoriale',
            optionCountry2: 'Nigéria',
            optionCountry3: 'Espagne',
            optionCountry4: 'Mexique',
            optionCountry5: 'États-Unis',
            labelApartment: 'Appartement / Suite',
            labelCity: 'Ville *',
            labelState: 'État / Province *',
            labelPostal: 'Code postal *',
            labelNeighborhood: 'Quartier *',
            labelMemberChurch: 'Êtes-vous membre d’une autre église ?',
            labelPrayer: 'Attentes / Demandes de prière',
            submitButton: 'Envoyer le formulaire',
            optionYes: 'Oui',
            optionNo: 'Non'
        },
        ramas: {
            heroTitle: 'Trouvez une succursale',
            heroText: 'Trouvez une succursale de Fontaine de Vie près de chez vous et rejoignez-nous en adoration et croissance spirituelle.',
            branchesTitle: 'Succursales Fontaine de Vie',
            branchesText: 'Visitez-nous dans n’importe laquelle de nos succursales disponibles.',
            branch1: {
                location: 'Malabo, Guinée équatoriale',
                phone: '222 588 652|| 222 245 201',
                address: 'Avenida Hassan II, près du centre-ville.'
            },
            branch2: {
                location: 'Rebola, Guinée équatoriale',
                phone: '222 588 652|| 222 245 201',
                address: 'Route principale de Rebola, à côté du marché.'
            },
            branch3: {
                location: 'Owerri, Nigeria',
                phone: '222 588 652|| 222 245 201',
                address: 'NO. 6 NEKEDE OLD ROAD, OWERRI, NIGERIA.'
            },
            locationBtn: 'Voir l’emplacement'
        },
        redes_sociales1: {
            heroBreadcrumbs: 'Accueil · Réseaux sociaux',
            heroTitle: 'Connectez-vous avec nous',
            sectionTitle: 'Nos plateformes numériques',
            sectionSubtitle: 'Suivez nos activités et recevez la parole de Dieu dans le monde entier.',
            liveNotice: '• EN DIRECT : Nous diffusons nos services de foi chaque semaine via Facebook Live.',
            facebookTitle: 'Facebook',
            facebookText: 'Services en direct',
            youtubeTitle: 'YouTube',
            youtubeText: 'Sermons et louanges',
            instagramTitle: 'Instagram',
            instagramText: 'Moments et photos',
            tiktokTitle: 'TikTok',
            tiktokText: 'Courts messages',
            activitiesText: 'Horaires officiels et jours d’activités du ministère.'
        },
        contacto: {
            metaTitle: "Contactez-nous | Fountain of Life Fire Ministries Int'l (N.L.C)",
            title: 'Contactez-nous',
            intro: 'Nous serions ravis de vous rencontrer, de vous accompagner et de vous aider à faire vos premiers pas dans cette famille de foi.',
            addressTitle: 'Adresse',
            emailTitle: 'E-mail',
            phoneTitle: 'Téléphone',
            formTitle: 'Envoyez-nous un message',
            formIntro: 'Remplissez le formulaire et nous vous répondrons dès que possible.',
            labelName: 'Nom complet',
            placeholderName: 'Votre nom',
            labelEmail: 'Adresse e-mail',
            placeholderEmail: 'votre@email.com',
            labelPhone: 'Téléphone',
            placeholderPhone: 'Votre numéro',
            labelSubject: 'Sujet',
            optionGeneral: 'Demande générale',
            optionPrayer: 'Demande de prière',
            optionTestimony: 'Partager un témoignage',
            optionNew: 'Je suis nouveau ici',
            labelMessage: 'Message',
            placeholderMessage: 'Comment pouvons-nous vous aider ?',
            submitButton: 'Envoyer le message'
        },
        testimonio: {
            metaTitle: "Soumettre un témoignage | Fountain of Life Fire Ministries Int'l (N.L.C)",
            pageTitle: 'Soumettre un témoignage',
            pageSubtitle: 'Partagez votre expérience et aidez les autres à connaître la puissance de Dieu.',
            labelName: 'Nom *',
            placeholderName: 'Entrez votre nom',
            labelSurname: 'Prénom *',
            placeholderSurname: 'Entrez votre prénom',
            labelGender: 'Genre *',
            optionSelectGender: 'Sélectionnez',
            optionFemale: 'Femme',
            optionMale: 'Homme',
            labelCityCountry: 'Ville | Pays *',
            placeholderCityCountry: 'Exemple : Madrid, Espagne',
            labelEmail: 'Adresse e-mail *',
            placeholderEmail: 'email@exemple.com',
            labelDate: 'Date du témoignage *',
            labelTestimony: 'Votre témoignage *',
            textareaPlaceholder: 'Écrivez votre témoignage ici...',
            labelUpload: 'Fichiers liés au témoignage',
            buttonText: 'Envoyer le témoignage',
            noFilesText: 'Aucun fichier sélectionné',
            fileNote: 'Jusqu’à 5 fichiers • PDF • JPG • PNG • Vidéo • 10 Mo par fichier',
            noAttachments: 'Aucun fichier joint',
            fileLabel: 'Fichier',
            requiredError: '⚠️ Veuillez remplir tous les champs obligatoires.',
            sendingStatus: 'Envoi du témoignage',
            successStatus: '✅ Témoignage envoyé avec succès ! Que Dieu vous bénisse.',
            errorStatus: '❌ Erreur lors de l’envoi. Veuillez réessayer.'
        }
    }
};

function getTranslation(lang, page, key) {
    const languagePack = translations[lang] || translations.es;
    const pageMap = languagePack[page] || {};
    const common = languagePack.common || {};
    if (key.startsWith('common.')) {
        const commonKey = key.slice('common.'.length);
        return commonKey.split('.').reduce((obj, part) => (obj ? obj[part] : null), common) || null;
    }
    const pageKey = key.startsWith(`${page}.`) ? key.slice(page.length + 1) : key;
    const pageValue = pageKey.split('.').reduce((obj, part) => (obj ? obj[part] : null), pageMap);
    if (pageValue) {
        return pageValue;
    }
    const commonValue = key.split('.').reduce((obj, part) => (obj ? obj[part] : null), common);
    return commonValue || null;
}

function translatePage(lang) {
    const page = document.body.dataset.page || window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        const translation = getTranslation(lang, page, key);
        if (!translation) {
            return;
        }
        if (el.dataset.i18nAttr) {
            el.setAttribute(el.dataset.i18nAttr, translation);
        } else {
            el.textContent = translation;
        }
    });
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
        translatePage(lang);
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

    function openMenu() {
        navLinks.classList.add('active');
        mobileMenu.setAttribute('aria-expanded', 'true');
        menuClose.setAttribute('aria-hidden', 'false');
        if (langMenu) {
            langMenu.classList.remove('active');
            if (langToggle) langToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
        menuClose.setAttribute('aria-hidden', 'true');
    }

    mobileMenu.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuClose.addEventListener('click', closeMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

setupMenuToggle();
setupLanguageSwitcher();

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
