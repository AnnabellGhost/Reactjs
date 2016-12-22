import React from 'react';
import ReactDOM from 'react-dom';
import style from './base.css';
// import blogStyle from './container.css';
// import { immutableRenderDecorator } from 'react-immutable-render-mixin';
// @immutableRenderDecorator
import Container from './container.js';
ReactDOM.render(
	<Container/>,
	document.getElementById('container')
	);

