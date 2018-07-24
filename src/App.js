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

class CoordEvent 
{
    constructor(){
        this.list = [];
        this.toRemove = [];
    }

    push(listener){
        this.list.push(listener);
    }

    remove(listener){
        this.toRemove.push(listener);
    }

    finalize(){
        if (this.toRemove.length === 0) return;
        this.list = this.list.filter(item => this.toRemove.indexOf(item) !== -1);
        this.toRemove = [];
    }

    dispatch(x,y){
        console.log('dispatch',x,y);
        this.list.forEach(fn => fn(x,y));
    }
}

const Canvas = props => {
    var list = [];
    const mousemove = new CoordEvent();
    const mouseup = new CoordEvent();
    for (let i=0; i<100; i++) {
        list.push(
            <Circle uplisteners={mouseup} movelisteners={mousemove} 
                x={Math.random()*1000} y={Math.random()*1000} key={i}/>
        );
    }
    console.log(list);
    return (
        <svg className='Canvas' width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
            onMouseMove={event => mousemove.dispatch(event.screenX, event.screenY)}
            onMouseUp={event => mouseup.dispatch(event.screenX, event.screenY)}>
            {list}
        </svg>
    );
};

class Circle extends Component {

    constructor(props){
        super();
        this.state = {
            x: Number(props.x),
            y: Number(props.y),
            dragX: 0,
            dragY: 0,
            drag: false
        };
    }
    
    dragStart(x,y) {
        if (this.state.drag === true) return;
        if (this.movelistener == null) {
            this.movelistener = (x,y) => this.drag(x,y);
            this.props.movelisteners.push(this.movelistener)
        }
        if (this.uplistener == null) {
            this.uplistener = () => this.dragStop();
            this.props.uplisteners.push(this.uplistener);
        }
        console.log('start',x,y);
        this.setState({ drag:true, dragX: x, dragY: y });
    }

    dragStop(){
        if (this.state.drag === false) return;
        if (this.movelistener != null){
            this.props.movelisteners.remove(this.movelistener);
            this.movelistener = null;
        } 
        if (this.uplistener){
            this.props.uplisteners.remove(this.uplistener);
            this.uplistener = null;
        }
        console.log('stop');
        this.setState({ drag:false });
    }

    drag(x,y){
        if (this.state.drag === false) return;
        const dx = x - this.state.dragX;
        const dy = y- this.state.dragY;
        console.log('drag', dx, dy);
        this.setState({ x: this.state.x + dx, y: this.state.y + dy, dragX: x, dragY: y })
    }

    
    render() {
        console.log('rennder', this.state);
        const {x,y} = this.state;
        const classlist = ['circle'];
        if (this.state.drag) {
            classlist.push('dragging');
        }
        return (
            <circle className={classlist.join(' ')} cx={x} cy={y} r="40" draggging={this.state.drag}
                onDragStart={(e)=>{e.preventDefault();}}
                onMouseDown={event => this.dragStart(event.screenX, event.screenY)}/>
        );
    }
}

export default App;
