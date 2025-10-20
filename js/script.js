// ==============================
// 🧭 HEADER-SIDEBAR FUNCTIONALITY
// ==============================
const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const icons = document.querySelectorAll(".icon-group a");
const iframe = document.getElementById("contentFrame");

if (profileBtn && dropdownMenu) {
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
    profileBtn.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
  if (
    !profileBtn.contains(e.target) &&
    !dropdownMenu.contains(e.target)
  ) {
    dropdownMenu.classList.remove("show");
    profileBtn.classList.remove("active");
  }
});

  dropdownMenu.addEventListener("mouseenter", () => {
    profileBtn.classList.add("active");
  });
  dropdownMenu.addEventListener("mouseleave", () => {
    profileBtn.classList.remove("active");
  });
}

// Load HTML in iframe when clicking icons or dropdown buttons
if (icons && iframe) {
  icons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const src = icon.getAttribute("data-src");
      if (src) iframe.src = src;
    });
  });
}

if (dropdownMenu) {
  dropdownMenu.querySelectorAll("button[data-src]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // ✅ Prevents reopening dropdown
      console.log("⚙️ Dropdown item clicked:", btn.textContent.trim());

      const src = btn.getAttribute("data-src");
      if (src) {
        iframe.src = src; // Load settings page into iframe
        console.log("🪟 Iframe loading:", src);
      }

      // ✅ Immediately close the dropdown
      dropdownMenu.classList.remove("show");
      profileBtn.classList.remove("active");
    });
  });
}


// ==============================
// 🚪 LOGOUT
// ==============================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}

//===========================
// SETTINGS SECTION
//===========================


