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
      }
          window.addEventListener('pointermove',pointerMove)
         return ()=>{window.removeEventListener('pointermove', pointerMove)} 
       
      }
    }


      ,[enable,decrementar])

//useEffect interval

    useEffect(()=>{
      if(enable==true){
      const interval = setInterval(()=>{
        setRandomPosition({x:getRandomInt(width),y:getRandomInt(height)})}
        , getRandomInt(2000));
    return ()=>clearInterval(interval)
    }
  },[enable,randomPosition])
// useEffect circulos decrementar 

useEffect(() => {
  if (enable) {
    const x = position.x + (decrementar.x - position.x) * 0.001
    const y = position.y + (decrementar.y - position.y) * 0.001
    setPosition({ x, y })
  }
}, [enable, decrementar, position])



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
