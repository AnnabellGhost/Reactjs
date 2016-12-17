import React from 'react';
import ReactDOM from 'react-dom';
class Application extends React.Component {

  constructor() {
    super()
    this._handleClick = this._handleClick.bind(this)
    this._handleDivClick = this._handleDivClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this._handleBodyClick,false);
    //不实现事件捕获 false
  }
  
  componentWillUnmount() {
     document.removeEventListener('click', this._handleBodyClick)
  }
  
  _handleBodyClick(e) {
    // if(e.target&&e.target.matches('#btnElem')){return;}
    // if(e.target&&e.target.matches('#divElem')){return;}
    console.log('body clicked!')
    
  }
  
  _handleClick(e) {
 
    console.log("button clicked!")
    // e.preventDefault();    
    //preventDefault()是阻止浏览器执行当前dom绑定的默认事件 而这里react是有自己的合成事件委托机制
    //仅对最外层容器绑定 依赖冒泡机制完成委托 事件没有绑定到当前的dom元素上 
    e.stopPropagation();//阻止了合成事件冒泡即div
    e.nativeEvent.stopImmediatePropagation();
    //e.nativeEvent.stopImmediatePropagation()这个是在混用原生react合成事件时阻止冒泡到原生事件的
  }

  _handleDivClick(e) {
    console.log("div clicked!")
    e.nativeEvent.stopImmediatePropagation();
    // e.stopPropagation()
    //阻止其他dom节点上的该react合成事件被激活
    
  }

  render() {
    return (
      <div id="divElem" onClick={this._handleDivClick} style={{'width':100 ,'height':100,'backgroundColor':'grey'}}>
        <button id="btnElem" onClick={this._handleClick}>Click me!</button>
        
      </div>
    )
  }
  
}

ReactDOM.render(<Application />, document.getElementById("container"));





