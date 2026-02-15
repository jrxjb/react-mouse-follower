import './textP.css'



const TextP =({style})=>{

    return( 
    <div className='texpPS' style={style} > 
        <p>Rules</p>
        <ul>
        <li>You need to win until the time finish </li>
        <li>You need to click the bottle to win</li>
        <li>You can't click the mounster</li>
        <li>To reset the game, click the bottle  or the mounster</li>
        </ul>
    </div>
    )
}

export default TextP