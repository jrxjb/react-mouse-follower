import './timer.css'

const TimerPanel =({timer,style,text,timeLimit})=>{

    return( 
    <div className='timer-panel' style={style} > 
        <div className="text">Time: {timer}s / {timeLimit}s </div>
        <div className="text">{text}</div>
    </div>
    )
}

export default TimerPanel