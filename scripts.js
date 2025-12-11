// Handle user registration
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
