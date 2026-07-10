document.addEventListener("DOMContentLoaded", function () {
  let selectedRole = "Student";

  const hints = {
    Student: "Demo: student@gmail.com / 123",
    Teacher: "Demo: teacher@gmail.com / 123",
    Admin: "Demo: admin@gmail.com / 123"
  };

  const credentials = {
    Student:  { email: "student@gmail.com",  password: "123", redirect: "/Student-page/Dashboard/student.html" },
    Teacher:  { email: "teacher@gmail.com",  password: "123", redirect: "/Teacher Dashboard/teacher-dashboard.html" },
    Admin:    { email: "admin@gmail.com",     password: "123", redirect: "/Admin Page/Dashboard.html" }
  };

  // Role tab switching
  document.querySelectorAll(".role-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".role-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedRole = btn.dataset.role;
      document.getElementById("hintText").textContent = hints[selectedRole];
      hideError();
    });
  });

  // Toggle password visibility
  document.getElementById("togglePw").addEventListener("click", function () {
    const pw = document.getElementById("password");
    pw.type = pw.type === "password" ? "text" : "password";
  });

  // Form submit
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    hideError();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const creds = credentials[selectedRole];

    // Show spinner
    document.getElementById("btnText").style.opacity = "0";
    document.getElementById("btnSpinner").style.display = "block";

    setTimeout(() => {
      if (email === creds.email && password === creds.password) {
        // Save role to sessionStorage
        sessionStorage.setItem("userRole", selectedRole);
        sessionStorage.setItem("userEmail", email);
        window.location.href = creds.redirect;
      } else {
        document.getElementById("btnText").style.opacity = "1";
        document.getElementById("btnSpinner").style.display = "none";
        showError("Invalid " + selectedRole + " credentials. Please try again.");
      }
    }, 900);
  });

  function showError(msg) {
    const err = document.getElementById("errorMsg");
    document.getElementById("errorText").textContent = msg;
    err.style.display = "flex";
  }
  function hideError() {
    document.getElementById("errorMsg").style.display = "none";
  }
});