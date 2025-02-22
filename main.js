document.querySelector('#createBookForm').addEventListener('submit', function(event) {

    event.preventDefault();

    // Initializing Variables
    const bookName = document.getElementById('book_title').value.trim();
    const pageCount = document.getElementById('page_count').value.trim();
    const authorName = document.getElementById('author_name').value.trim();
    const bookDescription = document.getElementById('book_description').value.trim();
    const readStatus = document.querySelector('input[name="status"]:checked'); 

    // validate form fields 
    if ( !bookName || !pageCount || !authorName || !bookDescription || !readStatus) {
        alert('Please fill in all the required fields.');
    }

    // Creating book container 
    const bookDiv = document.createElement("div");
    bookDiv.classList.add('book');

    // Creating Book Controls 
    const bookControlDiv = document.createElement("div");
    bookControlDiv.id = "book-controls";

    const statusBadgeDiv = document.createElement("div");
    statusBadgeDiv.id = "status-badge";
    statusBadgeDiv.classList.add(readStatus.value.toLowerCase(),"badge");

    const statusText = document.createElement('p');
    statusText.id = "status-text";
    statusText.textContent = readStatus.value === 'read' ? 'read' : 'unread';
    statusBadgeDiv.appendChild(statusText);

    // Status Icons
    const readIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    readIcon.setAttribute("id", "read-icon");
    readIcon.setAttribute("width", "24");
    readIcon.setAttribute("height", "24");
    readIcon.setAttribute("viewBox", "0 0 24 24");
    readIcon.innerHTML = `<path d="M20 6 9 17l-5-5"/>`;

    const unreadIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    unreadIcon.setAttribute("id", "unread-icon");
    unreadIcon.setAttribute("width", "24");
    unreadIcon.setAttribute("height", "24");
    unreadIcon.setAttribute("viewBox", "0 0 24 24");
    unreadIcon.innerHTML = `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`;

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
    deleteButton.addEventListener("click", function() {
        bookDiv.remove();
    });

    bookControlDiv.appendChild(deleteButton);
    bookDiv.appendChild(bookControlDiv);

    // Creating & Appending Book Title 
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add('book-title');
    bookTitle.textContent = `${bookName}`;
    bookDiv.appendChild(bookTitle);

    // Author Name 
    const bookAuthorContainer = document.createElement("div");
    bookAuthorContainer.classList.add('info-container');

    const bookAuthorTitle = document.createElement("p");
    bookAuthorTitle.textContent = "Author: ";

    const bookAuthor = document.createElement("p");
    bookAuthor.id = 'author-name';
    bookAuthor.classList.add('grey');
    bookAuthor.textContent = `${authorName}`;

    bookAuthorContainer.appendChild(bookAuthorTitle, bookAuthor);

    bookDiv.appendChild(bookAuthorContainer);

    // Page Count
    const pageNumberContainer = document.createElement("div");
    pageNumberContainer.classList.add('info-container');

    const pageNumberTitle = document.createElement("p");
    pageNumberTitle.textContent = "Pages: ";

    const pageNumber = document.createElement("p");
    pageNumber.id = 'page-count';
    pageNumber.classList.add('grey');
    pageNumber.textContent = `${pageCount}`;

    pageNumberContainer.appendChild(pageNumberTitle, pageNumber);

    bookDiv.appendChild(pageNumberContainer);

    // Book Description
    const bookDescriptionContainer = document.createElement("div");
    bookDescriptionContainer.classList.add('info-container');

    const bookDescriptionTitle = document.createElement("p");
    bookDescriptionTitle.textContent = "Description: ";

    const bookDescriptionDisplay = document.createElement("p");
    bookDescriptionDisplay.id = 'book-description';
    bookDescriptionDisplay.classList.add('grey');
    bookDescriptionDisplay.textContent = `${bookDescription}`;

    bookDescriptionDisplay.appendChild(bookDescriptionTitle, bookDescriptionDisplay);

    bookDiv.appendChild(bookDescriptionDisplay);

    // Appending newly created element to container 
    document.querySelector(".content-container").appendChild(bookDiv);

    // Clear form inputs
    document.getElementById("createBookForm").reset();

    // Close Modal 

});