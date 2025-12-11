// Display logged-in user's uploaded files
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
            fileList.innerHTML = "<p>You have not uploaded any files yet.</p>";
            return;
        }

        files.forEach(file => {
            const fileDiv = document.createElement("div");
            fileDiv.classList.add("file-item");

            fileDiv.innerHTML = `
                <p><strong>Filename:</strong> ${file.filename}</p>
                <p><strong>Privacy:</strong> ${file.privacy}</p>
                <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button class="deleteBtn" data-id="${file._id}">Delete</button>
                <hr>
            `;

            fileList.appendChild(fileDiv);
        });

        // Add delete functionality to each button
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
