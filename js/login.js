//select the login button

const btn = document.getElementById("btn");

let show_err = document.querySelector(".show-err");

btn.addEventListener('click', function(e) {
    e.preventDefault();

    let email = document.querySelectorAll('input')[0].value.trim();
    let password  = document.querySelectorAll('input')[1].value.trim();

    let checkUser = JSON.parse(localStorage.getItem("regUser"));

    let success_tracker = [];

    if(checkUser == null) {
        // do something
        show_err.innerHTML = `<div class='alert bg-warning'>You don't have an account. Please Sign Up.
        <button class='close' data-dismiss='alert'>&times;</button></div>
        `;
    } else {
        //loop through the array to check if the user's email exist
        for(let i = 0; i < checkUser.length; i++){

            if(checkUser[i].email == email && checkUser[i].password == password){
                //the user exists already
                success_tracker.push(checkUser[i].name, email, password);
                break;
            }
        }

        if(success_tracker.length > 0){
            //the user exists already

            let userDetail = {
            'name' : success_tracker[0],
            'email' : success_tracker[1]
            }

            localStorage.setItem("userBio", JSON.stringify(userDetail));

            window.location.href = "user.html";

        }else{
            //no user exists..
            
            //register the user

            show_err.innerHTML = `<div class='alert bg-warning'>You don't have an account. Please Sign Up.
            <button class='close' data-dismiss='alert'>&times;</button></div>
            `;
            document.querySelectorAll('input')[0].value = "";
            document.querySelectorAll('input')[1].value = "";
        }
    }
})