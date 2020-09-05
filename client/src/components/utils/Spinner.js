import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";

const Spinner = () => (
    <div style={{
        position: 'absolute',
        left: '50%',
        bottom: '0%',
        zIndex: '100',
        width: '100%',
        height: '100%'
    }}>
        <div style={{
            position: 'relative',
            left: '-50%',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff99'
        }}>
            <BounceLoader color={"#007BFF"} />
        </div>
    </div>
);

export default Spinner;