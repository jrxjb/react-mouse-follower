import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import CirculoSeguidor from './components/circulo.jsx'
import ButtonRadom from './components/button.jsx'
import TimerP from './components/timer.jsx'
import TextP from './components/textoPantalla.jsx'
import ConfettiBoom from "react-confetti-boom";
import LevelButtom from './components/levelButtom.jsx'


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
        , getRandomInt(1000));
    return ()=>clearInterval(interval)
    }
  },[enable,randomPosition])
// useEffect circulos decrementar 

useEffect(() => {
  if (enable) {
    const x = position.x + (decrementar.x - position.x) * 0.1
    const y = position.y + (decrementar.y - position.y) * 0.1

    
    setPosition({ x, y })
  }
}, [ decrementar,randomPosition])

// timer 
useEffect(
  ()=>{
    if(enable){
    const timerV = setInterval(()=>{
      setTimer((prev)=>prev+1)},levelG)

    return () => clearInterval(timerV);
        }}, 
        [enable])
   
//timer stop

useEffect(
  ()=>{
    if((timer>=15)&(enable)){
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
      if(winner==true&&enable==true){
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
      setLevelG(2500)
      setSelectButtom(true)
    }
    const Level2 = ()=>{
      setLevelG(1800)
    }
    const Level3 = ()=>{
      setLevelG(1200)
    }

  


  return (
    <>
    <div className='class-app'>
    <TextP   style={{position:"absolute", top:'0%', left:"calc(80%)"}}/>
    <TimerP text={pantalla}  style={{position:"absolute", top:'15%', left:'50%',fontSize:'18px',}} timer={timer}/>
    <ButtonRadom enable={enable} muestraV={muestra} style={{transform:`translate(${randomPosition.x}px,${randomPosition.y}px)`}}/>
    <CirculoSeguidor key={pantalla} clickToLossProps={clickToLoss} style={{left: `${position.x-75-5}px`, top: `${position.y-75-5}px` }} />    
     {pantalla === "you win" && <ConfettiBoom mode="boom" />}
     <section style={{position:"absolute", top:"calc(0% + 230px)",left:"95%"}}>
     <LevelButtom selectButtom={levelG==2500} selecLevel={Level1} textLevel='Level 1'/>
     <LevelButtom selectButtom={levelG==1800} selecLevel={Level2} textLevel='Level 2'/>
     <LevelButtom selectButtom={levelG==1200} selecLevel={Level3} textLevel='Level 3'/>
     </section>
    </div>
    </>
  )
}

export default App
