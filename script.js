const docs = [
    {
        title: "Urban diagnosis of a street",
        description:
            "My work revolves around understanding and shaping the urban environment through a comprehensive approach. This involves analyzing the urban context to identify key dynamics and challenges, conducting field observations to gather real-world insights, and leveraging data processing tools to extract meaningful patterns. From these analyses, I develop informed recommendations and craft development scenarios that align with environmental sustainability and community needs. My focus is on creating innovative and practical solutions that address contemporary urban challenges while fostering resilient and livable spaces. Here is a sample of my street diagnosis, focused on the building height analysis.",
        url: "assets/urban.png",
        tags: ["Diagnosis"]
    },
    {
        title: "Thermal renovation of existing buildings",
        description:
            "Thermal diagnosis of an existing building, thermal assessment of a replacement building.",
        url: "assets/thermal.png",
        tags: ["Modeling", "Diagnosis"]
    },
    {
        title: "Urban heat island modeling",
        description:
            "I was tasked with analyzing a city in the Hauts-de-France region to study the various factors contributing to heat-related phenomena. To address my research question, I modeled the city and its key characteristics. This approach allowed me to identify potential cool zones as well as areas vulnerable to urban heat islands, forming the basis of an urban diagnostic. Using cartographic models that integrate multiple datasets, I was able to pinpoint the underlying causes of the city’s susceptibility to heatwaves.",
        url: "assets/heat.png",
        tags: ["GIS", "Diagnosis"]
    },
    {
        title: "2D and 3D building model, electrical simulation, and a neighborhood model using CAD",
        description:
            "I developed both 2D and 3D building models to serve as the foundation for advanced analysis and simulation. Using CAD software, I constructed detailed representations of individual structures as well as a broader neighborhood model, capturing the spatial relationships and architectural characteristics of the area. The model was further integrated into an electrical simulation. Finally, I created a physical model of the neighborhood to provide a tangible representation of its layout and structures.",
        url: "assets/building.png",
        tags: ["Modeling"]
    },
    {
        title: "Creation of a GIS method-tool to support decision-making for submarine cable laying",
        description:
            "As part of this project, we conducted an in-depth study to identify the critical criteria influencing the placement of submarine cables. Leveraging ArcGIS Pro, we developed a dynamic mapping tool capable of integrating multiple variables and visualizing the optimal pathways for cable deployment.",
        url: "assets/cable.png",
        tags: ["GIS"]
    }    
];


const docContainer = document.querySelector(".docs");

const tagColors = {
    Code: "grey"
};

const docSelection = document.querySelector(".tag-selection");

// Création du modal pour l'affichage de l'image en plein écran
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

// Création du contenu du modal
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <img id="modal-image" src="" alt="Document Image">
    <p id="modal-text" class="modal-text"></p>
  </div>
`;

// Sélection des éléments du modal
const modalImage = modal.querySelector('#modal-image');
const modalText = modal.querySelector('#modal-text');
const closeModal = modal.querySelector('.close');

// Fermeture du modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermeture du modal en cliquant en dehors du contenu
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Affichage immédiat des documents au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    filterDocs(); // Affiche tous les documents au chargement
});

// Gestion de l'événement de clic sur le conteneur des documents
docContainer.addEventListener("click", function (e) {
    const tagItem = e.target.closest(".docs__tag");
    if (!tagItem) return;
    const tag = tagItem.textContent;
    highlightTag(tag);
    filterDocs(tag);
});

// Gestion de l'événement de clic sur la sélection de tags
docSelection.addEventListener("click", function (e) {
    const tagItem = e.target.closest(".docs__tag");
    if (!tagItem) return;
    const tag = tagItem.textContent;
    if (tagItem.classList.contains("tag-inactive")) {
        highlightTag(tag);
        filterDocs(tag);
    } else {
        highlightTag();
        filterDocs();
    }
});

// Fonction pour filtrer les documents
function filterDocs(tag = "My projects") {
    if (tag === "My projects") return printDocs(docs);
    const filteredDocs = docs.filter((doc) => doc.tags.includes(tag));
    printDocs(filteredDocs);
}

// Fonction pour mettre en évidence le tag sélectionné
function highlightTag(tag = "My projects") {
    docSelection.querySelectorAll("p").forEach((tagSelect) => {
        if (tagSelect.textContent === tag) tagSelect.classList.remove("tag-inactive");
        else tagSelect.classList.add("tag-inactive");
    });
}

// Fonction pour afficher les documents
function printDocs(docArray) {
    docContainer.innerHTML = ""; // Réinitialise le conteneur

    docArray.forEach((doc) => {
        let tags = "";
        doc.tags.forEach((tag) => {
            const tagHTML = `
                <p class="docs__tag docs__tag--${tagColors[tag] ? tagColors[tag] : "grey"}">${tag}</p>
            `;
            tags += tagHTML;
        });

        const html = `
            <div class="docs__item">
                <img src="${doc.url}" alt="${doc.title}" data-title="${doc.title}" data-description="${doc.description}">
                <div>
                    <h3>${doc.title}</h3>
                </div>
                <div class="docs__tags">
                    ${tags}
                </div>
            </div>
        `;

        docContainer.insertAdjacentHTML("beforeend", html);
    });

    // Ajout d'un gestionnaire d'événements pour les images
    const docImages = document.querySelectorAll(".docs__item img");
    docImages.forEach((img) => {
        img.addEventListener("click", (e) => {
            const target = e.target;
            modalImage.src = target.src;
            modalText.textContent = target.dataset.description;
            modal.style.display = 'block';
        });
    });
}
// Sélectionnez tous les tags
const tags = document.querySelectorAll('.docs__tag');

// Ajoutez un événement de clic à chaque tag
tags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Retirez la classe "active" de tous les tags
        tags.forEach(t => t.classList.remove('active'));
        
        // Ajoutez la classe "active" au tag cliqué
        tag.classList.add('active');
        
        // Filtrer les documents par tag
        const tagText = tag.textContent;
        filterDocs(tagText); // Appelez votre fonction pour filtrer les documents
    });
});
