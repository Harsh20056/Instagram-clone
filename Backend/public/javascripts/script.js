function validateForm() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorDiv = document.getElementById("errorMessage");

  // Reset state
  errorDiv.classList.add("hidden");
  errorDiv.innerText = "";
  if (password !== confirmPassword) {
    errorDiv.innerText = "Passwords do not match!";
    errorDiv.classList.remove("hidden");
    return false;
  }
  if (password.length < 6) {
    errorDiv.innerText = "Password must be at least 6 characters long.";
    errorDiv.classList.remove("hidden");
    return false;
  }

  return true;
}
