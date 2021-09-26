import React from 'react';
import Header from './components/Header';
import MainLayout from './components/layouts/MainLayout';
import './App.css';
import { connect } from 'react-redux';

const App = (props) => {
    return(
        <div className="td-app-container">
            <Header userName={props.userName}/>
           <MainLayout/>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return{
    userName:state.userName
    }
}
export default connect(mapStateToProps)(App);