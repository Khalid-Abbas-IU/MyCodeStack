import React,{Component} from 'react';
import Canvas from '../Canvas';
import { connect } from 'react-redux';

class MainPanel extends Component{
  
  render(){
    return(
        <div className="td-main-panel td-center-element">
          <Canvas/>
            <button onClick={()=>this.props.canvas.undo()}>Undo</button>
        </div>
    )
}
}
const mapStateToProps =(state)=>{
  return{
    canvas:state.canvas,
    activeObject:state.activeObject
  }
}
export default connect(mapStateToProps)(MainPanel);




