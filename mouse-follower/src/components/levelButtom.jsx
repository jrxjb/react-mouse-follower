import './levelButtom.css'
const LevelButtom = ({textLevel,selecLevel})=>{
    return (
<>
<div className="level-buttom" onClick={selecLevel}> {textLevel}</div>
</>

    )
}

export default LevelButtom 