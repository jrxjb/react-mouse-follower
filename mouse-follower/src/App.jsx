import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import CirculoSeguidor from './components/circulo.jsx'

function App() {
    const [enable,setEnable] = useState(false)
    const [position,setPosition] = useState({x:0,y:0})
    useEffect(
    ()=>{
      if(enable==true){
      
    const pointerMove = (event)=>{
    const {clientX,clientY} = event
    console.log(clientX)
    setPosition({x:clientX,y:clientY})
    //setEnable(clientX) 
    }
     window.addEventListener('pointermove',pointerMove)
        console.log("hola")
        return ()=>{window.removeEventListener('pointermove', pointerMove)}
      }
      }
      ,[enable])


    const muestra = ()=>{
      setEnable(!enable);
    };

  return (
    <>
    <div>
    </div>
    <button onClick={muestra}>
      {enable}
    </button>

    <CirculoSeguidor Texto={"hola"} x={position.x}/>
    </>
  )
}

export default App
