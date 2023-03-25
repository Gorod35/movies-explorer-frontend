import React from 'react'
import './Preloader.css'

const Preloader = ({ isOpen }) => {
    return (
        <>
            {isOpen && (
                <div className="preloader">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            )}
        </>
    )
};

export default Preloader
