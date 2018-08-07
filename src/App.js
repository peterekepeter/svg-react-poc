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
        this.list.forEach(fn => fn(x,y));
    }
}

const Canvas = props => {
    var list = [];
    const mousemove = new CoordEvent();
    const mouseup = new CoordEvent();
    for (let i=0; i<100; i++) {
        list.push(
            <ControlPoint uplisteners={mouseup} movelisteners={mousemove} 
                x={Math.random()*1000} y={Math.random()*1000} key={i}/>
        );
    }
    console.log(list);
    return (
        <svg className='Canvas' width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
            onMouseMove={event => mousemove.dispatch(event.screenX, event.screenY)}
            onMouseUp={event => mouseup.dispatch(event.screenX, event.screenY)}>
            <Reactangle uplisteners={mouseup} movelisteners={mousemove} />
            <DragControl onChange={(x,y)=>console.log(x,y)} uplisteners={mouseup} movelisteners={mousemove}><circle cx="64" cy="128" r="16"/></DragControl>
        </svg>
    );
};

class Reactangle extends Component {
    constructor(){
        super();
        this.state = {
            x:64, y:64,
            width:100, height:100
        }
    }
    render(){
        return (
            <g>
                <rect x={this.state.x} y={this.state.y} width={this.state.width} height={this.state.height} rx="15" ry="15" />
                <ControlPoint mykey='up' uplisteners={this.props.uplisteners} movelisteners={this.props.movelisteners} 
                    x={this.state.x} y={this.state.y}
                    onChange={(x,y) => this.setState({x,y})}/>
                <ControlPoint mykey='down' uplisteners={this.props.uplisteners} movelisteners={this.props.movelisteners} 
                    x={this.state.x + this.state.width} y={this.state.y + this.state.height}
                    onChange={(x,y) => this.setState({width: x - this.state.x, height: y - this.state.y})}/>
            </g>
            
        );
    }
}

function preventDefault(event) {
    event.preventDefault();
    return false;
}

class DragControl extends Component {
    
    constructor(props){
        super();
        this.state = {
            dragX:0,
            dragY:0,
            lastX:0,
            lastY:0,
            drag: false
        };
        this.mouseHandler = event => this.dragStart(event.screenX, event.screenY);
    }

    dragStart(x,y) {
        if (this.state.drag === true) return;
        if (this.movelistener == null) {
            this.movelistener = (x,y) => this.drag(x,y);
            console.log(this.props);
            this.props.movelisteners.push(this.movelistener)
        }
        if (this.uplistener == null) {
            this.uplistener = () => this.dragStop();
            this.props.uplisteners.push(this.uplistener);
        }
        console.log('start',x,y);
        this.setState({ drag:true, dragX:x, dragY:y, lastX:x, lastY:y });
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
        if (this.props.absolute){
            this.props.absolute(x,y);
        }
        if (this.props.relative){
            this.props.relative(x - this.state.dragX, y - this.state.dragY);
        }
        if (this.props.delta){
            this.props.delta(x - this.state.lastX, y - this.state.lastY);
        }
        this.setState({lastX:x, lastY:y});
    }

    render(){
        return <g onDragStart={preventDefault} onMouseDown={this.mouseHandler}>{this.props.children}</g>;
    }

}

const ControlPoint = props => (
    <DragControl uplisteners={props.uplisteners} movelisteners={props.movelisteners} 
        delta={(x,y)=>props.onChange(props.x+x, props.y+y)}>
        <circle className="circle" cx={props.x} cy={props.y} r="8"/>
    </DragControl>
);
            
export default App;
