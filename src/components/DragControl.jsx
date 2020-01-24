import React, { useState, useEffect } from 'react';

export function useDragControl(props){
    const [state, setState] = useState({ x:0, y:0, down:false });

    const dragStop = () => setState({ 
        x:state.x, 
        y:state.y, 
        down:false 
    });

    const dragStart = (event) => setState({ 
        x:event.screenX, 
        y:event.screenY, 
        down: true 
    });

    const dragControl = state.down 
        ? <DragControl {...props} state={state} end={dragStop}/>
        : null;

    return [dragControl, dragStart];
}

export function DragControl({ state, delta, x, y, change, end })
{
    const mouse = useMouse(state);
    const [last, setLast] = useState({ x: mouse.x, y:mouse.y });
    const [isDown, setIsDown] = useState(mouse.down);
    const deltaX = mouse.x - last.x;
    const deltaY = mouse.y - last.y; 
    
    if (isDown !== mouse.down){
        setIsDown(mouse.down);
        if (end != null && mouse.down === false){
            end();
        }
    }

    if (deltaX !== 0 || deltaY !== 0)
    {
        setLast({ x: mouse.x, y:mouse.y });
        if (mouse.down)
        {
            if (delta != null)
            {
                delta(deltaX, deltaY);
            }
            if (change != null)
            {
                const newX = x+deltaX;
                const newY = y+deltaY;
                if (newX !== x || newY !== y){
                    change(newX, newY);
                }
            }
        }
    }
    return <></>;
}

const defaultState = { x:-1, y:-1, down:false };

export function useMouse(state)
{
    if (state == null){
        state = defaultState;
    }

    const [mouse, setMouse] = useState({
        x:state.x,
        y:state.y,
        down:state.down
    });  

    useWindowHandler('mousedown', 
        event => setMouse({ x: event.screenX, y: event.screenY, down: true }));
    useWindowHandler('mousemove', 
        event => setMouse({ x: event.screenX, y: event.screenY, down: mouse.down }));
    useWindowHandler('mouseup', 
        event => setMouse({ x: event.screenX, y: event.screenY, down: false }));

    return mouse;
}

export function useWindowHandler(eventName, eventHandler){
    useEffect(() => {
        window.addEventListener(eventName, eventHandler);
        return () => window.removeEventListener(eventName, eventHandler);
    })
}