// Refactored class based structured code:

// uiComponent.js (Base class for shared UI functionality)
class UIComponent {
    static #DEFAULT_ANIMATION_DURATION = 300; // Private static property for animation duration

    // Static method for creating DOM elements
    static createElement(tag, className, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
    }

    // Getter for animation duration
    static get animationDuration() {
        return this.#DEFAULT_ANIMATION_DURATION;
    }
}

// main.js (LibraryManager class extending UIComponent)
class LibraryManager extends UIComponent {
    #defaultText; // Private field for default text element
    #contentContainer; // Private field for content container
    #modalContainer; // Private field for modal container
    #form; // Private field for form

    constructor() {
        super(); // Call parent constructor
        this.#initializeDOMReferences();
    }

    // Private method to initialize DOM references
    #initializeDOMReferences() {
        this.#defaultText = document.getElementById("default_text");
        this.#contentContainer = document.querySelector(".content-container");
        this.#modalContainer = document.querySelector(".modal-container");
        this.#form = document.querySelector("#createBookForm");
    }

    // Private method to update default text visibility
    #updateDefaultText() {
        const bookElements = this.#contentContainer.querySelectorAll(".book");
        this.#defaultText.classList.toggle("visible", bookElements.length === 0);
    }

    // Private method to create SVG icons
    #createSVGIcon(id, viewBox, pathD) {
        return UIComponent.createElement("svg", null, {
            "id": id,
            "width": "16",
            "height": "16",
            "viewBox": viewBox,
            "fill": "none",
            "stroke": "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }).appendChild(UIComponent.createElement("path", null, { "d": pathD }));
    }

    // Private method to create a book element
    #createBookElement(bookData) {
        const bookDiv = UIComponent.createElement("div", "book");
        const bookControlDiv = UIComponent.createElement("div", null, { "id": "book-controls" });
        const statusBadgeDiv = UIComponent.createElement("div", null, { "id": "status-badge" });
        statusBadgeDiv.classList.add(bookData.status.toLowerCase());

        const statusText = UIComponent.createElement("p", null, { "id": "status-text" });
        statusText.textContent = bookData.status === "read" ? "Read" : "Unread";

        const readIcon = this.#createSVGIcon("read-icon", "0 0 24 24", "M20 6 9 17l-5-5");
        const unreadIcon = this.#createSVGIcon("unread-icon", "0 0 24 24", "M18 6 6 18 M6 6l12 12");

        if (bookData.status === "read") {
            readIcon.style.display = "block";
            unreadIcon.style.display = "none";
        } else {
            readIcon.style.display = "none";
            unreadIcon.style.display = "block";
        }

        statusBadgeDiv.append(statusText, readIcon, unreadIcon);
        bookControlDiv.appendChild(statusBadgeDiv);

        const deleteButton = UIComponent.createElement("button", null, { "id": "delete-book-button" });
        deleteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                <line x1="10" x2="10" y1="11" y2="17"/>
                <line x1="14" x2="14" y1="11" y2="17"/>
            </svg>
        `;
        deleteButton.addEventListener("click", () => {
            bookDiv.classList.add("fade-out");
            setTimeout(() => {
                bookDiv.remove();
                this.#updateDefaultText();
            }, UIComponent.animationDuration);
        });

        bookControlDiv.appendChild(deleteButton);
        bookDiv.appendChild(bookControlDiv);

        const bookTitle = UIComponent.createElement("h3", "book-title");
        bookTitle.textContent = bookData.title;
        bookDiv.appendChild(bookTitle);

        const createInfoContainer = (label, value, id = null) => {
            const container = UIComponent.createElement("div", "info-container");
            const title = UIComponent.createElement("p");
            title.textContent = `${label}: `;

            const info = UIComponent.createElement("p");
            if (id) info.id = id;
            info.classList.add("grey");
            info.textContent = value;

            container.append(title, info);
            return container;
        };

        bookDiv.append(
            createInfoContainer("Author", bookData.author, "author-name"),
            createInfoContainer("Pages", bookData.pages, "page-count"),
            createInfoContainer("Description", bookData.description, "book-description")
        );

        return bookDiv;
    }

    // Public method to initialize the library manager
    initialize() {
        this.#updateDefaultText();

        this.#form.addEventListener("submit", (event) => {
            event.preventDefault();

            const bookName = document.getElementById("book_title").value.trim();
            const pageCount = document.getElementById("page_count").value.trim();
            const authorName = document.getElementById("author_name").value.trim();
            const bookDescription = document.getElementById("book_description").value.trim();
            const readStatus = document.querySelector('input[name="status"]:checked');

            if (!bookName || !pageCount || !authorName || !bookDescription || !readStatus) {
                alert("Please fill in all the required fields.");
                return;
            }

            const bookData = {
                title: bookName,
                pages: pageCount,
                author: authorName,
                description: bookDescription,
                status: readStatus.value
            };

            const newBook = this.#createBookElement(bookData);
            this.#contentContainer.appendChild(newBook);

            this.#form.reset();
            if (this.#modalContainer) {
                this.#modalContainer.classList.remove("show");
            }
            this.#updateDefaultText();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const libraryManager = new LibraryManager();
    libraryManager.initialize();
});



// Original Regular Code 

// const LibraryManager = () => {
//     // Private variables (closure)
//     const defaultText = document.getElementById("default_text");
//     const contentContainer = document.querySelector(".content-container");
//     const modalContainer = document.querySelector(".modal-container");
//     const form = document.querySelector("#createBookForm");

//     // Private helper function to update default text visibility
//     const updateDefaultText = () => {
//         const bookElements = contentContainer.querySelectorAll(".book");
//         defaultText.classList.toggle("visible", bookElements.length === 0);
//     };

//     // Private helper function to create SVG icons
//     const createSVGIcon = (id, viewBox, pathD) => {
//         const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//         svg.setAttribute("id", id);
//         svg.setAttribute("width", "16");
//         svg.setAttribute("height", "16");
//         svg.setAttribute("viewBox", viewBox);
//         svg.setAttribute("fill", "none");
//         svg.setAttribute("stroke", "currentColor");
//         svg.setAttribute("stroke-width", "2");
//         svg.setAttribute("stroke-linecap", "round");
//         svg.setAttribute("stroke-linejoin", "round");

//         const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//         path.setAttribute("d", pathD);

//         svg.appendChild(path);
//         return svg;
//     };

//     // Private helper function to create a book element
//     const createBookElement = (bookData) => {
//         const bookDiv = document.createElement("div");
//         bookDiv.classList.add("book");

//         const bookControlDiv = document.createElement("div");
//         bookControlDiv.id = "book-controls";

//         const statusBadgeDiv = document.createElement("div");
//         statusBadgeDiv.id = "status-badge";
//         statusBadgeDiv.classList.add(bookData.status.toLowerCase());

//         const statusText = document.createElement("p");
//         statusText.id = "status-text";
//         statusText.textContent = bookData.status === "read" ? "Read" : "Unread";

//         const readIcon = createSVGIcon("read-icon", "0 0 24 24", "M20 6 9 17l-5-5");
//         const unreadIcon = createSVGIcon("unread-icon", "0 0 24 24", "M18 6 6 18 M6 6l12 12");

//         if (bookData.status === "read") {
//             readIcon.style.display = "block";
//             unreadIcon.style.display = "none";
//         } else {
//             readIcon.style.display = "none";
//             unreadIcon.style.display = "block";
//         }

//         statusBadgeDiv.appendChild(statusText);
//         statusBadgeDiv.appendChild(readIcon);
//         statusBadgeDiv.appendChild(unreadIcon);
//         bookControlDiv.appendChild(statusBadgeDiv);

//         const deleteButton = document.createElement("button");
//         deleteButton.id = "delete-book-button";
//         deleteButton.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                 <path d="M3 6h18"/>
//                 <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
//                 <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
//                 <line x1="10" x2="10" y1="11" y2="17"/>
//                 <line x1="14" x2="14" y1="11" y2="17"/>
//             </svg>
//         `;
//         deleteButton.addEventListener("click", () => {
//             bookDiv.classList.add("fade-out");
//             setTimeout(() => {
//                 bookDiv.remove();
//                 updateDefaultText();
//             }, 300);
//         });

//         bookControlDiv.appendChild(deleteButton);
//         bookDiv.appendChild(bookControlDiv);

//         const bookTitle = document.createElement("h3");
//         bookTitle.classList.add("book-title");
//         bookTitle.textContent = bookData.title;
//         bookDiv.appendChild(bookTitle);

//         const createInfoContainer = (label, value, id = null) => {
//             const container = document.createElement("div");
//             container.classList.add("info-container");

//             const title = document.createElement("p");
//             title.textContent = `${label}: `;

//             const info = document.createElement("p");
//             if (id) info.id = id;
//             info.classList.add("grey");
//             info.textContent = value;

//             container.appendChild(title);
//             container.appendChild(info);
//             return container;
//         };

//         bookDiv.appendChild(createInfoContainer("Author", bookData.author, "author-name"));
//         bookDiv.appendChild(createInfoContainer("Pages", bookData.pages, "page-count"));
//         bookDiv.appendChild(createInfoContainer("Description", bookData.description, "book-description"));

//         return bookDiv;
//     };

//     // Public API
//     return {
//         init: () => {
//             // Run initial check
//             updateDefaultText();

//             // Handle form submission
//             form.addEventListener("submit", (event) => {
//                 event.preventDefault();

//                 const bookName = document.getElementById("book_title").value.trim();
//                 const pageCount = document.getElementById("page_count").value.trim();
//                 const authorName = document.getElementById("author_name").value.trim();
//                 const bookDescription = document.getElementById("book_description").value.trim();
//                 const readStatus = document.querySelector('input[name="status"]:checked');

//                 if (!bookName || !pageCount || !authorName || !bookDescription || !readStatus) {
//                     alert("Please fill in all the required fields.");
//                     return;
//                 }

//                 const bookData = {
//                     title: bookName,
//                     pages: pageCount,
//                     author: authorName,
//                     description: bookDescription,
//                     status: readStatus.value
//                 };

//                 const newBook = createBookElement(bookData);
//                 contentContainer.appendChild(newBook);

//                 form.reset();
//                 if (modalContainer) {
//                     modalContainer.classList.remove("show");
//                 }
//                 updateDefaultText();
//             });
//         }
//     };
// };

// // Initialize when DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//     LibraryManager().init();
// });