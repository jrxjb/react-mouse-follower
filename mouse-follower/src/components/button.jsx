import './button.css'

function ButtonRadom({enable,muestraV,style}){
    
    return(
        <>
         <div className='potion-closed' onClick={muestraV}  style={style}>
             {enable} 
            <div className='potion-top'>
                <div className='potion-middle'>
                </div>
            </div>
            <div className='potion-body'>    
            </div>
        </div>
      
        </>
    )
};

export default ButtonRadom
