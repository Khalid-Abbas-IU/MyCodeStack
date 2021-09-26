import React, {Component, useEffect, useState} from 'react';
import LeftPanel from '../panels/LeftPanel';
import RightPanel from '../panels/RightPanel';
import MainPanel from '../panels/MainPanel';
import {connect} from "react-redux";

class MainLayout extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const {activeObject}=this.props;
        return(
            <div className="td-main-layout">
                <LeftPanel/>
                <MainPanel/>
                {
                    activeObject && <RightPanel/>
                }
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        canvas:state.canvas,
        activeObject:state.activeObject
    }
}

export default connect(mapStateToProps,null)(MainLayout);