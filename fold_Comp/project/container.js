import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import blogStyle from './container.css';

class Container extends React.Component{
	constructor(props){
		super(props);
		this.state={fold:false};
		this.handleClick=this.handleClick.bind(this);
	}
	handleClick(){
		this.setState({fold:!this.state.fold});
	}
	render(){
		const content_classes=classNames({comp_container:true,fold:this.state.fold});
		const btn_classes=classNames({icon_enlarge2:!this.state.fold,icon_shrink2:this.state.fold});
		// console.log(comp_container_classes);
		return(	
			<div styleName='container'>
			    <li styleName='btn' onClick={this.handleClick}><i styleName={btn_classes}></i></li>
				<div styleName={content_classes}></div>
			</div>
			);
	}
}
export default CSSModules(Container,blogStyle,{allowMultiple:true});

