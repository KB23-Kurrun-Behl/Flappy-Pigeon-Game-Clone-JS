import { updatePigeon, setUpPigeon, getPigeonRect } from "./pigeon.js"
import { updatePipes, setUpPipes, getPassedPipesCount, getPipeRects } from "./pipe.js"

/* Importing the pigeon.js file containing different functions */

document.addEventListener("keypress", startGame, { once:  true})

/* When any key is pressed - the start game function is called */
/* Setting once to true means that the key press happens once in the game - and once this occurs the start game function is called */

const mainTitle = document.querySelector("[data-mainTitle]")
const smallTitle = document.querySelector("[data-smallTitle]")

let lastUpdateTime  /* This attribute is holding the last time we went through the update loop - using the time attribute below */

function updateGameLoop(time) {

    if (lastUpdateTime == null) {

        lastUpdateTime = time
        window.requestAnimationFrame(updateGameLoop)
        return

    }

    const delta = time - lastUpdateTime  /* The time attribute is representing the time the page has been running */
    updatePigeon(delta)
    updatePipes(delta)
    
    if (checkLose()) return loseGame()  
    /* If this is true and the player has lost the game - return the lose game function below */
    /* The return statement is used so the animation frame is not updated (because the player has lost the game and it is over) */
    
    lastUpdateTime = time
    window.requestAnimationFrame(updateGameLoop)  /* This line of code means each time another key has been pressed or something changes on the webpage - the loop will continue updating and running */

}

function checkLose() {

    const pigeonRect = getPigeonRect()
    const insidePipe = getPipeRects().some(rect => isCollision(pigeonRect, rect))

    const outsideScreen = pigeonRect.top < 0 || pigeonRect.bottom > window.innerHeight

    /* 0 is representing the top of the screen - meaning if the top of the pigeon is less than zero, it is over the top of the screen (the player has lost) */
    /* The same applies to the bottom of the screen too */

    return outsideScreen || insidePipe

}

function isCollision(rect1, rect2) {

    return (

        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top

    )
}

function startGame() { 

    /* The following function has the purpose of starting or restarting the game */

    mainTitle.classList.add("hide")  /* The following line of code will hide the main title once the key is pressed */

    /* In game - the program will experience the game loop - which is running infinitely and creating calculations for the game */

    setUpPigeon()  /* Calling the setUpPigeon function of pigeon.js each time the game has started - this allows the pigeon to begin the game on the center of the screen */
    setUpPipes()

    lastUpdateTime = null  /* Once the game starts or the new game starts - the last update time must be null, otherwise this will carry the time of the previous game and cause extra problems */

    window.requestAnimationFrame(updateGameLoop)  /* This code will create the game loop as explained before inside the JS (JavaScript) */


}

function loseGame() {

    /* The following function is called when the player loses and the game stops */

    setTimeout(() => {

    mainTitle.classList.remove("hide")
    smallTitle.classList.remove("hide")
    smallTitle.textContent = `${getPassedPipesCount()} Pipes`
    document.addEventListener("keypress", startGame, { once:  true})

    /* Removing the hide means the main title and small title will re-appear, as the player has lost the game */
    /* The text content displays the number of pipes the player had passed before losing */
    /* The event-listener means when a key is pressed again - the game will restart */

    }, 600)

    /* The setTimeout() function means there is a delay of loseGame() - this allows the player to wait a while before restarting the game */
    /* There is the risk that the player will be pressing spacebar too much, meaning they will accidentally restart the game without the intention of doing so */
    /* As I explained above - the setTimeout() function prevents something like that from happening */

}