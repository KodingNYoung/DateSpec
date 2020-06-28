// get the users 
const getUserList = () => {
    // create a list that will house the emails 
    let emails= [],
    usernames = [];
    // fetch the date from the json file
    return fetch("../data/users.json")
    
        // get response
        .then(res => res.json())
        
        // with the response, add emails to the list
        .then(users => {
            if (!users) throw new Error();

            users.forEach((user) => {
                emails.push(user.email);
                usernames.push(user.username)
            })
            console.log(users)
            return [users, emails, usernames];
        })
        
        // catch any error and console it
        .catch(err => console.log(err));
}
// getUserList();