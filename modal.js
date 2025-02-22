
document.addEventListener("DOMContentLoaded", function () {
    //
    const inputs = document.querySelectorAll("input, textarea");
    //
    const modalContainer = document.querySelector('.modal-container');
    const closeModal = document.querySelector('.close-modal');
    const createBook = document.querySelector('#create-book');

    // Invalid / Valid class toggle functionality
    inputs.forEach((input) => {
        input.addEventListener("input", function () {
            if (this.checkValidity()) {
                this.classList.remove("invalid");
                this.classList.add("valid");
            } else {
                this.classList.remove("valid");
                this.classList.add("invalid");
            }
        });
    });

    // Default Modal Setting
    if (modalContainer.classList.contains('show')) {
        modalContainer.classList.remove('show');
    }

    // open modal functionality 
    createBook.addEventListener('click', () => {
        modalContainer.classList.add('show');
    });

    // close modal functionality
    closeModal.addEventListener('click', () => {
        modalContainer.classList.remove('show');
    });

});

