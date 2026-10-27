import './monster.css'

function Monster({style,onClick}){
    return(
    
        <div className='npc' style={style} onClick={onClick} >
            <div className='head'>
                <div className='eyes'>
                    <div className='eye-left'></div>
                    <div className='eye-right'></div>
                </div>
                <div className='mouth'>
                    <div className='tongue'></div>
                </div>
            </div>
            <div className='torso'>
                    <div className='arm-right'>  
                        <div className='arm-right-body'></div>
                     </div>
                <div className='body'>
                </div>

                <div className='arm-left'>
                    <div className='arm-left-body'></div>
                </div>
              
            </div> 

            <div className='pants'>
                <div className='short'></div>
                <div className='legs'>
                    
                    <div className='leg-left'>
                        <div className='short-left'></div>
                    </div>
                    <div className='leg-right'>
                        <div className='short-right'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Monster

