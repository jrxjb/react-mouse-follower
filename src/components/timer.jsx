import './timer.css'
//{transform:`translate(${width/2}px,${height/2}px)`}


const TimerPanel =({timer,style,text,timeLimit})=>{
    const width = window.innerWidth 
    const height = window.innerHeight

    return( 
    <div className='timerP' style={style} > 
        <div className="text">Time: {timer}s / {timeLimit}s </div>
        <div className="text">{text}</div>
    </div>
    )
}

export default TimerPanel