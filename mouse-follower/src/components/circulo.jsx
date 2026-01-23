import './circulo.css'

function CirculoSeguidor({Texto,style,clickToLossProps}){
    return(
    
        <div className='npc' style={style} onClick={clickToLossProps} >
            <div className='head'></div>
            <div className='body'></div>
            <div className='legs'>
                <div className='leg-left'></div>
                <div className='leg-right'></div>
            </div>
        </div>
    )
}

export default CirculoSeguidor

