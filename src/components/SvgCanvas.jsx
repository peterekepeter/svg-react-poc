import React, { useContext } from 'react';

const defaultMouse = { x: NaN, y: NaN, down: false };

const MouseState = React.createContext(defaultMouse);

/** provides mouse state for mouse control */
export function useMouseState(){
    return useContext(MouseState);
}

export function SvgCanvas({ children }) {  
    return (
        <svg className='Canvas' width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {children}
        </svg>
    );
};
