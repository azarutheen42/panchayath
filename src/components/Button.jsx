import React, { useState } from 'react';
import Config from '../Config';




function ButtonWithLoader(props) {
    const [loading, setLoading] = useState(false);
    const {
        itemId, onClick, class_name,text,span_class

    } = props

    const handleClick = async () => {
        setLoading(true);
        try {
            await onClick();
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className={class_name} onClick={handleClick} disabled={loading}>
            {loading ? Config.loader : <span class={span_class}></span>} {text}
        </button>
    );
}

export default ButtonWithLoader;