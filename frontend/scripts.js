// Registration
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.json();
            const msg = document.getElementById("message");
            msg.textContent = result.message;

            if (response.status === 201) {
                setTimeout(() => window.location.href = "login.html", 1500);
            }
        });
    }
});


// Login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            const msg = document.getElementById("message");
            msg.textContent = result.message;

            if (response.status === 200) {
                localStorage.setItem("token", result.token);
                setTimeout(() => {
                    window.location.href = "upload.html";
                }, 1000);
            }
        });
    }
});


// File Upload
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

            const file = document.getElementById("fileInput").files[0];
            const privacy = document.getElementById("privacy").value;

            const formData = new FormData();
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


// My Files (user's own uploads)
document.addEventListener("DOMContentLoaded", async () => {
    const fileList = document.getElementById("fileList");

    if (fileList) {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "login.html";
            return;
        }

        const response = await fetch("http://localhost:5000/api/my-files", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const files = await response.json();

        if (files.length === 0) {
            fileList.innerHTML = "You have not uploaded any files yet.";
            return;
        }

        files.forEach(file => {
            const div = document.createElement("div");
            div.classList.add("file-item");

            div.innerHTML = `
                <p>Filename: ${file.filename}</p>
                <p>Privacy: ${file.privacy}</p>
                <p>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button class="deleteBtn" data-id="${file._id}">Delete</button>
                <hr>
            `;

            fileList.appendChild(div);
        });

        document.querySelectorAll(".deleteBtn").forEach(button => {
            button.addEventListener("click", async () => {
                const id = button.dataset.id;

                const deleteResponse = await fetch("http://localhost:5000/api/files/" + id, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                const result = await deleteResponse.json();
                alert(result.message);
                location.reload();
            });
        });
    }
});


// Public Downloads Page
document.addEventListener("DOMContentLoaded", async () => {
    const publicList = document.getElementById("publicList");

    if (publicList) {
        const response = await fetch("http://localhost:5000/api/public-files");
        const files = await response.json();

        if (files.length === 0) {
            publicList.innerHTML = "No public files available.";
            return;
        }

        files.forEach(file => {
            const div = document.createElement("div");
            div.classList.add("file-item");

            const downloadUrl = "http://localhost:5000/" + file.path.replace("\\", "/");

            div.innerHTML = `
                <p>Filename: ${file.filename}</p>
                <p>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <a href="${downloadUrl}" download>
                    <button>Download</button>
                </a>
                <hr>
            `;

            publicList.appendChild(div);
        });
    }
});
