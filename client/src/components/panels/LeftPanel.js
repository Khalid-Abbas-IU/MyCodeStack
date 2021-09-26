import React, {useState} from 'react';

const LeftPanel = () => {

 const   [isModalOpen,setModal] = useState(false);
 const openLeftSection = () =>{
        setModal(!isModalOpen);
    }

    return(
        <div className={`td-left-panel td-center-element ${isModalOpen ? 'show-modal' :''}`}>
                <button className="open-cta" onClick={openLeftSection}>
                    <img src="images/right.svg"/>
                </button>
            <div className="content-wrapper">
                <button className="cta-button">
                    <img src = "images/text.svg"/>
                </button>
            </div>
        </div>
    )
}

export default LeftPanel;