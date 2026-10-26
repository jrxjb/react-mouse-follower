import './timer.css'
//{transform:`translate(${width/2}px,${height/2}px)`}


const TimerP =({timer,style,text,timeToWin})=>{
    const width = window.innerWidth 
    const height = window.innerHeight

    return( 
    <div className='timerP' style={style} > 
        <div className="text">{timer}s time /{timeToWin}s </div>
        <div className="text">{text}</div>
    </div>
    )
}

export default TimerP 