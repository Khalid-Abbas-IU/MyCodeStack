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
        this.initCanvas();
    }

    initCanvas = () => {
        this.canvas = new fabric.Canvas('canvas', {
            height:600,
            width:1000,
            backgroundColor:"#fff",
            selection: true,
            preserveObjectStacking: true,
        });
        window.canvas = this.canvas;
        this.props.setCanvas(this.canvas);
        this.canvas.on({
            // 'object:modified':this.onObjectSelected,
            // 'object:selected':this.onObjectSelected,
            // 'object:removed':this.onObjectSelected,
            'object:added':this.onObjectSelected,
            // 'object:scaled':this.onObjectSelected,
            'object:moved': this.onObjectMoved,
            'object:rotated': this.onObjectRotated,
            // 'object:scaling':this.onObjectSelected,
            'selection:created': this.onObjectSelected,
            // 'mouse:up:before': this.onObjectSelected,
            // 'selection:updated':this.onObjectSelected,
            'selection:cleared':this.objectSelectionCleared,
            // 'mouse:up': this.onObjectSelected,
            // 'object:moving': this.onObjectSelected,
            // 'after:render':this.onObjectSelected,
        })
    }

    onObjectSelected = (e) =>{
        console.log("onObjectSelected");
        if(e.target.type === 'activeSelection') return;
        this.props.setActiveObject(e.target);

    }
    onObjectMoved = (e) =>{
        setTimeout(()=>{
            this.props.setActiveObject(e.target);

        },200)
    }
    onObjectRotated = (e) =>{
        setTimeout(()=>{
            this.props.setActiveObject(e.target);

        },200)
    }

    objectSelectionCleared=(e)=>{
        console.log("objectSelectionCleared")
        this.props.setActiveObject(null);
    }

    objectAdded=(e)=>{
        console.log("object added")
        let obj= e.target;
        obj.setControlsVisibility({
                                      bl: true,
                                      br: true,
                                      mb: false,
                                      ml: false,
                                      mr: false,
                                      mt: false,
                                      mtr: true,
                                      tl: true,
                                      tr: true,
                                  });
        this.props.setActiveObject(obj);
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