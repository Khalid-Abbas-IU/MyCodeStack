import React from 'react';

const Header = () => {
    return(
        <div className="td-header">
          <div className="td-center-element td-wrapper-conatiner">
            <img src="./images/temp-logo.svg" height="40px"/>
            <span style={{fontWeight:'bold',color:'green'}}>TEXT DESIGNER</span>
            <div className="td-center-element">
              <img src="./images/avator.jpg" height="34px"/>
              <span style={{marginLeft:'7px'}}>Abbas</span>
            </div>
          </div>
        </div>
    )
}
export default Header;