import React,{useState} from 'react';
const TextEdits = () => {
    const [tab , setTab]=useState(1);


    const handleHorizontalPos = (position) =>{
        console.log("position",position.target.value)
    }

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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGFAjDtDNQAGjcUAQjOaDgQej+WDgwWg+GAEAAKBZBRB/eva4AAAAAElFTkSuQmCC"/>                        </button>
                        <button id='align-right-btn'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>
                        </button>
                        <button id='align-center-btn'>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAARklEQVRIie3UMQoAIAxD0eD9b9WD1clFt9IWxf+gcyiESPiRSfLksz1kFD+xeFMOYiJlO8q0qyoXZboby4U2LBfSsFx42wQrX2BQuSa57gAAAABJRU5ErkJggg=="/>                        </button>
                        <button id='align-top-btn'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>    
                        </button>
                        <button id='align-bottom-btn'>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAM0lEQVRIiWNgGAUEACMa/z+1zWWikoHDGKDHATZATryMxgHxYDQfDDwYzQcDD0bzwQgAAHhZBRCGXoKDAAAAAElFTkSuQmCC"/>
                        </button>
                    </div>
                    <div className='text-position-slider'>
                        <div>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAYUlEQVRIie2QMQ6AMAzEXHg0I7DxLBbexFimokoQIOmGzlK31I4CQgiLKfBn8chzIJC/RIo8GniM1PLWd0a6KrAHtrYwXQPtJxrfBkskErjI+5vBDUjA6gwkYPbvJcT/OQBgQifqdizt5QAAAABJRU5ErkJggg=="/>
                        </div>
                        <input type='range' min='1' max='100' defaultValue='50'></input>
                        <input type='number' min='1' max='100' defaultValue='50'/>
                    </div>
                    <div className='text-position-slider'>
                        <div>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAXklEQVRIiWNgGGmggYGBoYOWhv+HYqpbgmw41S3BZjjNfAIzmGjARG0XjFowasGoBSPVgnIGzDIIxq+nlkOQLaG64dgsIdpwZhIsOMrAwMDIwMBwkIGBoZEkpw1pAAAmKyEODDXmrgAAAABJRU5ErkJggg=="/>
                        </div>
                        <input type='range' min='1' max='100' defaultValue='50'/>
                        <input type='number' min='1' max='100' defaultValue='50'/>
                    </div>
                </div>
                :
                <div id='te-styles-tab'>Styles</div>
            }
            
            
        </div>
    );
}

export default TextEdits;