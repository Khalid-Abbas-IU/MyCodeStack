import React, {Component, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import axios from "axios";
import WebFont from 'webfontloader';

import {Colors,Palettes} from '../../assets/Colors'

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
            currentAngle:0,
            tab:1,
            styleTab:1,
            isButtonleft:false,
            fontsCollection:[],
            selectedFonts:[],
            reservedFonts:[],
            isModalOpen:false,
        }
    }
    // static getDerivedStateFromProps = (nextProps, prevState) =>{
    //     if (nextProps.activeObject !== prevState.activeObject)
    //         console.log("active object changed")
    //         return {
    //             activeObject:nextProps.activeObject,
    //         }
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.activeObject) {
    //         console.log("objectModified")
    //     }
    // }

    componentDidMount() {
        let {canvas,activeObject}=this.props;
        console.log("did")
        if (canvas && activeObject){
            this.subscribeEvents(canvas);
            console.log("recieving props")
            let maxHorizontalPos = canvas.width - activeObject.getBoundingRect().width,
                minHorizontalPos=0,
                currentHorPos=activeObject.getBoundingRect().left,
                maxVarPos=canvas.height - activeObject.getBoundingRect().height,
                currentVarPos=activeObject.getBoundingRect().top,
                currentAngle=activeObject.angle,
                minVarPos=0;

            let stateObject = {
                maxHorizontalPos,
                minHorizontalPos,
                currentHorPos,
                minVarPos,
                currentVarPos,
                currentAngle,
                maxVarPos,
            }
        }
        this.getGoogleFonts();

        this.props.activeObject.left = 0 ? this.isButtonleft=true : this.isButtonleft = false;



    }

    getSelectedFontValue = ()=>{
        const {canvas} = this.props;
    }

    updatePosition = (activeObject) => {
        this.setState({
            currentVarPos:activeObject.getBoundingRect().left.toFixed(0),
            currentHorPos:activeObject.getBoundingRect().top.toFixed(0)
        });
    }
    webFontLoader=(fonts,callback)=>{
        WebFont.load({
            google: {
                families: fonts,
            },
            active:callback


        });
    }

    getGoogleFonts = ()=>{
        axios.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDnh3KgJslEdxA2BEckJ6NUedZs7t883Wk').then(
            (response) => {
                let {items} = response.data;
                const fontsCollection=items,
                    selectedFonts=items.slice(0,10);
                items.splice(0,10);
                this.setState({fontsCollection,reservedFonts:items});
                const filtered = selectedFonts.map((font)=>font.family).map((font)=>font+":400")
                this.webFontLoader(filtered,()=>{
                    this.setState({selectedFonts});
                })
            });
    }

    toggleDropdown = () => {
        this.setState({isModalOpen:!this.state.isModalOpen});
    }

    generatedFontsHandler =(e)=> {
        const {clientHeight, scrollHeight, scrollTop} = e.target;
        let reservedFonts = [...this.state.reservedFonts];
        if ((scrollHeight - scrollTop) <= clientHeight) {
            if (reservedFonts.length > 10) {
                let selectedFonts = reservedFonts.slice(0, 10);
                reservedFonts.splice(0, 10)
                this.setState({reservedFonts});
                const filtered = selectedFonts.map((font) => font.family).map((font) => font + ":400")
                this.webFontLoader(filtered, () => {
                    this.setState({selectedFonts: [...this.state.selectedFonts, ...selectedFonts]});
                })

            } else {
                let reservedFonts = [...this.state.reservedFonts];
                const filtered = reservedFonts.map((font) => font.family).map((font) => font + ":400")
                this.webFontLoader(filtered, () => {
                    this.setState({selectedFonts: [...this.state.selectedFonts, ...reservedFonts], reservedFonts: []});
                    this.setState({});


                })

            }

        }
    }
    updateAngle = (activeObject) => {
        this.setState({
            currentAngle:activeObject.angle.toFixed(0)
        });
    }

    subscribeEvents = (canvas) => {
        canvas.on('object:moved', this.onObjectMoved);
        canvas.on('object:rotating', this.onObjectRotating);
    }

    onObjectMoved = () => {
        const {canvas}=this.props;
        let activeObject = canvas.getActiveObject();
        this.updatePosition(activeObject);
    }

    onObjectRotating = () => {
        const {canvas}=this.props;
        let activeObject = canvas.getActiveObject();
        this.updateAngle(activeObject);
        this.updatePosition(activeObject);
    }


    handleHorizontalPosition =(e)=>{
        let {activeObject,canvas}=this.props;
        const position=parseInt(e.target.value);
        this.setState({currentHorPos:position})
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
    changeObjectColor =(color)=>{
        const {canvas} = this.props;
        let activeObject = canvas.getActiveObject();
        if (activeObject.type === "i-text"){
            activeObject.dirty=true;
            const {styles} = activeObject;
            for (let styleIndex in styles) {
                for (let selectionTextStyleIndex in styles[styleIndex]) {
                    let TextStyleItem = styles[styleIndex][selectionTextStyleIndex];
                    if (TextStyleItem.hasOwnProperty('fill')) {
                        TextStyleItem.fill = color;
                        canvas.renderAll();
                    }
                }
            }
            canvas.renderAll();
        }

    }

    handleRotation = (e) => {
        let {activeObject,canvas}=this.props;
        const position=parseInt(e.target.value);
        this.setState({currentAngle:position})
        let angle=position;
        // let bound=activeObject.getBoundingRect(true,true);
        activeObject.setPositionByOrigin()
        activeObject.set({
            originX: 'center',
            originY: 'center',
            angle
        });
        canvas.renderAll()
    }


    handleFontFamilyChange = (recFamily)=>{
        let {canvas}=this.props;
        canvas.getActiveObject().fontFamily =  recFamily;
        canvas.renderAll();
    }



    alignTextLeft = () =>{
        let canvasObj = this.props.canvas;
        let active0bj = this.props.activeObject;
        active0bj.left = 0;
        canvasObj.renderAll();
    }

    alignTextRight = () =>{
        let canvasObj = this.props.canvas;
        let active0bj = this.props.activeObject;
        active0bj.left = canvasObj.width - active0bj.width ;
        canvasObj.renderAll();
    }

    alignTextCenter=()=>{
        let canvasObj = this.props.canvas;
        let active0bj = this.props.activeObject;
        active0bj.left = canvasObj.width/2 - active0bj.width/2 ;
        canvasObj.renderAll();
    }

    render() {
        const {tab,minHorizontalPos,currentHorPos,maxHorizontalPos,minVarPos,currentVarPos,maxVarPos,currentAngle,isButtonleft,isModalOpen}=this.state;
        return(
            <div className='td-text-edits'>
                <div className='td-rp-te-info-top'>
                    <h3 className="td-center-element mt-10">Properties</h3>
                    <div className='te-tabs'>
                        <div className={`td-rp-te-tabs ${tab===1&&'te-tabs-selected'}`} onClick={()=>this.setState({tab:1})}>Position</div>
                        <div className={`td-rp-te-tabs ${tab===2&&'te-tabs-selected'}`}  onClick={()=>this.setState({tab:2})}>Style</div>
                    </div>
                </div>
                {
                    tab == 1 ?
                        <div id='te-positions-tab'>
                            <div className='te-position-align-bar'>
                                <button id='align-left-btn'
                                        className={isButtonleft ? 'bg-dark' : 'bg-white'} onClick={this.alignTextLeft}>
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGFAjDtDNQAGjcUAQjOaDgQej+WDgwWg+GAEAAKBZBRB/eva4AAAAAElFTkSuQmCC"/>
                                </button>
                                <button id='align-center-btn' onClick={this.alignTextCenter}>
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAARklEQVRIie3UMQoAIAxD0eD9b9WD1clFt9IWxf+gcyiESPiRSfLksz1kFD+xeFMOYiJlO8q0qyoXZboby4U2LBfSsFx42wQrX2BQuSa57gAAAABJRU5ErkJggg=="/>
                                </button>
                                <button id='align-right-btn' onClick={this.alignTextRight}>
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>
                                </button>
                            </div>
                            <div className='text-position-slider'>
                                <div>
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAYUlEQVRIie2QMQ6AMAzEXHg0I7DxLBbexFimokoQIOmGzlK31I4CQgiLKfBn8chzIJC/RIo8GniM1PLWd0a6KrAHtrYwXQPtJxrfBkskErjI+5vBDUjA6gwkYPbvJcT/OQBgQifqdizt5QAAAABJRU5ErkJggg=="/>
                                </div>
                                <input type='range' value={currentHorPos} min={minHorizontalPos} max={maxHorizontalPos}
                                       onChange={this.handleHorizontalPosition}/>
                                <input type='number' value={currentHorPos} min={minHorizontalPos} max={maxHorizontalPos}
                                       onChange={this.handleHorizontalPosition}/>
                            </div>
                            <div className='text-position-slider'>
                                <div>
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAXklEQVRIiWNgGGmggYGBoYOWhv+HYqpbgmw41S3BZjjNfAIzmGjARG0XjFowasGoBSPVgnIGzDIIxq+nlkOQLaG64dgsIdpwZhIsOMrAwMDIwMBwkIGBoZEkpw1pAAAmKyEODDXmrgAAAABJRU5ErkJggg=="/>
                                </div>
                                <input type='range' value={currentVarPos} min={minVarPos} max={maxVarPos}
                                       onChange={this.handleVarticalPosition}/>
                                <input type='number' value={currentVarPos} min={minVarPos} max={maxVarPos}
                                       onChange={this.handleVarticalPosition}/>
                            </div>


                        </div>
                        :
                        <div id='te-styles-tab'>
                            <div className="d-flex space-btw">
                                <div className="color-tab mr-1" style={this.state.styleTab === 1 ? {
                                    background: ' #eceaea',
                                    color: 'orangered'
                                } : {}} onClick={() => this.setState({styleTab: 1})}>Colors
                                </div>
                                <div className="fonts-tab mr-1" style={this.state.styleTab === 2 ? {
                                    background: ' #eceaea',
                                    color: 'orangered'
                                } : {}} onClick={() => this.setState({styleTab: 3})}>Fonts
                                </div>
                                <div className="palette-tab mr-1" style={this.state.styleTab === 2 ? {
                                    background: ' #eceaea',
                                    color: 'orangered'
                                } : {}} onClick={() => this.setState({styleTab: 2})}>Palette
                                </div>
                            </div>
                            {
                                this.state.styleTab === 1 &&
                                <div style={{marginTop: "20px"}}>
                                    {
                                        Colors.map((color, index) => {
                                            return (
                                                <div style={{marginLeft: "41px", marginTop: '10px'}} key={index}>
                                                    <h3 className="color-item" style={{
                                                        color: color.code,
                                                    }}
                                                        onClick={() => this.changeObjectColor(color.code)}>3 BROKE
                                                        ENGINNERS</h3>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            }
                            {
                                this.state.styleTab === 2 &&
                                <div style={{marginTop: "20px"}}>
                                    {
                                        Palettes.map((palette, index) => {
                                            return <div className="color-palette-group">
                                                {
                                                    palette.codes.map((color) => {
                                                        return (
                                                            <div
                                                                style={{
                                                                    background: color,
                                                                    width: '40px',
                                                                    height: '40px',
                                                                }}
                                                                onClick={() => this.changeObjectColor(color)}
                                                            ></div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        })

                                    }

                                </div>

                            }
                            {
                                this.state.styleTab === 3 &&
                                <div className="font-family-wrapper">
                                    <div className="font-family-input-wrapper" onClick={this.toggleDropdown}>
                                        <input type="text" placeholder="Select Font" value={this.props.canvas.getActiveObject().fontFamily}/>
                                        <span className="chevron"></span>
                                    </div>
                                    <ul className={`drop-down-list ${isModalOpen ? 'd-block' : 'd-none'}`}
                                        onScroll={this.generatedFontsHandler}>
                                        {this.state.selectedFonts.map(list =>
                                            <li onClick={() => this.handleFontFamilyChange(list.family)}
                                                style={{fontFamily: `${list.family}`}}
                                                key={list.index}>{list.family}</li>)
                                        }
                                    </ul>


                                </div>
                            }


                        </div>
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