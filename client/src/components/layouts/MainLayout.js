import React from 'react';
import LeftPanel from '../panels/LeftPanel';
import RightPanel from '../panels/RightPanel';
import MainPanel from '../panels/MainPanel';

const MainLayout=()=>{
    return(
        <>
        <LeftPanel/>
        <MainPanel/>
        <RightPanel/>
        </>
    );

}

export default MainLayout;