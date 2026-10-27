import './rulesPanel.css'



const RulesPanel  =({style})=>{

    return( 
    <div className='rules-panel' style={style} > 
        <p>Rules</p>
        <ul>
        <li>Reach the potion before time runs out </li>
        <li>Click the potion to win</li>
        <li>Don't click the monster</li>
        <li>Click the potion or the monster to reset</li>
        </ul>
    </div>
    )
}

export default RulesPanel 

