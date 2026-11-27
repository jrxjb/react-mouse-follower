import './rulesPanel.css'



const RulesPanel = ()=>{

    return( 
   <div className='rules-panel'>
        <p>Rules</p>
        <ul>
        <li>Reach the potion before time runs out </li>
        <li>Click the potion to win</li>
        <li>Don't click the monster</li>
        <li>On mobile: drag, then tap the potion quickly</li> 
        <li>Click the potion or the monster to reset</li>
        </ul>
    </div>
    )
}

export default RulesPanel 

