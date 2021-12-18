let loggedUser = JSON.parse(localStorage.getItem(`logged`));
let logoutButton = document.querySelector(`#logoutButton`);
let usernameToShow = '';
function logout() {
    sessionStorage.clear();
    localStorage.removeItem('logged');
    localStorage.setItem('logged', `${JSON.stringify(null)}`);

    for (let localItem in localStorage) {
        let flag = localItem.slice(0, 9);
        if (flag !== `usersData`) {
            localStorage.removeItem(`${localItem}`);
        }
    }
    // window.close();
    window.open('../html/index.html');
    // window.location.href = "../html/sign-in.html";

}
function goToLogin() {
    // window.close();
    // window.open("../html/sign-in.html");
    window.location.href = "../html/sign-in.html";
}
function goToRegisteration() {
    // window.open("../html/registration.html");
    window.location.href = "../html/registration.html";

}
function showLoggedUsername() {
    if (checkIfLogged()) {
        const welcomingTag = document.querySelector(".logged-username-container");
        usernameToShow = loggedUser.slice(0, 1).toUpperCase();
        usernameToShow = usernameToShow.concat('', loggedUser.slice(1).toLowerCase())
        welcomingTag.innerHTML = `Welcome ${usernameToShow}`;
    }
}
function checkIfLogged() {
    const body = document.querySelector("body");

    if (loggedUser === null) {
        logoutButton.innerHTML = "Login";
        Swal.fire({
            title: 'You are not logged in!',
            text: "Please Login to take the exam!",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Go to login page',
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                goToLogin();
                checkIfLogged();
            }
        })
    }
    else {
        // console.log("welcome");
        return true;
    }
}
