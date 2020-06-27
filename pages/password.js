const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", () => {
    const emailUI = document.getElementById("email").value;

    if (!emailUI) return;

    // get the list of user emails
    const userEmails = getUsers();

    userEmails.forEach(email => {
        console.log(email);
    })
    // console.log(users);
})


           
const getUsers = () => {
    let emails= [];
    fetch("users.json")
        .then(res => res.json())
        .then(users => {
            users.forEach((user) => {
                emails.push(user.email);
            })
        })
        .catch(err => console.log(err));

    return emails;
}


// console.log(submitBtn, emailUI)