import './textP.css'



const TextP =({style,text})=>{

    return( 
    <div className='texpPS' style={style} > 
        <p>Rules</p>
        <ul>
        <li>Do you have 15s to win </li>
        <li>You need to click de bottle to win</li>
        <li>You can't click the mounster</li>
        <li>To reset the game, click the bottle</li>
        </ul>
    </div>
    )
}

export default TextP