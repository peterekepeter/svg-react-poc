import React, { useState } from 'react';
import { useMouse } from "./customHooks";

export function DragControl({ delta, x, y, change })
{
    const mouse = useMouse();
    const [last, setLast] = useState({ x:mouse.x, y:mouse.y });
    const deltaX = mouse.x - last.x;
    const deltaY = mouse.y - last.y; 
    
    if (deltaX !== 0 || deltaY !== 0)
    {
        setLast({ x:mouse.x, y:mouse.y });
        if (mouse.down)
        {
            if (delta != null)
            {
                delta(deltaX, deltaY);
            }
            if (change != null)
            {
                change(x + deltaX, y + deltaY)
            }
        }
    }
    return <></>;
}
