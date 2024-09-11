import React from 'react';

export default function NumChart({ dataKpi, nameKpi }) {
    return (
        <div 
            className="text-4xl font-bold text-black py-20 flex justify-center items-center" 
            style={{ paddingTop: '100px' }} 
        >
            {dataKpi}
        </div>
    );
}


