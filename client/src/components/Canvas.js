import React, {Component} from "react";
import {fabric} from "fabric";

class Canvas extends Component {
    constructor() {
        super();
        this.state = {
            canvasSize: {
                height: 600,
                width: 800,
            },
            backgroundColor: '#fff',
            container:{containerMoving:false,position:[]},
            object:{isMoving:false, position:[]}
        }
        this.containerPosition = {top:null,left:null,bottom:null,right:null};
    }
    componentDidMount(){
        let canvas = new fabric.Canvas('canvas',{
            height:500,
            width:900,
            backgroundColor:"#fff"
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
    

    render() {
        return (
            <div className='td-canvas-wrapper'>
                <canvas id="canvas" style={{border:'1px solid #ECEEF0'}} />
            </div>
        );

    }
}

export default Canvas;