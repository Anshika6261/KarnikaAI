// Spinner.js
import React from 'react';

const Spinner = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <div className="spinner" />
            <style>
                {`
                    .spinner {
                        border: 8px solid rgba(255, 255, 255, 0.2);
                        border-radius: 50%;
                        border-top: 8px solid #3498db;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default Spinner;
