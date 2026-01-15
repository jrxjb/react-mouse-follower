import './circulo.css'

function CirculoSeguidor({Texto,x}){
    return(
        <div className='circulo' style={{transform:`translate(${x}px,0px)`}}>
            {Texto}
        </div>
    )
}

export default CirculoSeguidor
//style={{ left: `${x}px`, top: `${y}px` }}
