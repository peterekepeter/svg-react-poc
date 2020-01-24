import { useState, useEffect } from 'react';

export function useMouse()
{
    const [mouse, setMouse] = useState({x:0,y:0,down:false});  

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