//  Toggle Functionality

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        const statusBadge = event.target.closest("#status-badge");
        if (statusBadge) {
            const statusText = statusBadge.querySelector("#status-text");
            const readIcon = statusBadge.querySelector("#read-icon");
            const unreadIcon = statusBadge.querySelector("#unread-icon");

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
        }
    });
});