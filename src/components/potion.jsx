import './potion.css'

function PotionButton({enable,muestraV,style}){
    // {enable} 
    return(
        <>
         <div className='potion-closed' onClick={muestraV}  style={style}>
            
             <div>
                <div className='potion-top'>
                </div>
                <div className='potion-middle'>
                </div>
            </div>
            <div className='potion-body'>
                <div className='potion-liquid-top'></div> 
                <div className='potion-liquid'></div>
                
            </div>   

           
        </div>
      
        </>
    )
};

export default PotionButton
