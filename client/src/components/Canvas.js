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
            height:500,
            width:900,
            backgroundColor:"#fff",
            selection: true,
            preserveObjectStacking: true,
        });
        window.canvas = this.canvas;
        this.props.setCanvas(this.canvas);
        let textBox = new fabric.Textbox('Text Designer', {
            left: 50,
            top: 50,
            width: 120,
            fontSize: 20
        });
        this.canvas.add(textBox).setActiveObject(textBox);
        this.canvas.on({
            'object:selected':this.onObjectSelected,
            'selection:cleared':this.objectSelectionCleared,
        })
    }

    onObjectSelected = (e) =>{
        console.log("e.target.type :",e);
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