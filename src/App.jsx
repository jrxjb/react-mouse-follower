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

    const [enable,setEnable] = useState(false)
    const [position,setPosition] = useState({x:(width*0.001),y:(height*0.001)})
    const [winner, setWinner] = useState(false)
    const [randomPosition,setRandomPosition] = useState({x:width/2,y:height/2})
    const [decrementar,setDecrementar] = useState({x:0,y:0})
    const [pantalla,setPantalla] = useState("Choose a level")
    const [timer,setTimer] = useState(0)
    const [levelG,setLevelG] = useState(0)
    const [timeToWin,setTimeToWin] = useState(0)
    const [speet,setSpeet]= useState(0)



    useEffect(
    ()=>{

      if(enable==true){
    const pointerMove = (event)=>{
    const {clientX,clientY} = event
    setDecrementar({ x: clientX, y: clientY })
      
    //setEnable(clientX) 
        setWinner(true)
        setPantalla("playing")


      }


          window.addEventListener('pointermove',pointerMove)
         return ()=>{window.removeEventListener('pointermove', pointerMove)} 
       
      }
    }

      ,[enable])

//useEffect interval

    useEffect(()=>{
      if(enable==true){
      const interval = setInterval(()=>{
        setRandomPosition({x:getRandomInt(width),y:getRandomInt(height)})}
        , getRandomInt(levelG));
    return ()=>clearInterval(interval)
    }
  },[enable,randomPosition])
// useEffect circulos decrementar 
// hard 0.115
//medium 0.09
//easy 0.07
useEffect(() => {
  if (enable) {
    const x = position.x + (decrementar.x - position.x) * speet
    const y = position.y + (decrementar.y - position.y) * speet

    
    setPosition({ x, y })
  }
}, [ decrementar,randomPosition])

// timer 
useEffect(
  ()=>{
    if(enable){
    const timerV = setInterval(()=>{
      setTimer((prev)=>prev+1)},1000)

    return () => clearInterval(timerV);
        }}, 
        [enable])
   
//timer stop

useEffect(
  ()=>{
    if((timer>=timeToWin)&(enable)){
      setEnable(false)
      setPantalla("You have loss!")
    }
  }
  ,[timer])



    function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
    const muestra = ()=>{
      if(levelG==0)return;
      setEnable(!enable);
      if(winner==true&&enable==true&&timer>=1){
       setEnable(false)
       setWinner(false)
       setPantalla("you win")


    }
    if(enable==false){
       setPantalla("")
       setRandomPosition({x:width/2,y:height/2})
       setPosition({x:(width*0.001),y:(height*0.001)})
       setTimer(0)
    }
    };
 
    const clickToLoss=()=>{
      if(pantalla==="You have loss!"){
        setPantalla("")
        setRandomPosition({x:width/2,y:height/2})
        setPosition({x:(width*0.001),y:(height*0.001)})
        setTimer(0)
      }else{
      setEnable(false)
      setPantalla("You have loss!")
      setRandomPosition({x:width/2,y:height/2})
      }

    }
    const Level1 = ()=>{
      setLevelG(3000)
      setTimeToWin(30)
      setSpeet(0.07)
      setRandomPosition({x:width/2,y:height/2})
      setPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    
    }
    const Level2 = ()=>{
      setLevelG(2000)
      setTimeToWin(20)
      setSpeet(0.09)
      setRandomPosition({x:width/2,y:height/2})
      setPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    }
    const Level3 = ()=>{
      setLevelG(1000)
      setTimeToWin(10)
      setSpeet(0.115)
      setRandomPosition({x:width/2,y:height/2})
      setPosition({x:(width*0.001),y:(height*0.001)})
      setTimer(0)
    }

  


  return (
    <>
    <div className='class-app'>
    <RulesPanel  style={{position:"absolute", top:'0%', left:"78%"}}/>
    <TimerPanel  text={pantalla} timeToWin={timeToWin}  style={{position:"absolute", top:'15%', left:'50%',fontSize:'18px',}} timer={timer}/>
    <PotionButton  enable={enable} muestraV={muestra} style={{transform:`translate(${randomPosition.x}px,${randomPosition.y}px)`}}/>
    <Monster key={pantalla} clickToLossProps={clickToLoss} style={{left: `${position.x-75-5}px`, top: `${position.y-75-5}px` }} />    
     {pantalla === "you win" && <ConfettiBoom mode="boom" />}
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
