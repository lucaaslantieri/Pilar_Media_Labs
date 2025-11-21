document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const PROYECTOS_DATA = {
        'web-proyectos': [
            {
                id: 'web-01',
                title: 'E-commerce Neón - Diseño Completo',
                category: 'Diseño Web & Desarrollo',
                thumbnail: 'assets/proyectos/web/ecommerce_neon_thumb.jpg', 
                type: 'image',
                content: 'assets/proyectos/web/ecommerce_neon_full.jpg', 
                description: 'Diseño y desarrollo de una plataforma de comercio electrónico con un enfoque minimalista y de alto rendimiento. Uso de React y NodeJS.'
            },
            {
                id: 'web-02',
                title: 'Blog de Contenidos Interactivos',
                category: 'Diseño Web & Desarrollo',
                thumbnail: 'assets/proyectos/web/blog_interactivo_thumb.jpg', 
                type: 'image',
                content: 'assets/proyectos/web/blog_interactivo_full.jpg',
                description: 'Sitio de publicación con micro-interacciones animadas. Optimizado para SEO y carga rápida, enfocado en el contenido multimedia.'
            }
        ],
        'sound-proyectos': [
            {
                id: 'sound-01',
                title: 'Musica para Spotify',
                category: 'Producción Sonora',
                thumbnail: 'IMG/sirena_portada.jpg', 
                type: 'audio',
                content: 'AUDIOS/Sirena.wav', 
                description: 'Musica para Spotify'
            },
            {
                id: 'sound-02',
                title: 'Musica para Spotify',
                category: 'Producción Sonora',
                thumbnail: 'IMG/sin_control_portada.jpg', 
                type: 'audio',
                content: 'AUDIOS/sin_control.wav', 
                description: 'Musica para Spotify'
            }
        ],
        'media-proyectos': [
            {
                id: 'media-01',
                title: 'EL OTRO LADO',
                thumbnail: 'IMG/el_otro_lado.png',  
                category: 'Edición Multimedia',
                type: 'video',
                content: 'https://www.youtube.com/embed/Dup3j69zBN8', 
                description: 'Edición de video y realizacion de cortometraje.'
            },
            {
                id: 'media-02',
                title: 'ENTREGA 314',
                category: 'Edición Multimedia',
                thumbnail: 'IMG/Entrega_314.png', 
                type: 'video',
                content: 'https://www.youtube.com/embed/gDsM_yHT0c0', 
                description: 'Edición de video y realizacion de cortometraje. Direccion del contenido'
            }
        ]
    };

    const getEmbedUrl = (url) => {
        let embedUrl = url.replace("watch?v=", "embed/"); 
        embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/"); 
        
        if (!embedUrl.startsWith('http')) {
            embedUrl = 'https://' + embedUrl;
        }
        
        if (embedUrl.includes('?')) {
            embedUrl += '&autoplay=1&mute=1'; 
        } else {
            embedUrl += '?autoplay=1&mute=1'; 
        }
        
        return embedUrl;
    };
    
    const PROJECT_INDEX = {};
    Object.values(PROYECTOS_DATA).flat().forEach(p => {
        PROJECT_INDEX[p.id] = p;
    });

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-body-content');
    const closeButton = document.querySelector('.close-button');

    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        modalContent.innerHTML = ''; 
    };
    
    const createProjectTile = (project) => {
        return `
            <div class="proyecto-item" data-id="${project.id}">
                <img src="${project.thumbnail}" alt="Miniatura ${project.title}">
                <h4>${project.title}</h4>
            </div>
        `;
    };

    const openProjectDetailModal = (project) => {
        let contentHTML = `
            <h3 class="modal-title" style="color:var(--color-principal); text-shadow: 0 0 5px var(--color-principal);">${project.title}</h3>
            <p style="color:#ccc; margin-bottom: 20px;">Categoría: ${project.category}</p>
        `;

        switch (project.type) {
            case 'video':
                const videoEmbedUrl = getEmbedUrl(project.content);
                contentHTML += `
                    <iframe width="100%" height="400" 
                        src="${videoEmbedUrl}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
                break;
            case 'audio':
                contentHTML += `<audio controls style="width:100%;"><source src="${project.content}" type="audio/wav">Tu navegador no soporta el elemento de audio.</audio>`; 
                break;
            case 'image':
                contentHTML += `<img src="${project.content}" alt="${project.title} Imagen Completa">`;
                break;
        }

        contentHTML += `<p style="margin-top: 15px; color: white;">${project.description}</p>`;
        
        modalContent.innerHTML = contentHTML;
        modal.style.display = "block";
        document.body.style.overflow = 'hidden'; 
    };
    
    const showProjectsInModal = (categoryKey, categoryTitle) => {
        const projects = PROYECTOS_DATA[categoryKey];
        if (!projects || projects.length === 0) return;

        let modalHTML = `
            <h2 style="color:var(--color-principal); text-shadow: 0 0 5px var(--color-principal); margin-bottom: 20px; font-family: var(--font-heading);">Portafolio: ${categoryTitle}</h2>
            <div class="proyectos-grid" id="modal-projects-container">
                ${projects.map(createProjectTile).join('')}
            </div>
        `;

        modalContent.innerHTML = modalHTML;
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';

        document.querySelectorAll('#modal-projects-container .proyecto-item').forEach(tile => {
            tile.addEventListener('click', () => {
                const projectId = tile.getAttribute('data-id');
                const project = PROJECT_INDEX[projectId];
                if (project) {
                    openProjectDetailModal(project);
                }
            });
        });
    };

    document.querySelectorAll('.portafolio-tile').forEach(tile => {
        tile.addEventListener('click', (event) => {
            
            if (tile.classList.contains('tile-disabled')) {
                event.preventDefault(); 
                return; 
            }

            const categoryKey = tile.getAttribute('data-category');
            const categoryTitle = tile.querySelector('h3').textContent;
            showProjectsInModal(categoryKey, categoryTitle);
        });
    });

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

});