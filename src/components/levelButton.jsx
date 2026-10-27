import './levelButton.css'
const LevelButton = ({textLevel,onSelect,selectButton})=>{
    return (
<>
<div className={selectButton==true? "level-button-active":"level-button"} onClick={onSelect}> {textLevel}</div>
</>

    )
}

export default LevelButton