import './potion.css'

function PotionButton({onToggle,style}){
    return(
        <>
         <div className='potion-closed' onClick={onToggle}  style={style}>
            
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
