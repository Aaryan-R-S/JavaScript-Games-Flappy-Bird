const block = document.getElementById('block')
const hole = document.getElementById('hole')
const character = document.getElementById('character')
let jumping = 0
let score = 0
let aud = new Audio('game.mp3')
let audO = new Audio('over.mp3')

if(confirm('Ready to Play Flappy Bird! 🐦\nPress any key to Fly Bird & prevent it from colliding with the Wall!')
){
    aud.play()
    hole.classList.add('animation')
    block.classList.add('animation')
}
else(location.reload())

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random() * 300) + 150)
    // returns value from -450px to -150px - range valid is -500px to 0px
    hole.style.top = random + 'px'
})

setInterval(() => {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
    if (jumping == 0) {
        character.style.top = (characterTop + 3) + 'px'
    }
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'))
    let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue('top'))
    let cTop = -(500-characterTop)
    if( (characterTop>480) || ( (blockLeft<20) && (blockLeft>-50) && ((cTop<holeTop)||(cTop>holeTop+130)) )){
        hole.classList.remove('animation')
        block.classList.remove('animation')
        audO.play()    
        aud.pause()
        aud.currentTime= 0
        if(confirm(`Game Over! Your Score : ${score} \nPlay Again ?`)){
            hole.classList.add('animation')
            block.classList.add('animation')        
            character.style.top = 100+'px';
            jumpCount = 0
            score = 0
            aud.play()
        }
        else{
            location.reload()
        }
    }
}, 10);

setTimeout(() => {
    setInterval(() => {
        score+=1
    }, 2000);
}, 2000);


function jump() {
    jumping = 1
    let jumpCount = 0
    var jumpInterval = setInterval(() => {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
        if ((characterTop > 6) && (jumpCount < 15)) {
            character.style.top = (characterTop - 5) + 'px'
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval)
            jumping = 0
            jumpCount = 0
        }
        jumpCount++;
    }, 10);
}

window.addEventListener('keydown', () => {
    jump()
})
