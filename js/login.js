const form = document.getElementById("login-form");

document.getElementById('login-btn').addEventListener("click", async (e) => {
    e.preventDefault();

    //get the username and password input
    const usernameUI = document.getElementById("email-username").value;
    const passwordUI = document.getElementById("password").value
    
    // remove any message element
    removeMessage();
    
    // if any field is empty stop
    if (!usernameUI || !passwordUI) {
        // show message saying you should enter a value
        showMessage("error", "Please, enter your username and password.");
        
        return
    };

    // show preloader
    document.querySelector(".preloader").style.display = "inline";

    // get the list of registered users
    const users = await getUsers();
    let isValid = false; 

    // check if the username and password matches any of the inputted one
    users.forEach(user => {
        if((user.username.toLowerCase() === usernameUI.toLowerCase() && user.password === passwordUI) ||user.email.toLowerCase() === usernameUI.toLowerCase() && user.password === passwordUI){
            // login
            isValid = true;
        }
    })

    // remove the preloader and act after 2 seconds
    setTimeout(() => {
        // remove preloader
        document.querySelector(".preloader").style.display = "none";

        if(isValid){
            // login
            // !form.dispatchEvent(evt);
            form.submit();
            console.log("Successful login");
            return
        }else {
            // show error message
            showMessage("error", "Invalid username/email or password.");

            console.log("no match found");
        }
    },2000)
    // console.log(users, usernameUI, passwordUI);
});

// get users   
const getUsers = () => {
    // create a list that will save the users
    let users= [];

    // fetch the date from the json file
    return fetch("../data/users.json")
    
        // get response
        .then(res => res.json())
        
        // with the response, add emails to the list
        .then(users => {
            users.forEach((user) => {
                users.push(user);
            })
            return users;
        })
        // catch any error and console it
        .catch(err => console.log(err));
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
    setTimeout(removeMessage, 3000)
}

const removeMessage = () => {
    // get any tag with class of message alert and remove it
    const message = document.querySelector(".message-alert");
    if (message){
        message.remove();
    }
}