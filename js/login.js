// get the username, password and form
const usernameUI = document.getElementById("email-username"),
      passwordUI = document.getElementById("password"),
      formUI = document.getElementById("login-form")


const handleSubmit = async (e) => {
    // stop submit process and check credentials
    e.preventDefault();

    // remove any message element
    removeMessage();

    // show preloader
    document.querySelector(".preloader").style.display = "inline";

    // get the user credentials from the DB
    const userList = await getUserList();
    const users = await userList[0];
    const emails = await userList[1];
    const  usernames = await userList[2];

    // get the username and password input
    const usernameVal = usernameUI.value;
    const passwordVal = passwordUI.value;

    // console.log(usernameVal, passwordVal)
    // define booleans for login and valid usernames
    let isValidUser = false, passedUser;  
    
    // loop through the users and check for the emails and username to get a match
    users.forEach(user => {
        if((user.email.toLowerCase() === usernameVal.toLowerCase()) || (user.username.toLowerCase() === usernameVal.toLowerCase())){
            isValidUser = true;  
            passedUser = user;
        }
    })

    // remove preloader
    document.querySelector(".preloader").style.display = "none";

    // if user is valid check the password
    if (isValidUser) {
        //check through the list of users and see the password that matches with the username passed
        // first filter the array to return just the user with the passed username

        // get the password and compare it with the password input
        if (passedUser.password === passwordVal) {
            // the user can login
            formUI.submit();

            console.log("Loging in...")
        }else {
            // throw password error message
            showMessage("error", "Password doesn't match the username, check the password and try again.")
            console.log("incorrect password, can't login");
        }
        console.log(passedUser);
        
    }else{
        // throw username error
        showMessage("error", "Invalid username, check the username and try again.")
        console.log("Username is wrong!")
    } 

    // clear password field
    passwordUI.value = "";
}

// show message
const showMessage = (status, messageText) => {
    // create an element for the error
    const message = document.createElement("p");

    // add class od status to it
    message.className = `message-alert ${status}`;

    // add text content
    message.textContent = messageText;

    // get the parent and append it to it
    const parent = document.querySelector(".message");

    parent.appendChild(message);

    // remove it after 3 secs
    setTimeout(removeMessage, 3500)
}

const removeMessage = () => {
    // get any element with class of message alert and remove it
    const message = document.querySelector(".message-alert");
    if (message){
        message.remove();
    }
}

formUI.addEventListener("submit", handleSubmit);


