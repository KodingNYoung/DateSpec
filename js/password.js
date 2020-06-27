// get the btn
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click",async (e) => {
    e.preventDefault();

    // remove any message
    removeMessage();

    // get the value of the user input
    const emailUI = document.getElementById("email").value;

    // check if its empty
    if (!emailUI) return;

    // get the list of user emails
    const userEmails = await getUsers();

    //check if the email is registered
    if (userEmails.includes(emailUI)){
        // if it's found
        // remove the input
        document.getElementById("email").value = "";
    
        // sibling of message
        const sibling = document.getElementById("form-group");

         // show the confirmation message
         showMessage(sibling, "success", `A message has been sent to ${emailUI} with instructions to reset your password!`);
        console.log(emailUI , " found!");    
    }else{
        // sibling of message
        const sibling = submitBtn;

        // show error message
        showMessage(sibling, "failure", "We cannot find this mail! Check the mail and try again.");
        console.log("No match found!");
    }

})


// get users   
const getUsers = () => {
    // create a list that will house the emails 
    let emails= [];

    // fetch the date from the json file
    return fetch("/data/users.json")
    
        // get response
        .then(res => res.json())
        
        // with the response, add emails to the list
        .then(users => {
            users.forEach((user) => {
                emails.push(user.email);
            })
            return emails;
        })
        
        // catch any error and console it
        .catch(err => console.log(err));
}

// show message
const showMessage = (sibling, status, message) => {
    // get the parent and nextSibling element of the message
    const parent = document.getElementById("login-form");
    
    // create the error message element
    const messageDiv = document.createElement("div");

    // give it a class of message
    messageDiv.className = `message ${status}`;

    // give it text content
    messageDiv.textContent = message

    // append the message to the parent before sibling
    parent.insertBefore(messageDiv, sibling);

    // remove the message after 3 seconds
    setTimeout(removeMessage, 3000);
}
// remove message
const removeMessage = () => {
    // get any element with class of message
    const message = document.querySelector(".message");
    
    if (message) {
        // remove it
        message.remove();
    }   
}