// Handle user login
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
                // Store JWT Token
                localStorage.setItem("token", result.token);

                // Redirect after successful login
                setTimeout(() => {
                    window.location.href = "upload.html";
                }, 1000);
            }
        });
    }
});
