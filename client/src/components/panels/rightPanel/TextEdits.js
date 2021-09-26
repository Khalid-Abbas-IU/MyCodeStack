import React,{useState} from 'react';
const TextEdits = () => {
    const [tab , setTab]=useState(1);
    return(
        <div className='td-text-edits'>
            <div className='td-rp-te-info-top'>
                <h1>Text Styles</h1>
                <div className='te-tabs'>
                <div className={`td-rp-te-tabs ${tab===1&&'te-tabs-selected'}`} onClick={()=>setTab(1)}>Position</div>
                <div className={`td-rp-te-tabs ${tab===2&&'te-tabs-selected'}`} onClick={()=>setTab(2)}>Style</div>
                </div>
            </div>
            {
                tab==1?
                <div id='te-positions-tab'>
                    <div className='te-position-align-bar'>
                        <button id='align-left-btn'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>
                        </button>
                        <button id='align-right-btn'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>
                        </button>
                        <button id='align-center-btn'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>
                        </button>
                        <button id='align-top-btn'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>    
                        </button>
                        <button id='align-bottom-btn'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>
                        </button>
                    </div>
                    <div className='text-position-slider'>
                        <div>Horizontal</div>
                        <input type='range' min='1' max='100' defaultValue='50'></input>
                    </div>
                </div>
                :
                <div id='te-styles-tab'>Styles</div>
            }
            
            
        </div>
    );
}

export default TextEdits;