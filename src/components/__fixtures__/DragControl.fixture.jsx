import React, { useState } from 'react';
import { SvgCanvas, useMouseState } from '../SvgCanvas';
import { DragControl } from '../DragControl';

const fixtures = () => { return {
    'Drag Control (delta)' : <DragControlDeltaFixture/>,
    'Drag Control (value)' : <DragControlDeltaFixture/>
}};

const DragControlDeltaFixture = () => {
    const [circleState, setCircleState] = useState({ cx:64, cy:64 })
    return <>
        <svg>
            <circle {...circleState} r="40" stroke="black" stroke-width="3" fill="red" />
            <DragControl delta={(x,y) => setCircleState({
                cx : circleState.cx + x,
                cy : circleState.cy + y,
            })}/>
        </svg>
        <p>Drag the element across the canvas!</p>
    </>
}

const DragControlValueFixture = () => {
    const [circleState, setCircleState] = useState({ cx:64, cy:64 })
    return <>
        <svg>
            <circle {...circleState} r="40" stroke="black" stroke-width="3" fill="red" />
            <DragControl 
                x={circleState.cx} y={circleState.cy} 
                change={(cx, cy) => setCircleState({cx, cy})}/>
        </svg>
        <p>Drag the element across the canvas!</p>
    </>
}



export default fixtures();