// Handle file upload
document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("uploadForm");

    if (uploadForm) {
        uploadForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const token = localStorage.getItem("token");

            if (!token) {
                alert("You must be logged in to upload files.");
                window.location.href = "login.html";
                return;
            }

            const formData = new FormData();
            const file = document.getElementById("fileInput").files[0];
            const privacy = document.getElementById("privacy").value;

            formData.append("file", file);
            formData.append("privacy", privacy);

            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: formData
            });

            const result = await response.json();
            const msg = document.getElementById("message");
            msg.textContent = result.message;

            if (response.status === 201) {
                setTimeout(() => {
                    window.location.href = "myfiles.html";
                }, 1500);
            }
        });
    }
});
