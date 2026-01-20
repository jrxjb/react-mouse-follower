import './circulo.css'

function CirculoSeguidor({Texto,style,clickToLossProps}){
    return(
        <div className='circulo' style={style} onClick={clickToLossProps} >
            {Texto}
        </div>
    )
}

export default CirculoSeguidor

