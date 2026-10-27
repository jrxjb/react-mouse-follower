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
    const [position,setPosition] = useState({x:(width*0.001),y:(height*0.001)})
    const [winner, setWinner] = useState(false)
    const [randomPosition,setRandomPosition] = useState({x:width/2,y:height/2})
    const [pointer, setPointer] = useState({x:0,y:0})
    const [status,setStatus] = useState("Choose a level")
    const [timer,setTimer] = useState(0)
    const [levelG,setLevelG] = useState(0)
    const [timeToWin,setTimeToWin] = useState(0)
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
        setRandomPosition({x:getRandomInt(width),y:getRandomInt(height)})}
        , getRandomInt(levelG));
    return ()=>clearInterval(interval)
    }
  },[isPlaying,randomPosition])
// useEffect circulos decrementar 
// hard 0.115
//medium 0.09
//easy 0.07
useEffect(() => {
  if (isPlaying) {
    const x = position.x + (pointer.x - position.x) * speed
    const y = position.y + (pointer.y - position.y) * speed

    
    setPosition({ x, y })
  }
}, [ pointer,randomPosition])

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
    if((timer>=timeToWin)&(isPlaying)){
      setIsPlaying(false)(false)
      setStatus("You lost!")
    }
  }
  ,[timer])



    function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
    const muestra = ()=>{
      if(levelG==0)return;
      setIsPlaying(!isPlaying);
      if(winner==true&&isPlaying==true&&timer>=1){
       setIsPlaying(false)
       setWinner(false)
       setStatus("You win")


    }
    if(isPlaying==false){
       setStatus("")
       setRandomPosition({x:width/2,y:height/2})
       setPosition({x:(width*0.001),y:(height*0.001)})
       setTimer(0)
    }
    };
 
    const clickToLoss=()=>{
      if(status==="You lost!"){
        setStatus("")
        setRandomPosition({x:width/2,y:height/2})
        setPosition({x:(width*0.001),y:(height*0.001)})
        setTimer(0)
      } else{
      setIsPlaying(false)
      setStatus("You lost!")
      setRandomPosition({x:width/2,y:height/2})
      }

    }
    const Level1 = ()=>{
      setLevelG(3000)
      setTimeToWin(30)
      setSpeed(0.07)
      setRandomPosition({x:width/2,y:height/2})
      setPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    
    }
    const Level2 = ()=>{
      setLevelG(2000)
      setTimeToWin(20)
      setSpeed(0.09)
      setRandomPosition({x:width/2,y:height/2})
      setPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    }
    const Level3 = ()=>{
      setLevelG(1000)
      setTimeToWin(10)
      setSpeed(0.115)
      setRandomPosition({x:width/2,y:height/2})
      setPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    }

  


  return (
    <>
    <div className='class-app'>
    <RulesPanel  style={{position:"absolute", top:'0%', left:"78%"}}/>
    <TimerPanel  text={status} timeToWin={timeToWin}  style={{position:"absolute", top:'15%', left:'50%',fontSize:'18px',}} timer={timer}/>
    <PotionButton  enable={isPlaying} muestraV={muestra} style={{transform:`translate(${randomPosition.x}px,${randomPosition.y}px)`}}/>
    <Monster key={status} clickToLossProps={clickToLoss} style={{left: `${position.x-75-5}px`, top: `${position.y-75-5}px` }} />    
     {status === "You win"  && <ConfettiBoom mode="boom" />}
     <section style={{position:"absolute", top:"calc(0% + 230px)",left:"95%"}}>
     <LevelButton selectButtom={levelG==3000} selecLevel={Level1} textLevel='Level 1'/>
     <LevelButton selectButtom={levelG==2000} selecLevel={Level2} textLevel='Level 2'/>
     <LevelButton selectButtom={levelG==1000} selecLevel={Level3} textLevel='Level 3'/>
     </section>
    </div>
    </>
  )
}

export default App
