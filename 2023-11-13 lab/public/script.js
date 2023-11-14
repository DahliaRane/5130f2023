document.addEventListener('DOMContentLoaded', () => {
  const signupContainer = document.getElementById('signupContainer');
  const signinContainer = document.getElementById('signinContainer');
  const signupLink = document.getElementById('signupLink');
  const signinLink = document.getElementById('signinLink');
  const signupForm = document.getElementById('signupForm');
  const signinForm = document.getElementById('signinForm');
  const passwordInput = document.getElementById('password');
  const passwordConstraints = document.getElementById('passwordConstraints');

  const guestLoginButton = document.getElementById('guestLoginButton');

  const database = firebase.database();

  signupLink.addEventListener('click', (event) => {
    event.preventDefault();
    signupContainer.style.display = 'block';
    signinContainer.style.display = 'none';
  });

  signinLink.addEventListener('click', (event) => {
    event.preventDefault();
    signinContainer.style.display = 'block';
    signupContainer.style.display = 'none';
  });

  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    updatePasswordConstraints(password);
  });

  function updatePasswordConstraints(password) {
    const constraints = [
      { message: 'Contains at least one symbol', regex: /[$@$!%*?&#]/ },
      { message: 'Contains at least one number', regex: /[0-9]/ },
      { message: 'Contains at least one uppercase letter', regex: /[A-Z]/ },
      { message: 'Contains at least one lowercase letter', regex: /[a-z]/ },
      { message: 'Is at least 8 characters long', regex: /^.{8,}$/ },
    ];

    passwordConstraints.innerHTML = ''; // Clear previous messages

    constraints.forEach(({ message, regex }) => {
      const isConstraintMet = regex.test(password);
      displayConstraintStatus(message, isConstraintMet);
    });
  }

  function displayConstraintStatus(message, isConstraintMet) {
    const constraintElement = document.createElement('div');
    constraintElement.textContent = `${message}: ${isConstraintMet ? 'Met' : 'Not Met'}`;
    constraintElement.className = isConstraintMet ? 'constraint-met' : 'constraint-not-met';

    passwordConstraints.appendChild(constraintElement);
  }
 
  guestLoginButton.addEventListener('click', async () => {
    try {
      // Sign in anonymously
      
      alert('Guest login successful');
      window.location.href = `/dashboard?email=${encodeURIComponent('Guest')}`; // Redirect to the dashboard
    } catch (error) {
      console.error('Error during guest login:', error);
      alert('An error occurred during guest login. Please try again.');
    }
  });

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // Generate a verification token
    const token = Math.random().toString(36).substr(2, 6);
  
    try {
      // Store user details in Firebase Realtime Database
      const userRef = database.ref('users').push();
      userRef.set({
        email: email,
        password: password,
        token: token,
        verified: false,
      });
  
      // Send email verification request to the server
      await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token }),
      });
  
      alert('Check your email for verification');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error during signup. Please try again.');
    }
  });
  
  
  
 

  signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
  
    try {
      // Check user details in Firebase Realtime Database
      const userSnapshot = await database.ref('users').orderByChild('email').equalTo(email).once('value');
      const users = userSnapshot.val();
      console.log(users);
      if (users) {
        // User with the provided email exists in the database
        const userId = Object.keys(users)[0]; // Assuming there's only one user with the given email
        const user = users[userId];
  
        // Check if the password matches (for simplicity, you should use a more secure method)
        if (user.password === password) {
          // Password matches, consider the user as signed in
          alert('Sign in successful');
          window.location.href = `/dashboard?email=${encodeURIComponent(user.email)}`; // Change '/dashboard.html' to the actual filename and path
        } else {
          // Password does not match
          alert('Invalid password');
        }
      } else {
        // User does not exist in the database
        alert('User not found');
      }
    } catch (error) {
      console.error('Error during signin:', error);
      alert('An error occurred during signin. Please try again.');
    }
});

  


});
// Guest login functionality

