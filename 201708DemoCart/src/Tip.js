import React from 'react';
import BackDrop from './BackDrop.js';
import './tip.css';
class Tip extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showTip:false,
        };
        this.handleClick=this.handleClick.bind(this);        
        this.handleBackgroundClick=this.handleBackgroundClick.bind(this);

    }
    handleClick(){
        console.log(this.state.showTip);
        this.setState({showTip:!this.state.showTip});
    }
    handleBackgroundClick(){
        this.setState({showTip:false});
    }
    render(){
        return(
            <div className='tip_container'>
                <b className='tip_icon' onClick={this.handleClick} >!</b>
                {this.state.showTip?
                    <div className='tip_message'>
                        {this.props.tipText}
                        <BackDrop clickHide={this.handleBackgroundClick}/>
                    </div>
                    :
                    null
                }
                

            </div>
        );
    }
}
export default Tip;