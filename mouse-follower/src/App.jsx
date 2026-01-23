import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import CirculoSeguidor from './components/circulo.jsx'
import ButtonRadom from './components/button.jsx'

function App() {
  
    const width = window.innerWidth 
    const height = window.innerHeight

    const [enable,setEnable] = useState(false)
    const [position,setPosition] = useState({x:0,y:0})
    const [winner, setWinner] = useState(false)
    const [randomPosition,setRandomPosition] = useState({x:width/2,y:height/2})
    const [decrementar,setDecrementar] = useState({x:0,y:0})
    const [pantalla,setPantalla] = useState("jugando")
    useEffect(
    ()=>{

      if(enable==true){
    const pointerMove = (event)=>{
    const {clientX,clientY} = event
    setDecrementar({ x: clientX, y: clientY })
      
    //setEnable(clientX) 
        console.log("hola")
        setWinner(true)
        setPantalla("jugando")

    
        //Formula de la distancia 
    const mx=position.x-clientX
    const my=position.y-clientY
    const distancia = Math.sqrt(mx*mx+my*my)   
    const radio = 50
   if(distancia<=radio){
    setPantalla("Atrapado")
    setEnable(false)
    setWinner(false)
    }
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
        , getRandomInt(1500));
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
}, [enable, decrementar])



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
    };
 
    const clickToLoss=()=>{
      setEnable(false)
      setPantalla("Loss")
      setRandomPosition({x:width/2,y:height/2})

    }
  return (
    <>
    <ButtonRadom enable={enable} muestraV={muestra} style={{transform:`translate(${randomPosition.x}px,${randomPosition.y}px)`}}/>
    <CirculoSeguidor clickToLossProps={clickToLoss} style={{left: `${position.x}px`, top: `${position.y}px` }} Texto={pantalla}/>    
    </>
  )
}

export default App
