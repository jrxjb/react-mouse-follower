import './timer.css'
//{transform:`translate(${width/2}px,${height/2}px)`}


const TimerP =({timer,style,text})=>{
    const width = window.innerWidth 
    const height = window.innerHeight

    return( 
    <div className='timerP' style={style} > 
      {timer}s time 
        <div>{text}</div>
    </div>
    )
}

export default TimerP 