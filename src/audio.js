
// Lose 
const audioLoseN = new Audio("/audio/lose.mp3")
audioLoseN.preload = "auto"
audioLoseN.volume=0.4
 
function playLoseSound(){
        const audioPlayLose = audioLoseN
        audioPlayLose.currentTime = 0
        audioPlayLose.play().catch(() => {}) 
     }



//Sound Button Levels
const audioButton = new Audio("/audio/button.mp3")
audioButton.preload = "auto"
audioButton.volume = 0.4


function playButtonSound(){
    if(!audioButton)return
    const audioPlayNButton = audioButton
    audioPlayNButton.currentTime = 0
    audioPlayNButton.play().catch(() => {}) 

}

// potion Sound
const audioPotion = new Audio("/audio/potion.mp3")
audioPotion.preload = "auto"
audioPotion.volume = 1


function playPotionSound(){
    if(!audioPotion)return
    const audioPlayPotion =  audioPotion
    audioPlayPotion.currentTime = 0
    audioPlayPotion.play().catch(() => {}) 

}

// Win
const audioWin = new Audio("/audio/win.mp3")
audioWin.preload = "auto"
audioWin.volume = 1



function playWinSound(){
    if(!audioWin)return
    const audioPlayWin = audioWin
    audioPlayWin.currentTime = 0
    audioPlayWin.play().catch(() => {}) 

}


//theme

const music = new Audio('/audio/theme1.mp3')
music.preload = 'auto'
music.volume = 0.15
music.loop = true

// exportadas
function startMusic() {
  if (!music.paused) return
  music.play().catch(() => {})
}

function setMusicRate(rate) {
  music.playbackRate = rate
}


function setMuted(isMuted) {
  audioLoseN.muted  = isMuted
  audioButton.muted = isMuted
  audioPotion.muted = isMuted
  audioWin.muted    = isMuted
  music.muted       = isMuted
}



export {playLoseSound,playButtonSound, playPotionSound, playWinSound,startMusic,setMusicRate,setMuted} 
 
