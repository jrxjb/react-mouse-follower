import './circulo.css'

function CirculoSeguidor({Texto,style}){
    return(
        <div className='circulo' style={style} >
            {Texto}
        </div>
    )
}

export default CirculoSeguidor
//style={{ left: `${x}px`, top: `${y}px` }}
