import React, { useState } from 'react';
import Config from '../Config';




function ButtonWithLoader(props) {
    const [loading, setLoading] = useState(false);
    const [btnIndex,setBtnIndex] =useState(false)
    const {
        itemId, onClick, class_name,text,span_class,loader,index

    } = props

    const handleClick =  () => {
        // setLoading(false);
        // if(loading){
        //     setLoading(false);
        //     return
        // }
        setLoading(true);
        // setBtnIndex(index);
        // setLoader(index)
        fetchData()
        
        
    };


    const  fetchData= async()=>{

        try {
           await onClick();
       } catch (error) {
           console.error('Error occurred:', error);
       } finally {
           setLoading(false);
       }

    }

    return (
        <button className={class_name} onClick={handleClick} 
        disabled={loading && (index===loader )}
        >
            {(loading && loader ) ? Config.loader : <span class={span_class}></span>} {text}
        </button>
    );
}

export default ButtonWithLoader;