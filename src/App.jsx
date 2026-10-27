import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import Monster from './components/monster.jsx'
import PotionButton from './components/potion.jsx'
import TimerPanel from './components/timer.jsx'
import RulesPanel from './components/rulesPanel.jsx'
import ConfettiBoom from "react-confetti-boom";
import LevelButton from './components/levelButton.jsx'



function App() {
  
    const width = window.innerWidth 
    const height = window.innerHeight

    const [isPlaying, setIsPlaying] = useState(false)
    const [monsterPosition,setMonsterPosition] = useState({x:(width*0.001),y:(height*0.001)})
    const [winner, setWinner] = useState(false)
    const [potionPosition,setPotionPosition] = useState({x:width/2,y:height/2})
    const [pointer, setPointer] = useState({x:0,y:0})
    const [status,setStatus] = useState("Choose a level")
    const [timer,setTimer] = useState(0)
    const [spawnDelay,setSpawnDelay] = useState(0)
    const [timeLimit,setTimeLimit] = useState(0)
    const [speed,setSpeed]= useState(0)



    useEffect(
    ()=>{

      if(isPlaying==true){
    const pointerMove = (event)=>{
    const {clientX,clientY} = event
    setPointer({ x: clientX, y: clientY })
      
    //setIsPlaying(clientX) 
        setWinner(true)
        setStatus("playing")


      }


          window.addEventListener('pointermove',pointerMove)
         return ()=>{window.removeEventListener('pointermove', pointerMove)} 
       
      }
    }

      ,[isPlaying])

//useEffect interval

    useEffect(()=>{
      if(isPlaying==true){
      const interval = setInterval(()=>{
        setPotionPosition({x:getRandomInt(width),y:getRandomInt(height)})}
        , getRandomInt(spawnDelay));
    return ()=>clearInterval(interval)
    }
  },[isPlaying,potionPosition])
// useEffect circulos decrementar 
// hard 0.115
//medium 0.09
//easy 0.07
useEffect(() => {
  if (isPlaying) {
    const x = monsterPosition.x + (pointer.x - monsterPosition.x) * speed
    const y = monsterPosition.y + (pointer.y - monsterPosition.y) * speed

    
    setMonsterPosition({ x, y })
  }
}, [ pointer,potionPosition])

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
    if((timer>=timeLimit)&(isPlaying)){
      setIsPlaying(false)
      setStatus("You lost!")
    }
  }
  ,[timer])



    function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
    const muestra = ()=>{
      if(spawnDelay==0)return;
      setIsPlaying(!isPlaying);
      if(winner==true&&isPlaying==true&&timer>=1){
       setIsPlaying(false)
       setWinner(false)
       setStatus("You win")


    }
    if(isPlaying==false){
       setStatus("")
       setPotionPosition({x:width/2,y:height/2})
       setMonsterPosition({x:(width*0.001),y:(height*0.001)})
       setTimer(0)
    }
    };
 
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
      setTimeLimit(30)
      setSpeed(0.07)
      setPotionPosition({x:width/2,y:height/2})
      setMonsterPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    
    }
    const Level2 = ()=>{
      setSpawnDelay(2000)
      setTimeLimit(20)
      setSpeed(0.09)
      setPotionPosition({x:width/2,y:height/2})
      setMonsterPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    }
    const Level3 = ()=>{
      setSpawnDelay(1000)
      setTimeLimit(10)
      setSpeed(0.115)
      setPotionPosition({x:width/2,y:height/2})
      setMonsterPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    }

  


  return (
    <>
    <div className='class-app'>
    <RulesPanel  style={{position:"absolute", top:'0%', left:"78%"}}/>
    <TimerPanel  text={status} timeLimit={timeLimit}  style={{position:"absolute", top:'15%', left:'50%',fontSize:'18px',}} timer={timer}/>
    <PotionButton  onToggle={muestra} style={{transform:`translate(${potionPosition.x}px,${potionPosition.y}px)`}}/>
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
