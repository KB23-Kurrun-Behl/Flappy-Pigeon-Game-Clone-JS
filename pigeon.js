const pigeonElement = document.querySelector("[data-pigeon]")

/* Retrieving the pigeon element with the data-pigeon attribute */

const PIGEON_SPEED = 0.5
const JUMP_LENGTH = 125
let timeSinceLastJump = Number.POSITIVE_INFINITY  /* The default value of the timeSinceLastJump being the largest positive number possible */

export function setUpPigeon() {

    setTop(window.innerHeight / 2)
    document.removeEventListener('keydown', pigeonJump)
    document.addEventListener('keydown', pigeonJump)  /* This following event-listener will control the pigeon jumping throughout the game */

}

export function updatePigeon(delta) {

    if (timeSinceLastJump < JUMP_LENGTH) {

    setTop(getTop() - PIGEON_SPEED * delta)

    /* Multiplying by the delta attribute means the speed of the pigeon will always be the same - regardless of the frame rate */
    /* If the player is jumping - the pigeon will move up with the code above */
    
    } else { 
        
    setTop(getTop() + PIGEON_SPEED * delta)

    /* If the player is not jumping - the pigeon will move down */

    }

    timeSinceLastJump += delta

    /* Every time frame is added to the timeSinceLastJump meaning this goes up - and each time the spacebar is pressed - this attribute will reset back to zero and will allow the pigeon to move up */

}

export function getPigeonRect() {

    return pigeonElement.getBoundingClientRect()

    /* The function has the purpose of finding the top left and bottom right of the pigeon - determining whether or not the pigeon is off the screen */
    /* If this is the case - the player has lost the game and must try again */

}
 
function setTop(top) {

    pigeonElement.style.setProperty("--pigeon-top", top)  /* Setting the top value with the --pigeon-top value of style.css and adding this to the top attribute of the function */

}

function getTop() {

    return parseFloat(getComputedStyle(pigeonElement).getPropertyValue("--pigeon-top"))

    /* the parseFloat() section will help make sure this is set as a number and not a string */

}

function pigeonJump(e) {

    if (e.code !== "Space") return  /* If the event-listener code is not equal to the space key - the function is not called and nothing occurs */
    timeSinceLastJump = 0;
    
}