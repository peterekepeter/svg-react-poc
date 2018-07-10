import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
      </div>
    );
  }
}

// useful property if you want svg to behave like an img
// viewBox="0 0 100 100"

const Canvas = props => {
    var list = [];
    for (let i=0; i<1000; i++) {
        list.push(<Circle x={80+(i%16)*50} y={i} key={i}/>);
    }
    return (
        <svg className='Canvas' width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {list}
        </svg>
    );
};

class Circle extends Component {

    constructor(props){
        super();
        this.state = {
            x: Number(props.x),
            y: Number(props.y)
        };
    }
    
    render() {
        console.log('cat')
        const {x,y} = this.state;
        return (
            <circle className='Circle' cx={x} cy={y} r="40" 
                onMouseOver={event => this.setState({ x:x+10 })}/>
        );
    }
}

export default App;
