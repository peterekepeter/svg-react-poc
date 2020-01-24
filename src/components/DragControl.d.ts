import React from 'react';

interface DragControlProps 
{
    drag : (x : number, y:number) => void,
    x : number,
    y : number,
    change : (x : number, y : number) => void
}

function DragControl(props: DragControlProps) : void