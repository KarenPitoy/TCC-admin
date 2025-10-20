// ==============================
// 🔗 Initialize Supabase connection
// ==============================
const SUPABASE_URL = "https://zovmjxdfmzhxetopmpyp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvdm1qeGRmbXpoeGV0b3BtcHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDI3NzcsImV4cCI6MjA3NTU3ODc3N30.SNyLbhhUi6HRmTW4ThoJBYImdwcKuSykcgRzHg0TYxM";

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  // ---------- Utility functions ----------
  function showInlineMessage(message, type = "error") {
    let existingMsg = document.querySelector(".inline-message");
    if (existingMsg) existingMsg.remove();

    const msg = document.createElement("div");
    msg.className = `inline-message ${type}`;
    msg.textContent = message;

    passwordInput.insertAdjacentElement("afterend", msg);

    setTimeout(() => msg.classList.add("show"), 100);
    setTimeout(() => {
      msg.classList.remove("show");
      setTimeout(() => msg.remove(), 300);
    }, 3000);
  }

  function highlightField(field, state) {
    field.classList.remove("error", "success");
    void field.offsetWidth;
    if (state === "error") field.classList.add("error");
    else if (state === "success") field.classList.add("success");
  }

  function toggleLoading(show) {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = show ? "flex" : "none";
  }

  // ---------- Login Form ----------
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        if (!email) highlightField(emailInput, "error");
        if (!password) highlightField(passwordInput, "error");
        showInlineMessage("Please enter your email and password.");
        return;
      }

      toggleLoading(true);

      try {
        // Fetch user by email
        const { data: userData, error } = await supabaseClient
          .from("admin")
          .select("*")
          .eq("email", email) // ensure this matches your column name
          .maybeSingle();

        if (error) throw error;

        if (!userData) {
          toggleLoading(false);
          highlightField(emailInput, "error");
          highlightField(passwordInput, "error");
          showInlineMessage("Invalid email or password.");
          return;
        }

        if (userData.password !== password) {
          toggleLoading(false);
          highlightField(passwordInput, "error");
          showInlineMessage("Incorrect password.");
          return;
        }

        highlightField(emailInput, "success");
        highlightField(passwordInput, "success");
        showInlineMessage("Login successful!", "success");

        // Store user data safely (no password)
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData.id,
            email: userData.email,
            name: userData.name,
          })
        );

        setTimeout(() => {
          toggleLoading(false);
          window.location.href = "header-sidebar.html";
        }, 800);
      } catch (err) {
        toggleLoading(false);
        console.error("Login error:", err);
        showInlineMessage("An unexpected error occurred.");
      }
    });
  }

  // ---------- Auto-fill / session check ----------
  (async () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // If no user, redirect to login page (unless already there)
    if (!user && currentPage !== "index.html") {
      window.location.href = "index.html";
      return;
    }

    if (!user) return; // no user, on login page, do nothing

    try {
      const { data, error } = await supabaseClient
        .from("admin")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (error || !data) {
        console.error("User not found or error fetching data:", error);
        localStorage.removeItem("user");
        window.location.href = "index.html";
        return;
      }

      // Fill dashboard or profile fields if present
      const userName = document.getElementById("userName");
      const userEmail = document.getElementById("userEmail");
      const userId = document.getElementById("userId");

      if (userName) {
        if (["INPUT", "TEXTAREA"].includes(userName.tagName)) userName.value = data.name || "Admin User";
        else userName.textContent = data.name || "Admin User";
      }
      if (userEmail) {
        if (["INPUT", "TEXTAREA"].includes(userEmail.tagName)) userEmail.value = data.email;
        else userEmail.textContent = data.email;
      }
      if (userId) userId.textContent = "ID: " + data.id;

      // Header/sidebar elements
      const userInfoName = document.getElementById("userInfoName");
      const userInfoEmail = document.getElementById("userInfoEmail");

      if (userInfoName) userInfoName.textContent = data.name || "Admin User";
      if (userInfoEmail) userInfoEmail.textContent = data.email;

      console.log("✅ User data loaded successfully:", data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      localStorage.removeItem("user");
      window.location.href = "index.html";
    }
  })();
});
