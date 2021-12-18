loggedUser = JSON.parse(localStorage.getItem(`logged`));
logoutButton = document.querySelector(`#logoutButton`);


function oneTimeAttemptCheck() {
  const allUsers = JSON.parse(localStorage.getItem('usersData'));
  const allUsersToPushAgain = [];
  console.log("all", allUsers);
  allUsers.forEach((element, index) => {
    if (element.username === loggedUser)
      if (element.attempt === true) {
        // console.log("TRUUUUE");
        Swal.fire({
          title: 'You already attempted the quiz!',
          text: "Attempts left: 0",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#1877F2',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Logout',
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            logout()
          }
        })
      }
      else {
        // console.log("FAALSEE");

        element.attempt = true;
        window.location.href = "../html/quiz.html";
      }
    allUsersToPushAgain.push(element);
  });
  localStorage.removeItem("usersData");
  localStorage.setItem("usersData", JSON.stringify(allUsersToPushAgain));
}