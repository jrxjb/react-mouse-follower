import './levelButtom.css'
const LevelButtom = ({textLevel,selecLevel,selectButtom})=>{
    return (
<>
<div className={selectButtom==true? "level-buttom-active":"level-buttom"} onClick={selecLevel}> {textLevel}</div>
</>

    )
}

export default LevelButtom 