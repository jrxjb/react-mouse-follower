import './circulo.css'

function CirculoSeguidor({Texto,style,clickToLossProps}){
    return(
    
        <div className='npc' style={style} onClick={clickToLossProps} >
            <div className='head'>
            </div>
            <div className='torso'>
                <div className='body'>
                </div>
                <div className='arm-righ'>  
                    <div className='arm-righ-body'></div>
                </div>
                <div className='arm-left'>
                    <div className='arm-left-body'></div>
                </div>
            </div> 

            <div className='legs'>
                <div className='leg-left'>
                    <div className='short-left'></div>
                </div>
                <div className='leg-right'>
                    <div className='short-right'></div>
                </div>
            </div>
        </div>
    )
}

export default CirculoSeguidor

