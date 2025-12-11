// Display all public files
document.addEventListener("DOMContentLoaded", async () => {
    const publicList = document.getElementById("publicList");

    if (publicList) {
        const response = await fetch("http://localhost:5000/api/public-files");
        const files = await response.json();

        if (files.length === 0) {
            publicList.innerHTML = "<p>No public files available.</p>";
            return;
        }

        files.forEach(file => {
            const fileDiv = document.createElement("div");
            fileDiv.classList.add("file-item");

            const downloadUrl = "http://localhost:5000/" + file.path.replace("\\", "/");

            fileDiv.innerHTML = `
                <p><strong>Filename:</strong> ${file.filename}</p>
                <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <a href="${downloadUrl}" download>
                    <button>Download</button>
                </a>
                <hr>
            `;

            publicList.appendChild(fileDiv);
        });
    }
});
