import React from "react";

const initialState={
    userName:'Khalid'
}

const Reducer = (state=initialState, action) =>{
    switch (action.type){
        case 'CHANGE_NAME':
            const tempState = [...state]
            tempState.userName="Abbas";
            return tempState;
            
    }
    return state;  
}
export default Reducer;