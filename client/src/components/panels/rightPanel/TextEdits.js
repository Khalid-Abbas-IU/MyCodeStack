import React, {Component, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
class TextEdits extends Component{
    constructor(props) {
        super(props);
        this.state={
            minHorizontalPos:0,
            currentHorPos:0,
            maxHorizontalPos:0,
            minVarPos:0,
            currentVarPos:0,
            maxVarPos:0,
            tab:1,
        }
    }
    componentDidMount() {
        const {canvas,activeObject}=this.props;
        if (canvas && activeObject){
            console.log("recieving props")
            let maxHorizontalPos=canvas.width - activeObject.getBoundingRect().width,
                minHorizontalPos=0,
                currentHorPos=activeObject.getBoundingRect().left,
                maxVarPos=canvas.height - activeObject.getBoundingRect().height,
                currentVarPos=activeObject.getBoundingRect().top,
                minVarPos=0;
            this.setState({
                maxHorizontalPos,
                minHorizontalPos,
                currentHorPos,
                minVarPos,
                currentVarPos,
                maxVarPos

            });
        }
    }

    handleHorizontalPosition =(e)=>{
        let {activeObject,canvas}=this.props;
        const position=parseInt(e.target.value);
        this.setState({currentHorPos:position})
        console.log("position",position)
        let left=position;
        let top=activeObject.getBoundingRect().top;
        activeObject.set({
            top,
            left
        })
        canvas.renderAll();

    }

    handleVarticalPosition =(e)=>{
        let {activeObject,canvas}=this.props;
        const position=parseInt(e.target.value);
        this.setState({currentVarPos:position})
        let top=position;
        let left=activeObject.getBoundingRect().left;
        activeObject.set({
            top,
            left
        })
        canvas.renderAll();

    }
    render() {
        const {tab,minHorizontalPos,currentHorPos,maxHorizontalPos,minVarPos,currentVarPos,maxVarPos}=this.state;
        return(
            <div className='td-text-edits'>
                <div className='td-rp-te-info-top'>
                    <h1>Text Styles</h1>
                    <div className='te-tabs'>
                        <div className={`td-rp-te-tabs ${tab===1&&'te-tabs-selected'}`} onClick={()=>this.setState({tab:1})}>Position</div>
                        <div className={`td-rp-te-tabs ${tab===2&&'te-tabs-selected'}`}  onClick={()=>this.setState({tab:2})}>Style</div>
                    </div>
                </div>
                {
                    tab==1?
                        <div id='te-positions-tab'>
                            <div className='te-position-align-bar'>
                                <button id='align-left-btn'>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGFAjDtDNQAGjcUAQjOaDgQej+WDgwWg+GAEAAKBZBRB/eva4AAAAAElFTkSuQmCC"/>
                                </button>
                                <button id='align-center-btn'>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAARklEQVRIie3UMQoAIAxD0eD9b9WD1clFt9IWxf+gcyiESPiRSfLksz1kFD+xeFMOYiJlO8q0qyoXZboby4U2LBfSsFx42wQrX2BQuSa57gAAAABJRU5ErkJggg=="/>                        </button>
                                <button id='align-right-btn'>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>
                                </button>
                            </div>
                            <div className='text-position-slider'>
                                <div>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAYUlEQVRIie2QMQ6AMAzEXHg0I7DxLBbexFimokoQIOmGzlK31I4CQgiLKfBn8chzIJC/RIo8GniM1PLWd0a6KrAHtrYwXQPtJxrfBkskErjI+5vBDUjA6gwkYPbvJcT/OQBgQifqdizt5QAAAABJRU5ErkJggg=="/>
                                </div>
                                <input type='range' value={currentHorPos} min={minHorizontalPos} max={maxHorizontalPos} onChange={this.handleHorizontalPosition}/>
                                <input type='number' value={currentHorPos} min={minHorizontalPos} max={maxHorizontalPos} onChange={this.handleHorizontalPosition}/>
                            </div>
                            <div className='text-position-slider'>
                                <div>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAXklEQVRIiWNgGGmggYGBoYOWhv+HYqpbgmw41S3BZjjNfAIzmGjARG0XjFowasGoBSPVgnIGzDIIxq+nlkOQLaG64dgsIdpwZhIsOMrAwMDIwMBwkIGBoZEkpw1pAAAmKyEODDXmrgAAAABJRU5ErkJggg=="/>
                                </div>
                                <input type='range' value={currentVarPos} min={minVarPos} max={maxVarPos} onChange={this.handleVarticalPosition}/>
                                <input type='number' value={currentVarPos} min={minVarPos} max={maxVarPos} onChange={this.handleVarticalPosition}/>
                            </div>
                        </div>
                        :
                        <div id='te-styles-tab'>Styles</div>
                }


            </div>
        );
    }


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
const mapDispatchToProps =(dispatch)=>{
    return bindActionCreators(
        {
            setActiveObject,
        },
        dispatch
    );

}

export default connect(mapStateToProps,mapDispatchToProps)(TextEdits);