import React from 'react';
import Header from './components/Header';
import MainLayout from './components/layouts/MainLayout';
import './App.css';

const App = () => {
    return(
        <div className="td-app-container">
            <Header/>
           <MainLayout/>
        </div>
    )
}
export default App;