const profile = document.getElementById('profile');
const registerUser = () => {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const terms = document.getElementById('terms').checked;
  const radioInput = document.querySelector('input[name="radioOption"]:checked');
  const selectedRadioValue = radioInput.value;

  if (!firstName || !lastName || !email || !password || !terms || !selectedRadioValue) {
    alert('Butun inputlari doldurun');
    return;
  }

  const user = { firstName, lastName, email, password, selectedRadioValue };
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Qeydiyyat Ugurludur.');
  window.location.href = 'login.html';
};

const login = () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    alert('Parol ve ya email sehvdir');
    return;
  } else {
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    window.location.href = 'profile.html';
  }
};

window.addEventListener('load', () => {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const splitUrl = window.location.pathname.split('/').filter((row) => row !== '');

  if (splitUrl.indexOf('register.html') === -1 && splitUrl.indexOf('login.html') === -1) {
    if (!users.length) {
      window.location.href = 'register.html';
    }
  }

  if (splitUrl.indexOf('login.html') !== -1) {
    if (!users.length) {
      window.location.href = 'register.html';
    }
  }

  if (splitUrl.indexOf('profile.html') !== -1) {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
  

    if (firstName && lastName) {
      show_u_username.innerText=localStorage.getItem('firstName')+' '+localStorage.getItem('lastName');

      logout_btn.addEventListener('click', () => {
        if (confirm('Cixis etmeye eminsinizmi?')) {
          localStorage.clear();
          window.location.href = 'login.html';
        }
      });
    } else {
      window.location.href = 'login.html';
    }
  }
});