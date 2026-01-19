import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import CirculoSeguidor from './components/circulo.jsx'
import ButtonRadom from './components/button.jsx'

function App() {
    const [enable,setEnable] = useState(false)
    const [position,setPosition] = useState({x:0,y:0})
    const [contadorU, setContadorU] = useState()
    const [randomPosition,setRandomPosition] = useState({x:0,y:0})
    const [decrementar,setDecrementar] = useState({x:0,y:0})
    useEffect(
    ()=>{
      if(enable==true){
    const pointerMove = (event)=>{
    const {clientX,clientY} = event
    setDecrementar({ x: clientX, y: clientY })

    //setEnable(clientX) 
        console.log("hola")
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
        setRandomPosition({x:getRandomInt(480),y:getRandomInt(480)})}
        , getRandomInt(2000));
    return ()=>clearInterval(interval)
    }
    const contador=+1
    setContadorU(contador)
  },[enable,randomPosition])
// useEffect circulos decrementar 

useEffect(() => {
  const xDecrementar = decrementar.x-decrementar.x*(contadorU/10)+100
  const yDecrementar = decrementar.y-decrementar.y*(contadorU/10)+100

  if (enable) {
     if(xDecrementar<0 || yDecrementar<0){
      return setPosition({x:0, y:0})}
        else{
         setPosition({x:xDecrementar, y:yDecrementar});
        }
        return console.log(xDecrementar)
     }
    }
, [enable, randomPosition]);




    function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
    const muestra = ()=>{
      setEnable(!enable);
    };
  return (
    <>
    <ButtonRadom enable={enable} muestraV={muestra} style={{transform:`translate(${randomPosition.x}px,${randomPosition.y}px)`}}/>
    <CirculoSeguidor style={{transform:`translate(${position.x}px,${position.y}px)`}} Texto={'hola'}/>
    </>
  )
}

export default App
