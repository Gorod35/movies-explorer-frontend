import React from 'react'
import './Preloader.css'

const Preloader = ({ isLoading }) => {
    return (
        <div className='preloader'>
            <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
};

export default Preloader
