import React from 'react';
const backdropStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0,
  zIndex: 'auto',
  backgroundColor: '#FFF',
  opacity: 0.1
};
function BackDrop({clickHide}){
    return (<div style={backdropStyle} onClick={clickHide}/>);
}
export default BackDrop;