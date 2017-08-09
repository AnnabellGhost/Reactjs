/*Created by Zhang Xingping on 20170507*/
/*when input[Number] receive a decimal right after legal number inputs it wont re-render
and if your inputs is illegal then the e.target.value will immediately be empty String */
import React from 'react';
import './DumbInput.css'
class DumbInput extends React.Component{
    
    shouldComponentUpdate(nextProps,nextState){
        let shouldNotUpdate=false;
        if(nextProps.content==this.props.content && nextProps.showError==this.props.showError){
            if(this.props.isFocused==false||this.props.isFocused==true){
                if(nextProps.isFocused==this.props.isFocused){
                    shouldNotUpdate=true;
                }
            }else{
                shouldNotUpdate=true;
            }
        }
        /*window.console?console.log("should "+this.props.name+" update?" +!shouldNotUpdate):null;*/
        return shouldNotUpdate?false:true;
    }
    render(){
        /*console.warn("Re-Render Input");
        console.warn(this.props.showError);
        console.log('placeHolderHack'+this.props.placeHolderHack);*/
        let {
            cusClassName    ='default',
            name            ='default',
            inputType       ='text',
            content         ='',
            isFocused       =false,
            inputRef        ='default',
            controlFunc     =()=>{},
            controlBlur     =()=>{},
            controlFocus    =()=>{},
            controlClick    =()=>{},
            readOnly        =false,
            disabled        =null,
            showError       =false,
            errorText       =undefined,
            onClearInput    =()=>{},
            onMaskClick     =undefined,/* should be function */
            }=this.props;
        return(
            <div className='outer'>
                <div className='placeHolder'>PlaceHolder</div>
                <div className={`dumbInput_container ${isFocused===true?' focus':''}${isFocused!==true&&showError===true&&errorText!==undefined?' error':''}`}>
                <div className='dumbInput_wrapper'>
                        <input 
                            className ={cusClassName} name={name} type={inputType}
                            value={content} ref={inputRef} onChange={controlFunc}
                            onBlur={controlBlur} onFocus={controlFocus} onClick={controlClick}
                            readOnly={readOnly} disabled={disabled}
                        />
                        
                    </div>
                {onMaskClick?
                    <div className='input-mask' onClick={onMaskClick} />: null
                }
                </div>
            </div>
        );
    }
}
export default DumbInput;
