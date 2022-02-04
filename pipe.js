const HOLE_HEIGHT = 250
const PIPE_WIDTH = 120
const PIPE_INTERVAL = 1500
const PIPE_SPEED = 0.5
let pipesArray = []

let timeSinceLastPipe
let passedPipeCount = 0

export function setUpPipes() {

    document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH)
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)
    pipesArray.forEach(pipe => pipe.remove())
    timeSinceLastPipe = PIPE_INTERVAL
    passedPipeCount = 0

}

export function updatePipes(delta) {

    timeSinceLastPipe += delta

    if (timeSinceLastPipe > PIPE_INTERVAL) { 

        timeSinceLastPipe -= PIPE_INTERVAL  // I just removed the things from HTML inside the tutorial
        createPipe()

        /* If the time since the last pipe is less than the declared interval value of 1500: */
        /* The program will reset the value of timeSinceLastPipe and call the createPipe() function, to create another pipe */

    }

    pipesArray.forEach(pipe => {

        if (pipe.left + PIPE_WIDTH < 0) {

            passedPipeCount++
            return pipe.remove()

        }

        pipe.left = pipe.left - delta * PIPE_SPEED  /* For each pipe inside the array, we will move it to the left with the following formula */

    })
}

export function getPassedPipesCount() {

    return passedPipeCount

}

export function getPipeRects() {

    return pipesArray.flatMap(pipe => pipe.rects())

}

function createPipe() {

    const pipeElement = document.createElement("div")
    const topElement = createPipeSegment("top") 
    const bottomElement = createPipeSegment("bottom")

    /* Creating the top and bottom pipe elements based on the attributes of the HTML file */

    pipeElement.append(topElement)
    pipeElement.append(bottomElement)
    
    /* Appending the top and bottom of the pipe to the primary pipe element, creating one whole pipe */

    pipeElement.classList.add("pipe")
    pipeElement.style.setProperty("--hole-top", randomNumberBetween(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * 0.5))

    /* Setting the hole top attribute with the randomNumberBetween() function down below */
    /* The randomNumberBetween() function is using the HOLE_HEIGHT as the minimum value (the top of the webpage) and the innerHeight as the maximum value (the bottom of the webpage) */

    const pipe = {

        get left() {

            return parseFloat(getComputedStyle(pipeElement).getPropertyValue("--pipe-left"))

        },
        
        set left(value) {

            pipeElement.style.setProperty("--pipe-left", value)

        },

        remove() {

            pipesArray = pipesArray.filter(p => p !== pipe) 
            pipeElement.remove()

        },

        rects() {

            return [

                topElement.getBoundingClientRect(),
                bottomElement.getBoundingClientRect(),  

            ]
        }
    }

    pipe.left = window.innerWidth  /* This code allows the pipes to be pushed to the right during the game */
    document.body.append(pipeElement)  /* Adding the pipe element to the body of the webpage (the screen of the game) */
    pipesArray.push(pipe)  /* The array containing all the pipes that will be used during the game */

}

function createPipeSegment(position) {

    const segment = document.createElement("div")
    segment.classList.add("segment", position)
    return segment

}

function randomNumberBetween(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min)  /* Defining a number between the min and max attributes and ensuring this is as a whole number with the floor() function */

}