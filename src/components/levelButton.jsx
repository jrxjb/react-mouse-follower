import './levelButton.css'
const LevelButton = ({textLevel,selecLevel,selectButtom})=>{
    return (
<>
<div className={selectButtom==true? "level-buttom-active":"level-buttom"} onClick={selecLevel}> {textLevel}</div>
</>

    )
}

export default LevelButton