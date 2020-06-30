alert("hey!")
const positionHearts = () => {
    // to position the hearts to random places
    // first get the inner dimension of the window
    let width = window.innerWidth,
    height = window.innerHeight;

    // get the hearts
    const hearts = document.querySelectorAll(".heart");
    // get a random number
    const randomNum = (width, height) => {
    // random X and Y
    const posX= Math.floor(Math.random()*width);
    const posY = Math.floor(Math.random()*height);
    return [posX, posY]
    }

    // position the 
    const position = (heart, [width, height]) => {
    heart.style.transform = `translateX(${width}px) translateY(${height}px)`;
    // console.log(heart, width, height);
    }
    // position the heart with the 
    hearts.forEach(heart => {
    position(heart, randomNum(width, height));
    })

    // console.log(randomNum(width, height), hearts);
    // console.log(randomNum(width, height));
}
// create hearts
const createHearts = () => {
    // create a list of the groups
    const items = ["h1", "h2", "h3", "h4", "h5","h1", "h2", "h3", "h4", "h5","h1", "h2", "h3", "h4", "h5"];
    
    // loop through the loop and add the items as class to the created divs
    items.forEach(item => {
        // create a div
        const heartDiv = document.createElement("div");
        
        //add classes
        heartDiv.className = `heart ${item}`;

        // create the img
        const image = document.createElement("img");

        // give it a source of the image directory
        image.src = "../img/heart.svg";

        // append image to div
        heartDiv.appendChild(image);

        // append div to parent
        document.getElementById("heart-designs").appendChild(heartDiv);
    })

    positionHearts();
}

createHearts();

setInterval(positionHearts, 5000)