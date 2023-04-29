// Generate a random access token
function generateToken() {
  let token = new Uint8Array(16);
  crypto.getRandomValues(token);
  return Array.from(token, decimal => decimal.toString(16).padStart(2, '0')).join('');
}

// Save user state object to local storage
function saveUserState(state) {
  localStorage.setItem('userState', JSON.stringify(state));
}

// Get user state object from local storage
function getUserState() {
  let state = localStorage.getItem('userState');
  return state ? JSON.parse(state) : null;
}

// Redirect user to signup page if not logged in
function requireLogin() {
  let userState = getUserState();
  if (!userState || !userState.accessToken) {
    window.location.replace('/signup.html');
  }
}

// Redirect user to profile page if logged in
function requireLogout() {
  let userState = getUserState();
  if (userState && userState.accessToken) {
    window.location.replace('/profile.html');
  }
}

// Clear user state and local storage on logout
function logout() {
  localStorage.removeItem('userState');
}

// Handle form submission for sign up
function signUp() {
  event.preventDefault();
  let form = document.getElementById('signup-form');
  let name = form.name.value;
  let email = form.email.value;
  let password = form.password.value;
  
  // Check for missing fields
  if (!name || !email || !password) {
    let error = document.getElementById('signup-error');
    error.textContent = 'Please fill out all fields';
    error.style.color = 'red';
    return;
  }
  
  // Create user state object and save to local storage
  let accessToken = generateToken();
  let userState = { name, email, password, accessToken };
  saveUserState(userState);
  
  // Display success message and redirect to profile page
  let success = document.getElementById('signup-success');
  success.textContent = 'Sign up successful!';
  success.style.color = 'green';
  setTimeout(() => {
    window.location.replace('/profile.html');
  }, 2000);
}

// Handle form submission for sign in
function signIn() {
  event.preventDefault();
  let form = document.getElementById('signin-form');
  let email = form.email.value;
  let password = form.password.value;
  
  // Check for missing fields
  if (!email || !password) {
    let error = document.getElementById('signin-error');
    error.textContent = 'Please fill out all fields';
    error.style.color = 'red';
    return;
  }
  
  // Check if email and password match stored user state object
  let userState = getUserState();
  if (userState && userState.email === email && userState.password === password) {
    // Display success message and redirect to profile page
    let success = document.getElementById('signin-success');
    success.textContent = 'Sign in successful!';
    success.style.color = 'green';
    setTimeout(() => {
      window.location.replace('/profile.html');
    }, 2000);
  } else {
    // Display error message for incorrect email or password
    let error = document.getElementById('signin-error');
    error.textContent = 'Incorrect email or password';
    error.style.color = 'red';
  }
}

// Add event listeners for form submission
document.getElementById('signup-form').addEventListener('submit', signUp);
document.getElementById('signin-form').addEventListener('submit', signIn);

// Add event listener for logout button
document.getElementById('logout-button').addEventListener('click', () => {
  logout();
  window.location.replace('/signup.html');
});

// Check if user is logged in on page load
window.onload = function() {
      // Check if access token exists in local storage
      if (localStorage.getItem('access_token')) {
        // Redirect to profile page
        window.location.replace('/profile');
      } else {
        // Redirect to signup page
        window.location.replace('/signup');
      }
    }  

    // Generate a random 16-byte access token using Math.random()
function generateAccessToken() {
  let token = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 16; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

// Add event listener to sign up form
const signUpForm = document.getElementById("signup-form");
signUpForm.addEventListener("submit", signUpHandler);

// Handle sign up form submission
function signUpHandler(event) {
  event.preventDefault();

  // Get form input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if all fields are filled out
  if (name === "" || email === "" || password === "") {
    const errorText = document.getElementById("error-text");
    errorText.innerText = "Please fill out all fields.";
    errorText.style.color = "red";
    return;
  }

  // Generate access token
  const accessToken = generateAccessToken();

  // Create user state object
  const user = {
    name,
    email,
    password,
    accessToken,
  };

  // Save user state object to localStorage
  localStorage.setItem("user", JSON.stringify(user));

  // Show success message
  const successText = document.getElementById("success-text");
  successText.innerText = "Sign up successful!";
  successText.style.color = "green";

  // Redirect to profile page
  window.location.replace("/profile");
}

// Add event listener to logout button
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", logoutHandler);

// Handle logout button click
function logoutHandler() {
  // Remove user state object from localStorage
  localStorage.removeItem("user");

  // Redirect to sign up page
  window.location.replace("/signup");
}

// Add script to profile and signup pages to check for access token
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

if (!user) {
  window.location.replace("/signup");
} else {
  // Display user details on profile page
  const nameText = document.getElementById("name-text");
  nameText.innerText = user.name;

  const emailText = document.getElementById("email-text");
  emailText.innerText = user.email;

  const passwordText = document.getElementById("password-text");
  passwordText.innerText = user.password;
}
