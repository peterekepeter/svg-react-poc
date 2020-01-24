import React from 'react';
import { Concept } from './Concept';

const fixtures = () => { return {
    'Default' : <ConceptFixture/>
}};


const ConceptFixture = () => <>
    <svg width="100%" height="400">
        <Concept x="128" y="128" width="128" height="64" content="test"/>
    </svg>
    <p>Do stuff!</p>
</>;


export default fixtures();