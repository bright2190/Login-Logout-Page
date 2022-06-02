
// once the window load display the user's information 
window.addEventListener('load', function() {

    let span1 = document.getElementById("name");

    let span2 = document.getElementById("email")

    const userBio = JSON.parse(localStorage.getItem("userBio"));

    const name = userBio.name;
    const email = userBio.email;

    span1.innerHTML = name;
    span2.innerHTML = email;
})


let btn = document.getElementById('btn');

// once the log out button is clicked terminate the user's information
// head to login.html
btn.addEventListener('click', function() {

    localStorage.removeItem("userBio");

    window.location.href = "login.html";
})