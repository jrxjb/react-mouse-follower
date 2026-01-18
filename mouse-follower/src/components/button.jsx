function ButtonRadom({enable,muestraV,style}){
    
    return(

        <button onClick={muestraV}  style={style}  >
        {enable} 
        </button>
    )
};

export default ButtonRadom
