import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import CirculoSeguidor from './components/circulo.jsx'
import ButtonRadom from './components/button.jsx'

function App() {
    const [enable,setEnable] = useState(false)
    const [position,setPosition] = useState({x:0,y:0})
    const [position2,setPosition2] = useState({x:0,y:0})
    const [randomPosition,setRandomPosition] = useState({x:0,y:0})
    const [decrementar,setDecrementar] = useState(0)
    useEffect(
    ()=>{
      if(enable==true){
    const pointerMove = (event)=>{
    const {clientX,clientY} = event
    console.log(clientX)
    const decrementarNumero = decrementarNumero-  getRandomInt(50)
    const clientXDecrement = clientX + 500-decrementarNumero
    setPosition({x:clientXDecrement,y:clientY+100})
    setPosition2({x:clientX+50,y:clientY+50})
    //setEnable(clientX) 
        console.log("hola")
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
        setRandomPosition({x:getRandomInt(480),y:getRandomInt(480)})}
        , getRandomInt(2000));
    return ()=>clearInterval(interval)
    }},[enable])
// useEffect circulos decrementar 

useEffect(()=>{
   const interval = setInterval (()=>{
    setDecrementar()},2000
  )
}
  ,[enable])

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
    <CirculoSeguidor style={{transform:`translate(${position2.x}px,${position2.y}px)`}} Texto={'hola2'}/>
    </>
  )
}

export default App
