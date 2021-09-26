import React from "react";

const initialState={
    userName:'Khalid',
    canvas:null,
    activeObject:null

}

const Reducer = (state=initialState, action) =>{
    switch (action.type){
        case 'CHANGE_NAME':
            return {
                ...state,
                userName:action.userName
            }
        case 'SET_CANVAS':
            console.log(action.canvas.height,action.canvas.width,'%in util',"font-weight:bold")
            return {
                ...state,
                canvas:action.canvas
            }
        case 'OBJECT_SELECTION':
            return {
                ...state,
                activeObject:action.activeObject
            }
            
    }
    return state;  
}
export default Reducer;