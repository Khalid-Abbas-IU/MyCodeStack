import React, {Component} from "react";
import {fabric} from "fabric";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasSize: {
                height: 600,
                width: 800,
            },
            backgroundColor: '#fff',
            container:{containerMoving:false,position:[]},
            object:{isMoving:false, position:[]}
        }
    }
    componentDidMount(){
        let canvas = new fabric.Canvas('canvas',{
            height:500,
            width:900,
            backgroundColor:"#fff",
            selection: true
        })
        window.canvas = canvas;
        this.props.setCanvas(canvas);
        canvas.on({
            // 'object:modified':this.canvasEvents.onObjectModified,
            'object:selected':this.onObjectSelected,
            // 'object:removed':this.canvasEvents.objectRemoved,
            // 'object:added':this.canvasEvents.objectAdded,
            // 'object:scaled':this.onObjectScaled,
            // 'object:moved': this.canvasEvents.onObjectMoved,
            // 'object:scaling':this.onObjectScaling,
            // 'selection:created': this.onObjectSelected,
            // 'mouse:up:before': this.canvasEvents.onMouseUp,
            // 'selection:updated':this.objectSelectionUpdated,
            'selection:cleared':this.objectSelectionCleared,
            // 'mouse:up': this.onMouseUp,
            // 'object:moving': this.selectMovingObject,
            // 'text:changed':this.canvasEvents.textUpdated,
            // 'after:render':this.canvasEvents.afterRender,
        })

        let rect = new fabric.Rect({
            top : 100,
            left : 100,
            width : 60,
            height : 70,
            fill : 'blue'
        });
        var textbox = new fabric.Textbox('Text Designer', {
            left: 50,
            top: 50,
            width: 120,
            fontSize: 20
          });
          canvas.add(textbox).setActiveObject(textbox);

        canvas.add(rect);
    }

    onObjectSelected = (e) =>{
        console.log("e.target.type :",e.target.type);
        if(e.target.type === 'activeSelection') return;
        this.props.setActiveObject(e.target);

    }

    objectSelectionCleared=(e)=>{
        this.props.setActiveObject(null);
    }

    

    render() {
        return (
            <div className='td-canvas-wrapper'>
                <canvas id="canvas" style={{border:'1px solid #ECEEF0'}} />
            </div>
        );

    }
}
const setCanvas =(canvas) =>{
    return {
        type:'SET_CANVAS',
        canvas,
    }
}

const setActiveObject = (activeObject) =>{
    return{
        type:'OBJECT_SELECTION',
        object: activeObject
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setCanvas,
            setActiveObject,
        },
        dispatch
    );
};
const CanvasConnect = connect(
    null,
    mapDispatchToProps
)(Canvas);

export default CanvasConnect;