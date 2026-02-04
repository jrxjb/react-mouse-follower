import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import CirculoSeguidor from './components/circulo.jsx'
import ButtonRadom from './components/button.jsx'
import TimerP from './components/timer.jsx'
import TextP from './components/textoPantalla.jsx'

function App() {
  
    const width = window.innerWidth 
    const height = window.innerHeight

    const [enable,setEnable] = useState(false)
    const [position,setPosition] = useState({x:(width*0.001),y:(height*0.001)})
    const [winner, setWinner] = useState(false)
    const [randomPosition,setRandomPosition] = useState({x:width/2,y:height/2})
    const [decrementar,setDecrementar] = useState({x:0,y:0})
    const [pantalla,setPantalla] = useState("")
    const [timer,setTimer] = useState(0)

    useEffect(
    ()=>{

      if(enable==true){
    const pointerMove = (event)=>{
    const {clientX,clientY} = event
    setDecrementar({ x: clientX, y: clientY })
      
    //setEnable(clientX) 
        setWinner(true)
        setPantalla("jugando")



        //Formula de la distancia 
       /*
    const mx=clientX-position.x
    const my=clientY-position.y
    const distancia = Math.sqrt(mx*mx+my*my)   
    const radio = 180
   if(mx<=radio&my<=radio){
    setPantalla("Atrapado")
    setEnable(false)
    setWinner(false)
    }
    */
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
   // const x = decrementar.x
  //  const y = decrementar.y

    
    setPosition({ x, y })
  }
}, [ decrementar,randomPosition])

// timer 
useEffect(
  ()=>{
    if(enable){
    const timerV = setInterval(()=>{
      setTimer((prev)=>prev+1)},1200)

    return () => clearInterval(timerV);
        }}, 
        [enable])
   
//timer stop

useEffect(
  ()=>{
    if((timer>=15)&(enable)){
      setEnable(false)
    }
  }
  ,[timer])



    function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
    const muestra = ()=>{
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
      setEnable(false)
      setPantalla("Loss")
      setRandomPosition({x:width/2,y:height/2})

    }

  


  return (
    <>
    <div className='class-app'>
    <TextP   style={{position:"absolute", top:'0%', left:"calc(50% - 75px)"}}/>
    <TimerP text={pantalla}  style={{position:"absolute", top:'15%', left:'50%',fontSize:'18px',}} timer={timer}/>
    <ButtonRadom enable={enable} muestraV={muestra} style={{transform:`translate(${randomPosition.x}px,${randomPosition.y}px)`}}/>
    <CirculoSeguidor clickToLossProps={clickToLoss} style={{left: `${position.x-75-5}px`, top: `${position.y-75-5}px` }} />    
     </div>
    </>
  )
}

export default App
