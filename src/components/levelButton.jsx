import './levelButton.css'
const LevelButton = ({textLevel,onSelect,selectButton})=>{
    return (
<>
<div className={selectButton==true? "level-buttom-active":"level-buttom"} onClick={onSelect}> {textLevel}</div>
</>

    )
}

export default LevelButton