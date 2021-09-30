import React, {useState} from 'react';
import {fabric} from "fabric";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const LeftPanel = (props) => {

 const   [isModalOpen,setModal] = useState(false);

    const openLeftSection = ()=>{
        setModal(!isModalOpen);
    }

    const addTextOnCanvas = () => {
        let {canvas} = props;
        let text = new fabric.IText('3 Broke Programmers', {
            top: canvas.height / 2 - 100,
            left: canvas.width / 2 - 160,
            width: 200,
            height: 200,
            padding: 0,
            fontSize: 40,
            custom: {
                type: 'NameText',
                angle: 180,
                align: 'center',
                radius: 0,
                effect: 'up',    //up , down , horizontal
                pattern: false,
                background: true,
                backgroundColor: 'white',
                backgroundRadius: 25,
                backgroundStrokeWidth: 40,
                stacking: true,
                // id: uuid(),
                variants: ['regular'],

            }
        });
        text.setSelectionStyles({fill: '#000', fontSize: text.fontSize}, 0, text.text.length);
        let lastHeight = text.calcTextHeight();
        text.set({lastHeight});

        canvas.add(text).setActiveObject(text).renderAll();
        props.setActiveObject(text);
    }

    return(
        <div className={`td-left-panel td-center-element ${isModalOpen ? 'show-modal' :''}`}>
                <button className="open-cta" onClick={openLeftSection}>
                    <img src="images/right.svg"/>
                </button>
            <div className="content-wrapper">
                <button className="cta-button" onClick={addTextOnCanvas}>
                    <img src = "images/text.svg"/>
                </button>
            </div>
        </div>
    )

}
const mapStateToProps =(state)=>{
    return{
        canvas:state.canvas,
        activeObject:state.activeObject
    }
}
const setActiveObject = (activeObject) =>{
    return{
        type:'OBJECT_SELECTION',
        object: activeObject
    };
}
const mapDispatchToProps =(dispath)=>{
    return bindActionCreators(
        {
        setActiveObject,
    },
        dispath
    );

}

export default connect(mapStateToProps,mapDispatchToProps)(LeftPanel);