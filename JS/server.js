document.addEventListener('DOMContentLoaded', () => {
    console.log('Pilar Media Labs ha cargado exitosamente.');

    // Función para smooth scrolling (navegación suave)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Pequeño script para simular un mensaje de "Servicio en Desarrollo"
    const servicioItems = document.querySelectorAll('.servicio-item');
    
    servicioItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('¡Genial! Estás interesado en ' + item.querySelector('h3').textContent + '. Estamos finalizando los paquetes de precios. ¡Contáctanos directamente!');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. DATA: SIMULACIÓN DE PROYECTOS
    // ----------------------------------------------------------------------
    // Esta estructura simula una base de datos de proyectos.
    // La clave es la categoría (ej. 'web-proyectos').
    const PROYECTOS_DATA = {
        'web-proyectos': [
            {
                id: 'web-01',
                title: 'E-commerce Futurista',
                category: 'Diseño Web & Desarrollo',
                thumbnail: 'path/to/web_thumb_01.jpg', // Reemplazar
                type: 'image',
                content: 'path/to/web_full_01.jpg', // Imagen de maqueta grande
                description: 'Diseño y desarrollo de una plataforma de comercio electrónico con un enfoque minimalista y de alto rendimiento. Uso de React y NodeJS.'
            },
            {
                id: 'web-02',
                title: 'Blog de Contenidos Interactivos',
                category: 'Diseño Web & Desarrollo',
                thumbnail: 'path/to/web_thumb_02.jpg', // Reemplazar
                type: 'image',
                content: 'path/to/web_full_02.jpg',
                description: 'Sitio de publicación con micro-interacciones animadas. Optimizado para SEO y carga rápida, enfocado en el contenido multimedia.'
            }
        ],
        'sound-proyectos': [
            {
                id: 'sound-01',
                title: 'Audio Branding: Startup X',
                category: 'Producción Sonora',
                thumbnail: 'path/to/sound_thumb_01.jpg', // Reemplazar
                type: 'audio',
                content: 'path/to/audio_branding.mp3', // Archivo de audio
                description: 'Creación de la identidad sonora completa, incluyendo el jingle de marca, sonidos UI/UX y música de espera telefónica.'
            },
            {
                id: 'sound-02',
                title: 'Podcast "Digital Minds"',
                category: 'Producción Sonora',
                thumbnail: 'path/to/sound_thumb_02.jpg', // Reemplazar
                type: 'image',
                content: 'path/to/podcast_cover.jpg',
                description: 'Post-producción, mezcla y masterización semanal de un podcast corporativo. Incluye diseño de efectos de sonido (SFX).'
            }
        ],
        'media-proyectos': [
            {
                id: 'media-01',
                title: 'Campaña Lanzamiento Q4',
                category: 'Edición Multimedia',
                thumbnail: 'path/to/media_thumb_01.jpg', // Reemplazar
                type: 'video',
                content: 'https://www.youtube.com/embed/VIDEO_ID_EJEMPLO', // Enlace de YouTube Embed
                description: 'Edición y motion graphics para una serie de 5 videos cortos de lanzamiento en redes sociales. Diseño de color y corrección visual.'
            }
        ]
    };

    // ----------------------------------------------------------------------
    // 2. ELEMENTOS DEL DOM
    // ----------------------------------------------------------------------
    const portfolioSection = document.getElementById('portafolio');
    const projectsSection = document.getElementById('proyectos-desplegables');
    const projectsContainer = document.getElementById('proyectos-container');
    const projectsTitle = document.getElementById('proyectos-titulo');
    const backButton = document.getElementById('btn-volver');
    
    // Elementos del Modal
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-body-content');
    const closeButton = document.querySelector('.close-button');


    // ----------------------------------------------------------------------
    // 3. FUNCIONALIDAD PRINCIPAL (DESPLIEGUE DE CATEGORÍAS)
    // ----------------------------------------------------------------------

    // Función para crear el HTML de un tile de proyecto
    const createProjectTile = (project) => {
        return `
            <div class="proyecto-item" data-id="${project.id}">
                <img src="${project.thumbnail}" alt="Miniatura ${project.title}">
                <h4>${project.title}</h4>
            </div>
        `;
    };

    // Función que carga y muestra los proyectos de una categoría
    const showProjects = (categoryKey, categoryTitle) => {
        const projects = PROYECTOS_DATA[categoryKey];
        if (!projects || projects.length === 0) return;

        // Construir el HTML de los tiles
        const projectsHTML = projects.map(createProjectTile).join('');
        projectsContainer.innerHTML = projectsHTML;

        // Actualizar título
        projectsTitle.textContent = `Proyectos de ${categoryTitle}`;
        
        // Animación de transición de sección
        portfolioSection.classList.add('hidden');
        projectsSection.classList.remove('hidden');

        // Scroll suave hacia la sección de proyectos
        projectsSection.scrollIntoView({ behavior: 'smooth' });

        // Añadir escuchadores de clic a los nuevos tiles de proyecto
        document.querySelectorAll('.proyecto-item').forEach(tile => {
            tile.addEventListener('click', (e) => {
                const projectId = tile.getAttribute('data-id');
                // Encontrar el proyecto completo en todos los datos
                const project = Object.values(PROYECTOS_DATA).flat().find(p => p.id === projectId);
                if (project) {
                    openModal(project);
                }
            });
        });
    };

    // Escuchador de clics en las categorías del portafolio
    document.querySelectorAll('.portafolio-tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
            const categoryKey = tile.getAttribute('data-category');
            const categoryTitle = tile.querySelector('h3').textContent.replace('Ver proyectos de', '').trim();
            showProjects(categoryKey, categoryTitle);
        });
    });

    // Escuchador del botón "Volver a Categorías"
    backButton.addEventListener('click', () => {
        projectsSection.classList.add('hidden');
        portfolioSection.classList.remove('hidden');
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
    });


    // ----------------------------------------------------------------------
    // 4. FUNCIONALIDAD DEL MODAL
    // ----------------------------------------------------------------------

    const openModal = (project) => {
        let contentHTML = `
            <h3 class="modal-title" style="color:var(--color-principal); text-shadow: 0 0 5px var(--color-principal);">${project.title}</h3>
            <p style="color:#ccc; margin-bottom: 20px;">Categoría: ${project.category}</p>
        `;

        // Generar contenido multimedia según el tipo
        switch (project.type) {
            case 'video':
                // Nota: Usar un iframe de YouTube o Vimeo para videos
                contentHTML += `<iframe width="100%" height="400" src="${project.content}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                break;
            case 'audio':
                // Nota: Usar la etiqueta <audio> para archivos MP3
                contentHTML += `<audio controls style="width:100%;"><source src="${project.content}" type="audio/mpeg">Tu navegador no soporta el elemento de audio.</audio>`;
                break;
            case 'image':
                // Nota: Usar la etiqueta <img> para imágenes o mockups
                contentHTML += `<img src="${project.content}" alt="${project.title} Imagen Completa">`;
                break;
        }

        contentHTML += `<p style="margin-top: 15px; color: white;">${project.description}</p>`;

        modalContent.innerHTML = contentHTML;
        modal.style.display = "block";
        document.body.style.overflow = 'hidden'; // Evita el scroll de fondo
    };

    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        // Opcional: Pausar cualquier medio al cerrar
        const mediaElement = modalContent.querySelector('iframe, audio, video');
        if (mediaElement && mediaElement.contentWindow) {
             // Intenta forzar la pausa de YouTube o Vimeo si es un iframe
             mediaElement.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    };

    // Escuchadores para cerrar el modal
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

});

