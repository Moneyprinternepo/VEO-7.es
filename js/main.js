document.addEventListener('DOMContentLoaded', function() {
    // Selectores del DOM
    // (Sin cambios aquí)
    const appContainer = document.getElementById('app-container');
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('[data-page]');

    const heroSliderElement = document.querySelector('.hero-slider');
    const heroDotsContainer = document.querySelector('.hero .slider-dots');
    const liveNowTextElement = document.getElementById('live-now-text');

    const timelineWrapper = document.getElementById('timeline-wrapper');
    const timeMarkersHomeContainer = document.getElementById('time-markers-v2-home');
    const programBlocksHomeContainer = document.getElementById('program-blocks-v2-home');
    const timelineElementHome = document.getElementById('timeline-v2');

    const fictionGridContainer = document.getElementById('fiction-grid-container');

    const dayTabsFullContainer = document.getElementById('day-tabs-full');
    const scheduleListVerticalContainer = document.getElementById('schedule-list-v3');


    // --- DATOS JSON INCRUSTADOS DIRECTAMENTE (CORREGIDOS) ---
    const datosHero = [
      {
        "id": "vidas-criminales",
        "tag": "Miércoles 18 - 22:30",
        "title": "Vidas Criminales",
        "bio": "Dos delincuentes comunes obtienen más de lo que esperaban después de secuestrar a la esposa de un desarrollador inmobiliario corrupto que no muestra interés en pagar el rescate de 1 millón de dólares por su regreso seguro.",
        "type": "Cine",
        "duration": "1h 38m",
        "genre": "Comedia/Crimen",
        "imdbLink": "https://www.imdb.com/es-es/title/tt1663207/",
        "imageUrl": "https://i.ibb.co/C5t6pfb6/2.jpg", // URL de ejemplo, asegúrate que sea válida
        "gradientColors": ["rgba(16, 16, 16, 0.9) 20%", "rgba(16, 16, 16, 0.1) 70%"],
        "ctaPage": "schedule"
      },
      {
        "id": "pixie",
        "tag": "Miércoles 18 - 20:30",
        "title": "Pixie",
        "bio": "Para vengar la muerte de su madre, Pixie planea un atraco, pero debe huir a través de Irlanda de los gánsteres, enfrentarse al patriarcado y elegir su propio destino.",
        "type": "Cine",
        "duration": "1h 33m",
        "genre": "Comedia Negra",
        "imdbLink": "https://www.imdb.com/es-es/title/tt10831086/",
        "imageUrl": "https://i.ibb.co/h1JgQwF7/1.jpg", // URL de ejemplo
        "gradientColors": ["rgba(16, 16, 16, 0.9) 20%", "rgba(16, 16, 16, 0.1) 70%"],
        "ctaPage": "schedule"
      },
      {
        "id": "crimenes-del-futuro",
        "tag": "Domingo 22- 23:50",
        "title": "Crímenes del futuro",
        "bio": "La especie humana evoluciona y se adapta a un entorno sintético, el cuerpo es sometido a nuevas transformaciones y mutaciones. El artista Saul exhibe las metamorfósis de sus órganos en performances de vanguardia.",
        "type": "Cine",
        "duration": "1h 47m",
        "genre": "Sci-Fi/Horror",
        "imdbLink": "https://www.imdb.com/es-es/title/tt14549466/",
        "imageUrl": "https://i.ibb.co/KpMXNkz3/3.jpg", // URL de ejemplo
        "gradientColors": ["rgba(16, 16, 16, 0.9) 20%", "rgba(16, 16, 16, 0.1) 70%"],
        "ctaPage": "schedule"
      },
      {
        "id": "plan-a",
        "tag": "Jueves 19 - 23:45",
        "title": "Plan A",
        "bio": "En 1945, un grupo de sobrevivientes judíos del Holocausto planeó envenenar el sistema de agua en Alemania. La película narra la peligrosa y atrevida operación encubierta que se llamó Plan A.",
        "type": "Cine",
        "duration": "1h 49m",
        "genre": "Drama histórico",
        "imdbLink": "https://www.imdb.com/es-es/title/tt5448338/",
        "imageUrl": "https://i.ibb.co/tMVXFxJ2/4.jpg", // URL de ejemplo
        "gradientColors": ["rgba(16, 16, 16, 0.9) 20%", "rgba(16, 16, 16, 0.1) 70%"],
        "ctaPage": "schedule"
      }
    ];

    const datosEstaNoche = {
      "prefijo": "Esta Noche",
      "programas": [
        { "titulo": "Pixie", "hora": "20:30" },
        { "titulo": "Vidas Criminales", "hora": "22:15" },
        { "titulo": "Cop Secreto", "hora": "23:45" }
      ]
    };

    const datosParrilla = {
      "diasDisponibles": ["Hoy", "Jue 19", "Vie 20", "Sáb 21", "Dom 22"], // Eliminado Mar 17 y Mie 18 que no tenían datos en tu JSON
      "programacion": {
        "Hoy": [
            { "start": "09:00", "duration": 315, "title": "Vigilantes de la playa", "episode": "S1 Ep 1-9", "synopsis": "En una playa de Los Ángeles, un equipo de socorristas, liderado por el teniente Mitch Buchannon, salva vidas, lidia con dramas personales, lucha contra el crimen y participa en aventuras a diario.", "imdb": "https://www.imdb.com/es-es/title/tt0096542/" },
            { "start": "16:30", "duration": 240, "title": "Flashpoint", "episode": "S1 Ep 1-5", "synopsis": "La Unidad de Respuesta Estratégica es un grupo que forma parte de la élite policial. Ellos se encargan de resolver aquellas situaciones extremas de las que la policía no puede hacerse cargo.", "imdb": "https://www.imdb.com/es-es/title/tt1059475/" },
            { "start": "20:30", "duration": 93, "title": "Pixie", "episode": "Cine", "synopsis": "Para vengar la muerte de su madre, Pixie planea un atraco, pero debe huir a través de Irlanda de los gánsteres, enfrentarse al patriarcado y elegir su propio destino.", "imdb": "https://www.imdb.com/es-es/title/tt10831086/" },
            { "start": "22:15", "duration": 98, "title": "Vidas Criminales", "episode": "Cine", "synopsis": "Dos delincuentes comunes obtienen más de lo que esperaban después de secuestrar a la esposa de un desarrollador inmobiliario corrupto que no muestra interés en pagar el rescate de 1 millón de dólares por su regreso seguro.", "imdb": "https://www.imdb.com/es-es/title/tt1663207/" },
            { "start": "23:45", "duration": 98, "title": "Cop Secret", "episode": "Cine", "synopsis": "El policía más duro de Islandia no se detendrá ante nada para resolver una serie de violentos robos a bancos. Pero las presiones de resolver el caso resultan demasiado para el duro renegado.", "imdb": "https://www.imdb.com/es-es/title/tt13882736/" },
            { "start": "01:15", "duration": 60, "title": "Teletienda", "episode": "-", "synopsis": "-", "imdb": "#" } // Duración asignada (ej. 60 min)
        ],
        // Eliminé "Mar 17" y "Mié 18" de aquí porque no estaban en tu último `datosParrilla`.
        // Si los necesitas, asegúrate que las duraciones estén en minutos.
        "Jue 19": [
            { "start": "15:00", "duration": 156, "title": "Django Desencadenado", "episode": "Película", "synopsis": "Con la ayuda de un cazarrecompensas alemán, un esclavo liberado se dispone a rescatar a su esposa de un brutal dueño de una plantación.", "imdb": "https://www.imdb.com/title/tt1853728/" },
            { "start": "22:00", "duration": 169, "title": "Interstellar", "episode": "Película", "synopsis": "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.", "imdb": "https://www.imdb.com/title/tt0816692/" }
        ],
        "Vie 20": [
            { "start": "17:00", "duration": 115, "title": "Resacón en Las Vegas", "episode": "Película", "synopsis": "Tres amigos se despiertan de una despedida de soltero en Las Vegas, sin recordar la noche anterior y con el novio desaparecido.", "imdb": "https://www.imdb.com/title/tt1119646/" },
            { "start": "22:00", "duration": 113, "title": "Supersalidos", "episode": "Película", "synopsis": "Dos estudiantes de secundaria inadaptados se embarcan en una noche de aventuras para conseguir alcohol para una fiesta.", "imdb": "https://www.imdb.com/title/tt0829482/" },
            { "start": "00:00", "duration": 100, "title": "Zombieland", "episode": "Película", "synopsis": "Un tímido estudiante intenta sobrevivir en un mundo invadido por zombis mientras se une a otros tres supervivientes.", "imdb": "https://www.imdb.com/title/tt1156398/" }
        ],
        "Sáb 21": [
            { "start": "16:00", "duration": 154, "title": "Pulp Fiction", "episode": "Película Clásica", "synopsis": "Las vidas de dos sicarios, un boxeador, la esposa de un gánster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.", "imdb": "https://www.imdb.com/title/tt0110912/" },
            { "start": "18:45", "duration": 175, "title": "El Padrino", "episode": "Película Clásica", "synopsis": "El patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reacio hijo.", "imdb": "https://www.imdb.com/title/tt0068646/" },
            { "start": "22:00", "duration": 180, "title": "Maratón \"Indiana Jones\"", "episode": "En busca del arca perdida", "synopsis": "El arqueólogo y aventurero Indiana Jones es contratado por el gobierno de EE.UU. para encontrar el Arca de la Alianza antes que los nazis.", "imdb": "https://www.imdb.com/title/tt0082971/" }
        ],
        "Dom 22": [ // No había coma aquí, lo cual es correcto si es el último.
            { "start": "16:00", "duration": 136, "title": "Spider-Man: Un nuevo universo", "episode": "Película de Animación", "synopsis": "El adolescente Miles Morales se convierte en el Spider-Man de su realidad, cruzando su camino con cinco contrapartes de otras dimensiones.", "imdb": "https://www.imdb.com/title/tt4633694/" },
            { "start": "18:20", "duration": 148, "title": "Spider-Man: No Way Home", "episode": "Película", "synopsis": "La identidad de Spider-Man es revelada, por lo que pide ayuda al Doctor Strange. Cuando un hechizo sale mal, peligrosos enemigos de otros mundos comienzan a aparecer.", "imdb": "https://www.imdb.com/title/tt10872600/" },
            { "start": "22:00", "duration": 149, "title": "Logan", "episode": "Película", "synopsis": "En un futuro cercano, un cansado Logan cuida de un enfermo Profesor X en un escondite en la frontera mexicana.", "imdb": "https://www.imdb.com/title/tt3315342/" }
        ] // Sin coma aquí porque es el final del objeto "programacion"
      }
    };

    const datosDestacados = [
      {
        "imageUrl": "https://i.ibb.co/nsng2dTW/1.jpg", // CORREGIDO: Solo la URL de la imagen
        "title": "Maratón de series",
        "bio": "De lunes a viernes a partir de las 09:00",
        "linkPage": "schedule"
      },
      {
        "imageUrl": "https://i.ibb.co/q3XFS8ky/2.jpg", // CORREGIDO: Solo la URL de la imagen
        "title": "El mejor cine",
        "bio": "3 películas, todos los días, a partir de las 20:30",
        "linkPage": "schedule"
      }
    ];

    // Variables de estado
    let currentHeroSlide = 0;
    let heroAutoSlideInterval;


    // --- FUNCIONES DE RENDERIZADO ---
    function renderizarHero() {
        if (!heroSliderElement || !heroDotsContainer || !datosHero.length) {
            console.warn("Hero slider o datos no encontrados/vacíos.");
            return;
        }
        heroSliderElement.innerHTML = '';
        heroDotsContainer.innerHTML = '';

        datosHero.forEach((pelicula, index) => {
            const slide = document.createElement('div');
            slide.classList.add('hero-slide');
            // Asegurarse que gradientColors exista y tenga al menos dos elementos
            const gradCol1 = pelicula.gradientColors && pelicula.gradientColors.length > 0 ? pelicula.gradientColors[0] : 'rgba(16, 16, 16, 0.9) 20%';
            const gradCol2 = pelicula.gradientColors && pelicula.gradientColors.length > 1 ? pelicula.gradientColors[1] : 'rgba(16, 16, 16, 0.1) 70%';
            const gradient = `linear-gradient(to right, ${gradCol1}, ${gradCol2})`;
            slide.style.backgroundImage = `${gradient}, url('${pelicula.imageUrl}')`;

            slide.innerHTML = `
                <div class="hero-content">
                    <span class="hero-tag">${pelicula.tag || ''}</span>
                    <h2>${pelicula.title || 'Título no disponible'}</h2>
                    <p class="description">${pelicula.bio || ''}</p>
                    <div class="hero-meta">
                        <span>${pelicula.type || ''}</span>
                        <span>${pelicula.duration || ''}</span>
                        <span>${pelicula.genre || ''}</span>
                    </div>
                    <div class="hero-buttons">
                        <a class="cta-button" data-page="${pelicula.ctaPage || 'schedule'}">Programación</a>
                        <a href="${pelicula.imdbLink || '#'}" target="_blank" rel="noopener noreferrer" class="cta-button cta-button-secondary">Saber más</a>
                    </div>
                </div>
            `;
            heroSliderElement.appendChild(slide);

            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => { setHeroSlideManual(index); });
            heroDotsContainer.appendChild(dot);
        });
        configurarHeroSlider();
    }

    function renderizarEstaNoche() {
        if (!liveNowTextElement || !datosEstaNoche.programas || !datosEstaNoche.programas.length) {
             if(liveNowTextElement) liveNowTextElement.textContent = "Información no disponible.";
            return;
        }
        const titulos = datosEstaNoche.programas.map(p => `${p.titulo} (${p.hora})`).join(', ');
        liveNowTextElement.textContent = `${datosEstaNoche.prefijo || "Esta Noche"}: ${titulos}`;
    }

    function renderizarParrillaHorizontal() {
        if (!programBlocksHomeContainer || !timeMarkersHomeContainer || !timelineElementHome || !datosParrilla.programacion || !datosParrilla.programacion['Hoy']) {
            console.warn("Parrilla Horizontal: Elementos DOM o datos de 'Hoy' no encontrados.");
            return;
        }
    
        programBlocksHomeContainer.innerHTML = '';
        timeMarkersHomeContainer.innerHTML = '';
    
        const PIXELS_PER_MINUTE_HORIZONTAL = 4;
        const TIMELINE_START_HOUR_HORIZONTAL = 7; 
        const TIMELINE_TOTAL_HOURS_HORIZONTAL = 22; // Cubre de 7:00 AM a 5:00 AM del día siguiente
    
        timelineElementHome.style.width = `${TIMELINE_TOTAL_HOURS_HORIZONTAL * 60 * PIXELS_PER_MINUTE_HORIZONTAL}px`;
    
        for (let i = 0; i <= TIMELINE_TOTAL_HOURS_HORIZONTAL * 2; i++) { 
            const offsetMinutes = i * 30;
            const markerHour = TIMELINE_START_HOUR_HORIZONTAL + Math.floor(offsetMinutes / 60);
            const markerMinute = offsetMinutes % 60;
            const marker = document.createElement('div');
            marker.classList.add('time-marker-v2');
            marker.style.left = `${offsetMinutes * PIXELS_PER_MINUTE_HORIZONTAL}px`;
            marker.textContent = `${String(markerHour % 24).padStart(2, '0')}:${String(markerMinute).padStart(2, '0')}`;
            timeMarkersHomeContainer.appendChild(marker);
        }
    
        const programasHoy = datosParrilla.programacion['Hoy'];
        if (!programasHoy || programasHoy.length === 0) {
            console.warn("Parrilla Horizontal: No hay programas para 'Hoy'.");
            programBlocksHomeContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-secondary);">No hay programación para hoy.</p>';
            return;
        }

        programasHoy.forEach(program => {
            if (typeof program.duration !== 'number' || isNaN(program.duration)) {
                console.error(`Parrilla Horizontal: Duración inválida para "${program.title}":`, program.duration);
                return; // Saltar este programa si la duración no es un número
            }

            let [hour, minute] = program.start.split(':').map(Number);
            let effectiveHour = hour;
            if (hour < TIMELINE_START_HOUR_HORIZONTAL) { // Para programas después de medianoche, ej. 01:15
                 effectiveHour = hour + 24; 
            }

            const startMinutesFromTimelineStart = (effectiveHour - TIMELINE_START_HOUR_HORIZONTAL) * 60 + minute;
    
            if (startMinutesFromTimelineStart < 0 || startMinutesFromTimelineStart >= TIMELINE_TOTAL_HOURS_HORIZONTAL * 60) return;
    
            const block = document.createElement('div');
            block.classList.add('program-item-v2');
            block.style.left = `${startMinutesFromTimelineStart * PIXELS_PER_MINUTE_HORIZONTAL}px`;
            const itemWidth = Math.max(program.duration * PIXELS_PER_MINUTE_HORIZONTAL - 10, 60); 
            block.style.width = `${itemWidth}px`;
            block.innerHTML = `<h3>${program.title}</h3><p>${program.episode || ''}</p>`; 
            
            const now = new Date();
            const currentDayDate = now.toDateString(); // Formato "Wed Jul 24 2024"

            // La lógica 'is-live' solo aplica si el día que estamos viendo es el día actual real
            // Asumiendo que 'Hoy' en los datos siempre se refiere al día en que se carga la página
            const programDate = new Date(); // Asumimos que los programas de 'Hoy' son para el día actual
            programDate.setHours(hour, minute, 0, 0);

            const programStartTotalMinutesToday = hour * 60 + minute;
            const programEndTotalMinutesToday = programStartTotalMinutesToday + program.duration;
            const nowTotalMinutesToday = now.getHours() * 60 + now.getMinutes();

            if (currentDayDate === programDate.toDateString() &&
                nowTotalMinutesToday >= programStartTotalMinutesToday && nowTotalMinutesToday < programEndTotalMinutesToday) {
                 block.classList.add('live');
            }
    
            programBlocksHomeContainer.appendChild(block);
        });
    }

    function renderizarFiccionDestacada() {
        if (!fictionGridContainer || !datosDestacados.length) {
            console.warn("Ficción Destacada: Contenedor o datos no encontrados/vacíos.");
            return;
        }
        fictionGridContainer.innerHTML = '';
        datosDestacados.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('fiction-card');
            if (item.linkPage) card.setAttribute('data-page', item.linkPage);

            card.innerHTML = `
                <img src="${item.imageUrl || 'https://placehold.co/600x350/ccc/fff?text=No+Image'}" alt="${item.title || 'Destacado'}" onerror="this.onerror=null;this.src='https://placehold.co/600x350/000/fff?text=Error+Img';">
                <div class="fiction-card-info">
                    <h3>${item.title || 'Título no disponible'}</h3>
                    <p>${item.bio || ''}</p>
                </div>
            `;
             if (item.linkPage) { 
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateTo(item.linkPage);
                });
            }
            fictionGridContainer.appendChild(card);
        });
    }

    function renderizarParrillaVertical(diaKey) {
        if (!scheduleListVerticalContainer || !datosParrilla.programacion || !datosParrilla.programacion[diaKey]) {
            if(scheduleListVerticalContainer) scheduleListVerticalContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-secondary);">No hay programación disponible para este día.</p>';
            return;
        }
        scheduleListVerticalContainer.innerHTML = '';
        const scheduleData = datosParrilla.programacion[diaKey];
        const now = new Date();
        const nowTotalMinutes = now.getHours() * 60 + now.getMinutes();
        const currentDayName = datosParrilla.diasDisponibles[now.getDay()]; // Esto es una aproximación, necesitarías mapear getDay() a tus nombres de día.
                                                                        // O mejor, si diaKey es "Hoy", comparar con el día actual.

        scheduleData.forEach(program => {
            if (typeof program.duration !== 'number' || isNaN(program.duration)) {
                console.error(`Parrilla Vertical: Duración inválida para "${program.title}" en día "${diaKey}":`, program.duration);
                return; 
            }

            const entry = document.createElement('div');
            entry.classList.add('program-entry');
            const [startHour, startMinute] = program.start.split(':').map(Number);
            const programStartTotalMinutes = startHour * 60 + startMinute;
            const programEndTotalMinutes = programStartTotalMinutes + program.duration;

            // Lógica is-live: solo si es "Hoy" Y la fecha actual coincide con el día de "Hoy"
            // (Asumimos que "Hoy" en los datos se refiere al día en que se carga la página)
            if (diaKey === 'Hoy' && (new Date().toDateString() === new Date().toDateString()) &&
                nowTotalMinutes >= programStartTotalMinutes && nowTotalMinutes < programEndTotalMinutes) {
                entry.classList.add('is-live');
            }

            entry.innerHTML = `
                <div class="time-col">
                    <div class="start-time">${program.start}</div>
                    <div class="duration">${program.duration} mins</div>
                </div>
                <div class="details-col">
                    <h3>${program.title}</h3>
                    <p class="episode">${program.episode || ''}</p>
                    <p class="synopsis">${program.synopsis || 'Sinopsis no disponible.'}</p>
                    ${program.imdb && program.imdb !== '#' ? `<a href="${program.imdb}" target="_blank" rel="noopener noreferrer" class="imdb-link">Ver en IMDb</a>` : ''}
                </div>`;
            scheduleListVerticalContainer.appendChild(entry);
        });
    }

    function configurarTabsParrillaVertical() {
        if (!dayTabsFullContainer || !datosParrilla.diasDisponibles || datosParrilla.diasDisponibles.length === 0) {
            console.warn("Tabs Parrilla Vertical: Contenedor o diasDisponibles no encontrados/vacíos.");
            if(dayTabsFullContainer) dayTabsFullContainer.innerHTML = '';
            return;
        }
        dayTabsFullContainer.innerHTML = '';
        datosParrilla.diasDisponibles.forEach((diaKey, index) => {
            const tabButton = document.createElement('button');
            tabButton.textContent = diaKey;
            if (index === 0) tabButton.classList.add('active'); // Activa el primer tab por defecto
            tabButton.addEventListener('click', () => {
                const currentActive = dayTabsFullContainer.querySelector('.active');
                if (currentActive) currentActive.classList.remove('active');
                tabButton.classList.add('active');
                renderizarParrillaVertical(diaKey);
            });
            dayTabsFullContainer.appendChild(tabButton);
        });
        // Renderizar el primer día por defecto si hay días disponibles
        if (datosParrilla.diasDisponibles.length > 0) {
            renderizarParrillaVertical(datosParrilla.diasDisponibles[0]); 
        }
    }

    // --- LÓGICA DE COMPONENTES Y NAVEGACIÓN ---
    function navigateTo(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const nextPage = document.getElementById(pageId);
        if (nextPage) {
            nextPage.classList.add('active');
            window.scrollTo(0, 0);

            navLinks.forEach(navLink => {
                navLink.classList.toggle('active', navLink.getAttribute('data-page') === pageId);
            });
        } else {
            console.warn(`Página con ID '${pageId}' no encontrada.`);
        }
    }

    function configurarNavegacion() {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const pageId = link.getAttribute('data-page');
                if (pageId) navigateTo(pageId);
            });
        });
        
        const logoElement = document.querySelector('.logo[data-page="home"]');
        if(logoElement) {
            logoElement.addEventListener('click', (event) => {
                 event.preventDefault();
                 navigateTo('home');
            });
        }
        
        const fullScheduleLinks = document.querySelectorAll('.full-schedule-link[data-page="schedule"]');
        fullScheduleLinks.forEach(link => {
             link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('schedule');
            });
        });
    }

    function configurarHeroSlider() {
        if (!heroSliderElement) return;
        const slides = heroSliderElement.querySelectorAll('.hero-slide');
        const dots = heroDotsContainer.querySelectorAll('.dot');
        if (slides.length === 0) {
            // Si no hay slides (quizás porque datosHero estaba vacío), no hacer nada.
            // O podrías mostrar un mensaje de "No hay destacados" en heroSliderElement.
            heroSliderElement.innerHTML = '<p style="text-align:center; padding: 50px; color: var(--text-secondary);">No hay películas destacadas en este momento.</p>';
            if(heroDotsContainer) heroDotsContainer.innerHTML = '';
            return;
        }


        function updateHeroSlideDisplay() {
            slides.forEach((s, i) => s.classList.toggle('active', i === currentHeroSlide));
            if (dots.length > 0) {
                dots.forEach((d, i) => d.classList.toggle('active', i === currentHeroSlide));
            }
            
            const activeSlide = slides[currentHeroSlide];
            if(activeSlide) {
                const ctaButton = activeSlide.querySelector('.cta-button[data-page]');
                if (ctaButton && !ctaButton.hasAttribute('data-listener-attached')) {
                    ctaButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        const pageId = ctaButton.getAttribute('data-page');
                        if (pageId) navigateTo(pageId);
                    });
                    ctaButton.setAttribute('data-listener-attached', 'true');
                }
            }
        }
        
        function nextHeroSlide() {
            currentHeroSlide = (currentHeroSlide + 1) % slides.length;
            updateHeroSlideDisplay();
        }
        
        if (heroAutoSlideInterval) clearInterval(heroAutoSlideInterval);
        heroAutoSlideInterval = setInterval(nextHeroSlide, 5600);
        
        updateHeroSlideDisplay(); 
    }
    
    function setHeroSlideManual(index) {
        if (!heroSliderElement) return;
        const slides = heroSliderElement.querySelectorAll('.hero-slide');
        if (index < 0 || index >= slides.length) return;

        clearInterval(heroAutoSlideInterval);
        currentHeroSlide = index;
        configurarHeroSlider(); // Llama a configurar de nuevo para actualizar UI y reiniciar intervalo
    }


    function configurarTimelineHorizontalScroll() {
        if (!timelineWrapper) return;
        let isDown = false;
        let startX;
        let scrollLeft;
        timelineWrapper.addEventListener('mousedown', (e) => { isDown = true; timelineWrapper.classList.add('active'); startX = e.pageX - timelineWrapper.offsetLeft; scrollLeft = timelineWrapper.scrollLeft; });
        timelineWrapper.addEventListener('mouseleave', () => { isDown = false; timelineWrapper.classList.remove('active'); });
        timelineWrapper.addEventListener('mouseup', () => { isDown = false; timelineWrapper.classList.remove('active'); });
        timelineWrapper.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - timelineWrapper.offsetLeft; const walk = (x - startX) * 2.5; timelineWrapper.scrollLeft = scrollLeft - walk; });
    }

    // --- INICIALIZACIÓN DE LA UI ---
    function inicializarUI() {
        // Renderizar condicionalmente y con logs para debugging
        if (datosHero && datosHero.length > 0) renderizarHero(); 
        else console.warn("Datos del Hero vacíos o no definidos.");

        if (datosEstaNoche && Object.keys(datosEstaNoche).length > 0 && datosEstaNoche.programas) renderizarEstaNoche(); 
        else console.warn("Datos de Esta Noche vacíos, no definidos o sin 'programas'.");

        if (datosParrilla && datosParrilla.programacion && Object.keys(datosParrilla.programacion).length > 0) {
            if (datosParrilla.programacion['Hoy']) renderizarParrillaHorizontal(); else console.warn("Parrilla Horizontal: No hay datos para 'Hoy'.");
            if (datosParrilla.diasDisponibles) configurarTabsParrillaVertical(); else console.warn("Parrilla Vertical: 'diasDisponibles' no encontrado.");
        } else {
            console.warn("Datos de Parrilla vacíos, no definidos o malformados.");
        }

        if (datosDestacados && datosDestacados.length > 0) renderizarFiccionDestacada(); 
        else console.warn("Datos Destacados vacíos o no definidos.");
        
        configurarNavegacion();
        configurarTimelineHorizontalScroll();

        navigateTo('home');
    }

    // Llamar a inicializarUI directamente ya que los datos están incrustados
    inicializarUI();
});