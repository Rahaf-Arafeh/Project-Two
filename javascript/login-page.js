// signIn signUp username in cookie (for navbar)


function signIn(e) {
  e.preventDefault();
  let username = document.getElementById('username').value, password = document.getElementById('password').value;
  let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
  let exist = usersData.length &&
    JSON.parse(localStorage.getItem(`usersData`)).some(data => data.username.toLowerCase() == username.toLowerCase() && data.password == password);
  console.log(exist);

  if (!exist) {
    e.preventDefault();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Incorrect credintials!'
    })
    localStorage.setItem('logged', `${JSON.stringify(null)}`);
  }
  else {

    // document.cookie = `${username}; expires=Thu, 18 Dec 2099 12:00:00 UTC`;
    localStorage.setItem('logged', `${JSON.stringify(username.toLowerCase())}`);
    window.location.href = "../html/quiz-rules.html";
    // window.open("../html/quiz-rules.html");
  }
}

