import { useEffect, useRef, useState } from 'react'
import './App.css'
import Monster from './components/monster.jsx'
import PotionButton from './components/potion.jsx'
import TimerPanel from './components/timer.jsx'
import RulesPanel from './components/rulesPanel.jsx'
import ConfettiBoom from "react-confetti-boom";
import LevelButton from './components/levelButton.jsx'


function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function App() {
  
    const width = window.innerWidth 
    const height = window.innerHeight

    const [isPlaying, setIsPlaying] = useState(false)
    const [monsterPosition,setMonsterPosition] = useState({x:(width*0.001),y:(height*0.001)})
    const [hasmove, setHasmove] = useState(false)
    const [potionPosition,setPotionPosition] = useState({x:width/2,y:height/2})
    const [pointer, setPointer] = useState({x:0,y:0})
    const [status,setStatus] = useState("Choose a level")
    const [timer,setTimer] = useState(0)
    const [spawnDelay,setSpawnDelay] = useState(0)
    const [minSpawnDelay,setMinSpawnDelay] = useState(0)
    const [timeLimit,setTimeLimit] = useState(0)
    const [speed,setSpeed]= useState(0)
    const pointerFrameRef = useRef(0)

    useEffect(
    ()=>{

      if(isPlaying==true){
const pointerMove = (event) => {
  const { clientX, clientY } = event
  cancelAnimationFrame(pointerFrameRef.current)
  pointerFrameRef.current = requestAnimationFrame(() => {
    setPointer(prev =>
      prev.x === clientX && prev.y === clientY ? prev : { x: clientX, y: clientY }
    )
    setHasmove(true)
    setStatus("playing")
  })
}
    window.addEventListener('pointermove',pointerMove)
        return () => {
  cancelAnimationFrame(pointerFrameRef.current)
  window.removeEventListener('pointermove', pointerMove)
}
       
      }
    }

      ,[isPlaying])

//useEffect interval

    useEffect(()=>{
      if(isPlaying==true){
      const interval = setInterval(()=>{
        const w = window.innerWidth
        const h = window.innerHeight
        setPotionPosition({x:getRandomInt(0,w-45),y:getRandomInt(0,h-30)})}
        , getRandomInt(minSpawnDelay,spawnDelay));
    return ()=>clearInterval(interval)
    }
  },[isPlaying, spawnDelay, minSpawnDelay,potionPosition])
// useEffect:// monster follows the pointer (easing) 
// hard 0.115
//medium 0.09
//easy 0.07

useEffect(() => {
  if (!isPlaying) return
  const frame = requestAnimationFrame(() => {
    setMonsterPosition(prev => ({
      x: prev.x + (pointer.x - prev.x) * speed,
      y: prev.y + (pointer.y - prev.y) * speed,
    }))
  })
  return () => cancelAnimationFrame(frame)
}, [pointer, speed, isPlaying])

// timer 
useEffect(
  ()=>{
    if(isPlaying){
    const timerV = setInterval(()=>{
      setTimer((prev)=>prev+1)},1000)

    return () => clearInterval(timerV);
        }}, 
        [isPlaying])
   
//timer stop
useEffect(
  ()=>{
    if((timer>=timeLimit)&&(isPlaying)){
      const frame = requestAnimationFrame(() => {
        setIsPlaying(false)
        setStatus("You lost!")
  })
  return () => cancelAnimationFrame(frame)
    }
  }
  ,[timer, timeLimit, isPlaying])


    const togglePotion = () => {
  if (spawnDelay == 0) return

  if (isPlaying == false) {
    setIsPlaying(true)
    setStatus("")
    setPotionPosition({x: width/2, y: height/2})
    setMonsterPosition({x: width*0.001, y: height*0.001})
    setHasmove(false)         
    setTimer(0)
    return      
  }

  if (hasmove == true && timer >= 1) {
    setIsPlaying(false)
    setStatus("You win")
  } else if (!hasmove) {
    setStatus("Gotcha! Move first")    
  } else {
    setStatus("Too fast! Wait a second") 
  }
}
 
    const clickToLoss=()=>{
      if(status==="You lost!"){
        setStatus("")
        setPotionPosition({x:width/2,y:height/2})
        setMonsterPosition({x:(width*0.001),y:(height*0.001)})
        setTimer(0)
      } else{
      setIsPlaying(false)
      setStatus("You lost!")
      setPotionPosition({x:width/2,y:height/2})
      }

    }
    const Level1 = ()=>{
      setSpawnDelay(3000)
      setMinSpawnDelay(900)
      setTimeLimit(30)
      setSpeed(0.07)
      setPotionPosition({x:width/2,y:height/2})
      setMonsterPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    
    }
    const Level2 = ()=>{
      setSpawnDelay(2000)
      setMinSpawnDelay(450)
      setTimeLimit(20)
      setSpeed(0.09)
      setPotionPosition({x:width/2,y:height/2})
      setMonsterPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    }
    const Level3 = ()=>{
      setSpawnDelay(1000)
      setMinSpawnDelay(100)
      setTimeLimit(10)
      setSpeed(0.115)
      setPotionPosition({x:width/2,y:height/2})
      setMonsterPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    }

  


  return (
    <>
    <div className='app'>
    <RulesPanel  style={{position:"absolute", top:'0%', left:"78%"}}/>
    <TimerPanel  text={status} timeLimit={timeLimit}  style={{position:"absolute", top:'15%', left:'50%',fontSize:'18px',}} timer={timer}/>
    <PotionButton onToggle={togglePotion} style={{transform:`translate(${potionPosition.x}px,${potionPosition.y}px)`}}/>
    <Monster key={status} onClick={clickToLoss} style={{left: `${monsterPosition.x-75-5}px`, top: `${monsterPosition.y-75-5}px` }} />    
     {status === "You win"  && <ConfettiBoom mode="boom" />}
     <section style={{position:"absolute", top:"calc(0% + 230px)",left:"95%"}}>
     <LevelButton selectButton={spawnDelay==3000} onSelect={Level1} textLevel='Level 1'/>
     <LevelButton selectButton={spawnDelay==2000} onSelect={Level2} textLevel='Level 2'/>
     <LevelButton selectButton={spawnDelay==1000} onSelect={Level3} textLevel='Level 3'/>
     </section>
    </div>
    </>
  )
}

export default App
