document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Send registration data to the server
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Registration successful!');
      window.location.href = 'login.html';
    } else {
      alert('Registration failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Registration failed: ' + error.message);
  });
});
