const form = document.getElementById("login-form");

document.getElementById('login-btn').addEventListener("click",async (e) => {
    e.preventDefault();

    //get the username and password input
    const usernameUI = document.getElementById("email-username").value;
    const passwordUI = document.getElementById("password").value
    
    // if any field is empty stop
    if (!usernameUI || !passwordUI) return;

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

    if(isValid){
        // login
        // !form.dispatchEvent(evt);
        form.submit();
        console.log("Successful login");
        return
    }else {
        // show error message
        console.log("no match found");
    }
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
