import React, { useState } from 'react';
import { useDragControl, DragControl, useMouse } from './DragControl';

const fixtures = () => { return {
    'dragControl hook': <UseDragControlFixture/>,
    'Delta Control' : <DragControlDeltaFixture/>,
    'Value Control' : <DragControlValueFixture/>,
    'End event' : <DragControlEndFixture/>,
    'useMouse hook' : <MouseFixture/>,
}};

const DragControlDeltaFixture = () => {
    const [circleState, setCircleState] = useState({ cx:64, cy:64 })
    return <>
        <h1>Delta Control</h1>
        <svg>
            <circle {...circleState} r="40" stroke="black" strokeWidth="3" fill="red" />
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
        <h1>Value Control</h1>
        <svg>
            <circle {...circleState} r="40" stroke="black" strokeWidth="3" fill="red" />
            <DragControl 
                x={circleState.cx} y={circleState.cy} 
                change={(cx, cy) => setCircleState({cx, cy})}/>
        </svg>
        <p>Drag the element across the canvas!</p>
    </>
}

const DragControlEndFixture = () => {
    const [circleState, setCircleState] = useState({ cx:64, cy:64 });
    const [counter, setCounter] = useState(0);
    return <>
        <h1>End Event</h1>
        <svg>
            <circle {...circleState} r="40" stroke="black" stroke-width="3" fill="red" />
            <DragControl delta={(x,y) => setCircleState({
                cx : circleState.cx + x,
                cy : circleState.cy + y,
            })} end={() => {
                setCounter(counter + 1);
            }}/>
        </svg>
        <p>Dragging ended {counter} time{counter === 1 ? '' : 's'}!</p>
    </>
}

const MouseFixture = () => {
    const mouse = useMouse();
    return <ul>
        <li>x: {mouse.x}</li>
        <li>y: {mouse.y}</li>
        <li>down: {mouse.down.toString()}</li>
    </ul>
}

export const UseDragControlFixture = () => {
    const [x, setX] = useState(64);
    const [y, setY] = useState(64);

    const [dragControl, dragStart] = useDragControl({ 
        delta: (dx,dy) => {setX(x + dx); setY(y + dy) }
    });

    return <svg width="100%" height="400">
        <g transform={`translate(${x},${y})`}>
            <rect x="0" y="0" rx="8" ry="8" width="150" height="150"
            style={{fill:'#eee',stroke:'#444',strokeWidth:2,opacity:0.9}}
            onMouseDown={dragStart}/>
            <text x="20" y="50" fill="black">Drag the box!!</text>
            {dragControl}
        </g>
    </svg>;
}

export default fixtures();