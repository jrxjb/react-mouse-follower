import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import CirculoSeguidor from './components/circulo.jsx'

function App() {
    const [enable,setEnable] = useState(false)
    const [position,setPosition] = useState({x:0,y:0})
    const [position2,setPosition2] = useState({x:0,y:0})
    useEffect(
    ()=>{
      if(enable==true){
      
    const pointerMove = (event)=>{
    const {clientX,clientY} = event
    console.log(clientX)
    setPosition({x:clientX+10,y:clientY+10})
    
    setPosition2({x:clientX+50,y:clientY+50})
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

    <CirculoSeguidor style={{transform:`translate(${position.x}px,${position.y}px)`}} Texto={'hola'}/>
    <CirculoSeguidor style={{transform:`translate(${position2.x}px,${position2.y}px)`}} Texto={'hola2'}/>
    </>
  )
}

export default App
