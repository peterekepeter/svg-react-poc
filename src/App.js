import React, { Component } from 'react';
import './App.css';


const AppMouseEvents = React.createContext();

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
            <AppMouseEvents.Provider value={{mousemove, mouseup}}>
                <Reactangle/>
                <DragControl onChange={(x,y)=>console.log(x,y)}><circle cx="64" cy="128" r="16"/></DragControl>
            </AppMouseEvents.Provider>
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
            <DragControl delta={(x,y)=>this.setState({x:this.state.x+x,y:this.state.y+y})}>
                <rect x={this.state.x} y={this.state.y} width={this.state.width} height={this.state.height} rx="15" ry="15" />
                <ControlPoint mykey='up' 
                    x={this.state.x} y={this.state.y}
                    onChange={(x,y) => this.setState({x,y})}/>
                <ControlPoint mykey='down'
                    x={this.state.x + this.state.width} y={this.state.y + this.state.height}
                    onChange={(x,y) => this.setState({width: x - this.state.x, height: y - this.state.y})}/>
            </DragControl>
            
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
    }

    onMouseDown(event, context){
        if (this.props.capture == true){
            event.stopPropagation();
        }
        this.context = context;
        this.dragStart(event.screenX, event.screenY);
    }

    dragStart(x,y) {
        if (this.state.drag === true) return;
        if (this.movelistener == null) {
            this.movelistener = (x,y) => this.drag(x,y);
            this.mousemove = this.context.mousemove;
            this.mousemove.push(this.movelistener)
        }
        if (this.uplistener == null) {
            this.uplistener = () => this.dragStop();
            this.mouseup = this.context.mouseup;
            this.mouseup.push(this.uplistener);
        }
        console.log('start',x,y);
        this.setState({ drag:true, dragX:x, dragY:y, lastX:x, lastY:y });
    }

    dragStop(){
        if (this.state.drag === false) return;
        if (this.movelistener != null){
            this.mousemove.remove(this.movelistener);
            this.movelistener = null;
        } 
        if (this.uplistener){
            this.mouseup.remove(this.uplistener);
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
        
        return (<AppMouseEvents.Consumer>{context => 
            <g onDragStart={preventDefault} onMouseDown={event=>this.onMouseDown(event, context)}>
                {this.props.children}
            </g>
        }</AppMouseEvents.Consumer>)
    }

}

const ControlPoint = props => (
    <DragControl delta={(x,y)=>props.onChange(props.x+x, props.y+y)} capture>
        <circle className="circle" cx={props.x} cy={props.y} r="8"/>
    </DragControl>
);
            
export default App;
