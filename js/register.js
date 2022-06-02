/*using windows and load event to get data from a non existing local storage yet
which would return `null` at the first onload and then using
if statement to set a new local storage that would then be destroyed later
after its content had been pushed to users global array.*/ 
window.addEventListener('load', function() {
    let getOnLoad = JSON.parse(localStorage.getItem("regUser"));

    // checking if there is data in the local storage
        if(getOnLoad != null) { 

            // Yes there is data then set the new local storage 
            localStorage.setItem("reLoad", JSON.stringify(getOnLoad));

            // Then get the data back and push it to our users global array
            let checkUser = JSON.parse(localStorage.getItem("reLoad"));

            checkUser.forEach(function(item, index) {
                users.push(item)
            })

            // terminate the localStorage
            localStorage.removeItem("reLoad")

        }
})

// users global array
users = [];

// selecting the form button
const submit = document.getElementById("btn");

// adding an event listener to the form button
submit.addEventListener('click', function(e) {

    // prevent it from clearing the input field
    e.preventDefault();

    // select all the input field
    let name = document.querySelectorAll('input')[0].value.trim();
    let email = document.querySelectorAll('input')[1].value.trim();
    let password = document.querySelectorAll('input')[2].value.trim();


    let errors = [];

    // checking if input is empty
    if(name.length == 0) {
        errors.push("Please Enter Your Name");
    }
    if(email.length == 0) {
        errors.push("Please Enter Your Email");
    }
    if(password.length == 0) {
        errors.push("Please Enter Your Password");
    }

    let show_err = document.querySelector(".show-err");

    // show the errors in a loop
    if(errors.length != 0) {
        for(let i = 0; i < errors.length; i++) {

           show_err.innerHTML =  errors.join("<br>");
        }
    }

    // setting the local storage for users for the first time
    if(errors.length == 0 ) {
        
        let makeUserNull = JSON.parse(localStorage.getItem("regUser"));

        if(makeUserNull == null) {

            let person = {
                'name' : name,
                'email' : email,
                'password' : password
            }

            users.push(person);

            localStorage.setItem("regUser", JSON.stringify(users));

            show_err.innerHTML = "Registered Successfully.";
            document.querySelectorAll('input')[0].value = "";
            document.querySelectorAll('input')[1].value = "";
            document.querySelectorAll('input')[2].value = "";
        } else {

            let success_tracker = [];

            //loop through the array to check for the user's email exit

            for(let i = 0; i < makeUserNull.length; i++){

				if(makeUserNull[i].email == email){
					//the user exists already
					success_tracker.push(makeUserNull[i].email);
					break;
				}
			}

            if(success_tracker.length > 0){
				//the user exists already

                show_err.innerHTML = `User with the ${email} Already Exit.`;
                document.querySelectorAll('input')[0].value = "";
                document.querySelectorAll('input')[1].value = "";
                document.querySelectorAll('input')[2].value = "";

			}else{
				//no user exists..
				
				//register the user
				let person = {
                    'name' : name,
                    'email' : email,
                    'password' : password
                }
    
                users.push(person);
    
                localStorage.setItem("regUser", JSON.stringify(users));
    
                show_err.innerHTML = "Registered Succesfully";
                document.querySelectorAll('input')[0].value = "";
                document.querySelectorAll('input')[1].value = "";
                document.querySelectorAll('input')[2].value = "";

                return true;

			}
            
        }

    }
    


})