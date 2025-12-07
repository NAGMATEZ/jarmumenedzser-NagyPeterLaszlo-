// js/auth.js
// ---------------------------------------------------------
// Firebase Auth + Invisible reCAPTCHA v2 integration
// Compatible with Firebase v9 modular SDK
// ---------------------------------------------------------

// 🔧 IMPORTANT: Replace with your real Firebase config
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Also replace the site key in your HTML where grecaptcha.render() is called.
export const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY";

// ---------------------------------------------------------
// Firebase imports
// ---------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Init Firebase
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);

// ---------------------------------------------------------
// UI helper for messages
// ---------------------------------------------------------
function showMessage(el, text, isError = false) {
  el.textContent = text;
  el.style.color = isError ? "#c0392b" : "#0b8457";
  el.style.display = "block";
}

// ---------------------------------------------------------
// Register flow
// ---------------------------------------------------------
export async function handleRegister(formEl, emailEl, passEl, submitBtn, msgEl, recaptchaWidgetId) {
  msgEl.style.display = "none";
  submitBtn.disabled = true;

  try {
    // Run invisible reCAPTCHA
    const token = await grecaptcha.execute(recaptchaWidgetId);
    if (!token) throw new Error("Sikertelen reCAPTCHA érvényesítés");

    const email = emailEl.value.trim();
    const password = passEl.value;

    // Create Firebase user
    await createUserWithEmailAndPassword(auth, email, password);

    // Success
    showMessage(msgEl, "Sikeres regisztráció — átirányítás...");

    localStorage.setItem("recaptcha_token", token);

    setTimeout(() => window.location.href = "/dashboard.html", 900);

  } catch (err) {
    showMessage(msgEl, err.message || "Hiba történt a regisztrációnál", true);
  } finally {
    submitBtn.disabled = false;
  }
}

// ---------------------------------------------------------
// Login flow
// ---------------------------------------------------------
export async function handleLogin(formEl, emailEl, passEl, submitBtn, msgEl, recaptchaWidgetId) {
  msgEl.style.display = "none";
  submitBtn.disabled = true;

  try {
    const token = await grecaptcha.execute(recaptchaWidgetId);
    if (!token) throw new Error("Sikertelen reCAPTCHA érvényesítés");

    const email = emailEl.value.trim();
    const password = passEl.value;

    await signInWithEmailAndPassword(auth, email, password);

    showMessage(msgEl, "Sikeres bejelentkezés — átirányítás...");

    localStorage.setItem("recaptcha_token", token);

    setTimeout(() => window.location.href = "/dashboard.html", 900);

  } catch (err) {
    showMessage(msgEl, err.message || "Hiba történt a bejelentkezésnél", true);
  } finally {
    submitBtn.disabled = false;
  }
}

// ---------------------------------------------------------
// Watch auth state (Redirect if logged in)
// ---------------------------------------------------------
export function watchAuthRedirect(redirectIfLoggedIn = "/dashboard.html") {
  onAuthStateChanged(auth, user => {
    if (user) {
      window.location.href = redirectIfLoggedIn;
    }
  });
}
