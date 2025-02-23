document.addEventListener("DOMContentLoaded", function () {
    const defaultText = document.getElementById("default_text");
    const contentContainer = document.querySelector(".content-container");
    const modalContainer = document.querySelector(".modal-container");

    // Function that updates visibility of "Your Library Is Empty" message
    function updateDefaultText() {
        const bookElements = contentContainer.querySelectorAll(".book");
        if (bookElements.length > 0) {
            defaultText.classList.remove("visible");
        } else {
            defaultText.classList.add("visible");
        }
    }

    // Running once on page load in case books already exist
    updateDefaultText();

    // Add event listener for book creation
    document.querySelector("#createBookForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Initializing Variables
        const bookName = document.getElementById("book_title").value.trim();
        const pageCount = document.getElementById("page_count").value.trim();
        const authorName = document.getElementById("author_name").value.trim();
        const bookDescription = document.getElementById("book_description").value.trim();
        const readStatus = document.querySelector('input[name="status"]:checked');

        // Validate form fields
        if (!bookName || !pageCount || !authorName || !bookDescription || !readStatus) {
            alert("Please fill in all the required fields.");
            return;
        }

        // Creating book container
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Creating Book Controls
        const bookControlDiv = document.createElement("div");
        bookControlDiv.id = "book-controls";

        const statusBadgeDiv = document.createElement("div");
        statusBadgeDiv.id = "status-badge";
        statusBadgeDiv.classList.add(readStatus.value.toLowerCase(), "badge");

        // Status Text
        const statusText = document.createElement("p");
        statusText.id = "status-text";
        statusText.textContent = readStatus.value === "read" ? "Read" : "Unread";

        // Function to create SVG icons properly
        function createSVGIcon(id, viewBox, pathD) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("id", id);
            svg.setAttribute("width", "16");
            svg.setAttribute("height", "16");
            svg.setAttribute("viewBox", viewBox);
            svg.setAttribute("fill", "none");
            svg.setAttribute("stroke", "currentColor");
            svg.setAttribute("stroke-width", "2");
            svg.setAttribute("stroke-linecap", "round");
            svg.setAttribute("stroke-linejoin", "round");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathD);

            svg.appendChild(path);
            return svg;
        }

        // Read icon
        const readIcon = createSVGIcon("read-icon", "0 0 24 24", "M20 6 9 17l-5-5");

        // Unread icon
        const unreadIcon = createSVGIcon("unread-icon", "0 0 24 24", "M18 6 6 18 M6 6l12 12");

        // Ensure only one icon is visible initially
        if (readStatus.value === "read") {
            readIcon.style.display = "block";
            unreadIcon.style.display = "none";
        } else {
            readIcon.style.display = "none";
            unreadIcon.style.display = "block";
        }

        // Append elements
        statusBadgeDiv.appendChild(statusText);
        statusBadgeDiv.appendChild(readIcon);
        statusBadgeDiv.appendChild(unreadIcon);
        bookControlDiv.appendChild(statusBadgeDiv);

        // Creating & appending delete button
        const deleteButton = document.createElement("button");
        deleteButton.id = "delete-book-button";
        deleteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                <line x1="10" x2="10" y1="11" y2="17"/>
                <line x1="14" x2="14" y1="11" y2="17"/>
            </svg>
        `;
        deleteButton.addEventListener("click", function () {
            bookDiv.classList.add("fade-out"); // Apply fade-out class
            setTimeout(() => {
                bookDiv.remove();
                updateDefaultText(); // Ensure message appears when all books are removed
            }, 300); // Match the transition duration (0.3s)
        });

        bookControlDiv.appendChild(deleteButton);
        bookDiv.appendChild(bookControlDiv);

        // Creating & Appending Book Title
        const bookTitle = document.createElement("h3");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = `${bookName}`;
        bookDiv.appendChild(bookTitle);

        // Author Name
        const bookAuthorContainer = document.createElement("div");
        bookAuthorContainer.classList.add("info-container");

        const bookAuthorTitle = document.createElement("p");
        bookAuthorTitle.textContent = "Author: ";

        const bookAuthor = document.createElement("p");
        bookAuthor.id = "author-name";
        bookAuthor.classList.add("grey");
        bookAuthor.textContent = `${authorName}`;

        bookAuthorContainer.appendChild(bookAuthorTitle);
        bookAuthorContainer.appendChild(bookAuthor);

        bookDiv.appendChild(bookAuthorContainer);

        // Page Count
        const pageNumberContainer = document.createElement("div");
        pageNumberContainer.classList.add("info-container");

        const pageNumberTitle = document.createElement("p");
        pageNumberTitle.textContent = "Pages: ";

        const pageNumber = document.createElement("p");
        pageNumber.id = "page-count";
        pageNumber.classList.add("grey");
        pageNumber.textContent = `${pageCount}`;

        pageNumberContainer.appendChild(pageNumberTitle);
        pageNumberContainer.appendChild(pageNumber);

        bookDiv.appendChild(pageNumberContainer);

        // Book Description
        const bookDescriptionContainer = document.createElement("div");
        bookDescriptionContainer.classList.add("info-container");

        const bookDescriptionTitle = document.createElement("p");
        bookDescriptionTitle.textContent = "Description: ";

        const bookDescriptionDisplay = document.createElement("p");
        bookDescriptionDisplay.id = "book-description";
        bookDescriptionDisplay.classList.add("grey");
        bookDescriptionDisplay.textContent = `${bookDescription}`;

        bookDescriptionContainer.appendChild(bookDescriptionTitle);
        bookDescriptionContainer.appendChild(bookDescriptionDisplay);

        bookDiv.appendChild(bookDescriptionContainer);

        // Append newly created book element to the container
        contentContainer.appendChild(bookDiv);

        // Clear form inputs
        document.getElementById("createBookForm").reset();

        // Update default text visibility
        updateDefaultText();

        // 🔹 Close the modal automatically on form submission
        modalContainer.classList.remove("show");
    });
});