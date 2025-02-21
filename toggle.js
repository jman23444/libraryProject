//  Toggle Functionality

document.addEventListener("DOMContentLoaded", function () {
    // 
    const statusBadge = document.getElementById("status-badge");
    const statusText = document.getElementById("status-text");
    const readIcon = document.getElementById("read-icon");
    const unreadIcon = document.getElementById("unread-icon");
    // 
    if (statusBadge.classList.contains("read")) {
        readIcon.style.display = "block";
        unreadIcon.style.display = "none";
    } else {
        readIcon.style.display = "none";
        unreadIcon.style.display = "block";
    }

    // Toggle function
    statusBadge.addEventListener("click", function () {
        if (statusBadge.classList.contains("read")) {
            statusBadge.classList.remove("read");
            statusBadge.classList.add("unread");
            statusText.textContent = "Unread";
            readIcon.style.display = "none";
            unreadIcon.style.display = "block";
        } else {
            statusBadge.classList.remove("unread");
            statusBadge.classList.add("read");
            statusText.textContent = "Read";
            readIcon.style.display = "block";
            unreadIcon.style.display = "none";
        }
    });
});