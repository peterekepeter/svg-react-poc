import React from 'react';

export const Concept = ({x,y,width,height,content}) => {
    return <g transform={`translate(${x-width/2},${y-width/2})`}>
        <rect rx="20" ry="20" width={width} height={height}
        style={{fill:'#ddd',stroke:'#888',strokeWidth:2}}/>
        <text x={width/2} y={height/2} fill="black" dominant-baseline="middle" textAnchor="middle">{content}</text>
    </g>;
}