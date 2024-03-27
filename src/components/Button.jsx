import React, { useState } from 'react';
import Config from '../Config';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';




function ButtonWithLoader(props) {
    const [loading, setLoading] = useState(false);
    const [btnIndex, setBtnIndex] = useState(false)
    const {
        itemId, onClick, class_name, text, span_class, loader, index

    } = props


    const handleClick = async () => {
        setLoading(true); // Show loader
        try {
            await onClick(); // Perform API call
            // API call successful, handle response if needed
        } catch (error) {
            // Handle error if API call fails
            console.error('API call failed:', error);
        } finally {
            setLoading(false); // Hide loader regardless of success or failure
        }
    };


    return (

        <>


            <button className={class_name} onClick={handleClick}
                disabled={(index === loader)}
            >
                {((index === loader)) ? Config.loader : <span className={span_class}></span>} {text}
            </button>


            {/* <button className={class_name} onClick={handleClick}
                disabled={(loading)}
            >
                {(loading) ? Config.loader : <span className={span_class}></span>} {text}
            </button> */}


        </>

    );
}

export default ButtonWithLoader;




export function UpdateButton({ onClick, loading, setLoading }) {

    const handleClick = async () => {
        setLoading(true); // Show loader
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const data = await onClick();
            return { success: true };

        } catch (error) {

            console.error('API call failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <button type="submit" className="button btn-update" onClick={onClick} disabled={loading} >

            {loading ? Config.loader : <span ></span>} Save/Update
        </button>

    )
}


export function SaveButton({ onClick, loading, setLoading }) {


    const handleClick = async () => {
        setLoading(true); // Show loader
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const data = await onClick();
            return { success: true };

        } catch (error) {

            console.error('API call failed:', error);
        } finally {
            setLoading(false);
        }
    };



    return (

        <button type="submit" className="button btn-create" onClick={handleClick} disabled={loading}  >
            {loading ? Config.loader : <span ></span>} Save
        </button>

    )
}



export function CloseButton({ onClick }) {



    return (

        <button type="submit" className="button btn-cancel" onClick={onClick} >Cancel</button>

    )
}

export function DeleteButton({ onClick, loading, setLoading }) {

    const handleClick = async () => {
        setLoading(true); // Show loader
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const data = await onClick();
            return { success: true };

        } catch (error) {

            console.error('API call failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (

        // <button type="submit" className="button btn-delete" onClick={handleClick} disabled={loading} >

        //     {loading ? Config.loader : <span ></span>} Delete
        // </button>

        <Button variant="outlined" style={{ backgroundColor: "#c62828", color: "white" }} size="small" onClick={onClick} startIcon={<DeleteIcon />}>
            Delete
        </Button>

    )
}




export function AddButton({ onClick, text }) {

    return (

        <Button variant="contained"
            onClick={onClick}
        >+{text}</Button>

        // <button type="submit" className="button btn-edit" onClick={onClick} >
        //     +{text}
        // </button>

    )
}
