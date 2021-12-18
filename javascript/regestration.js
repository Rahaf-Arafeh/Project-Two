const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const usernamePattern = /^[A-Za-z]{3,13}$/;


form.addEventListener('keyup', e => {
    e.preventDefault();
    checkInputs()
});
form.addEventListener('submit', e => {
    e.preventDefault();
    if (checkInputs())
        signUp();
});


function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    const flags = [];
    //
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        flags.push(false);
    } else {
        setSuccessFor(username);
        flags.push(true);
    }
    //
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        flags.push(false);

    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        flags.push(false);

    } else {
        setSuccessFor(email);
        flags.push(true);

    }

    //
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        flags.push(false);

    } else if (passwordValue.length < 6) {

        setErrorFor(password, 'Password cannot be less than 6 characters');
        flags.push(false);

    } else {
        setSuccessFor(password);
        flags.push(true);
    }
    //
    if (password2Value === '') {
        setErrorFor(password2, 'Password cannot be blank');
        flags.push(false);

    } else if (password2Value.length < 6) {

        flags.push(false);
        setErrorFor(password2, 'Password cannot be less than 6 characters');
    } else {
        setSuccessFor(password2);
        flags.push(true);
    }

    if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords do not match');
        flags.push(false);
    }



    console.log(flags);
    // let flag = true;
    // if any flag is false, return false;
    for (let index = 0; index < flags.length; index++) {
        if (flags[index] === false) {
            // flag = false;
            return false;
            // break;
        }
    }
    //if every flag is true return true;
    return true;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const signUp = e => {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const form = document.querySelector('form');

    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];

    let exist = usersData.length &&
        JSON.parse(localStorage.getItem('usersData')).some(data =>
            data.username.toLowerCase() == username.toLowerCase()
        );

    if (!exist) {
        // get length of registered users
        const attempt = false;
        usersData.push({ username, email, password, attempt });
        localStorage.setItem(`usersData`, JSON.stringify(usersData));
        form.reset();
        // username.focus();
        Swal.fire(
            'Good job!',
            'Account Created!',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "sign-in.html";
            }
        })

    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username already registered!'
        })
        e.preventDefault();
    }
}