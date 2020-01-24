import React from 'react';
import { SvgCanvas, useMouseState } from './SvgCanvas';

const fixtures = () => { return {
    'SvgCanvas mouse state' : <TestCanvasMouseState/>
}};

const TestCanvasMouseState = () => 
    <SvgCanvas>
        <ShowState/>
    </SvgCanvas>;

function ShowState(){
    const mouse = useMouseState();
    return <>
        <text x="20" y="20">{mouse.x}</text>
        <text x="20" y="40">{mouse.y}</text>
        <text x="20" y="60">{mouse.down.toString()}</text>
    </>
}

export default fixtures();