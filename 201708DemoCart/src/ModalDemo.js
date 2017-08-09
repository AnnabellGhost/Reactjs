import React from 'react';

class ModalDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visibility:true,
        }
    }
    render(){
        let {innerComponent}=this.props;
        return(
            <div className='basicModal_container'>
                <div className='basicModal_wrapper'>
                    {innerComponent}
                    {this.props.children}
                </div>
            </div>
        );
    }
}
/* function ModalWrapper(wrapped){
    return 
} */
export default ModalDemo;