import React from 'react';
import LeftPanel from '../panels/LeftPanel';
import RightPanel from '../panels/RightPanel';
import MainPanel from '../panels/MainPanel';

const MainLayout=()=>{
    return(
        <div className="td-main-layout">
            <LeftPanel/>
            <MainPanel/>
            <RightPanel/>
        </div>
    );

}

export default MainLayout;