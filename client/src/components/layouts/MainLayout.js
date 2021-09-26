import React, {useEffect, useState} from 'react';
import LeftPanel from '../panels/LeftPanel';
import RightPanel from '../panels/RightPanel';
import MainPanel from '../panels/MainPanel';
import {connect} from "react-redux";

const MainLayout=(props)=>{
    const [activeObject, setActiveObject]=useState(false)

    useEffect(()=>{
        if (props.canvas && props.canvas.getActiveObject()){
            console.log("props.canvas.getActiveObject()",props.canvas.getActiveObject())
            setActiveObject(true)
        }

    },[])


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
const mapStateToProps = (state) =>{
    return{
        canvas:state.canvas
    }
}

export default connect(mapStateToProps,null)(MainLayout);