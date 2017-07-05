/*Created by Zhang Xingping on 20170507*/
import React,{PropTypes} from 'react';
import InputError from './InputError.js';
import '../../commonComponents/Input/simpleInput.less'
import './less/zxpInput.less';
class SingleInput extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
        // console.log(nextProps.content==this.props.content && nextProps.showError==this.props.showError && this.props.isFocused && nextProps.isFocused==this.props.isFocused);
        let shouldNotUpdate=false;
        if(nextProps.content==this.props.content&&nextProps.showError==this.props.showError){
            if(this.props.isFocused==false||this.props.isFocused==true){
                if(nextProps.isFocused==this.props.isFocused){
                    shouldNotUpdate=true;
                }
            }else{
                shouldNotUpdate=true;
            }
        }
        window.console?console.log("should "+this.props.name+" update?" +!shouldNotUpdate):null;
        return shouldNotUpdate?false:true;
    }
    render(){
        console.warn("Re-Render Input");
        return(
            <div className={`simple-input parentOfMask${this.props.isFocused?' focus':''}`}>
                <div className='input'>
                    {<div className={`placeholder${this.props.content!==''?'--invisible':''}`}>{this.props.placeholder}</div>}
                    <input 
                        name={this.props.name}
                        type={this.props.inputType}
                        pattern={this.props.pattern}
                        value={this.props.content}
                        ref={this.props.inputRef}
                        onChange={this.props.controlFunc}
                        onBlur={this.props.controlBlur}
                        onFocus={this.props.controlFocus}
                        onClick={this.props.controlClick}
                        readOnly={this.props.onlyRead?this.props.onlyRead:false}
                        disabled={this.props.disabled?this.props.disabled:null}
                    />
                    {
                        <div className={`yqbfont_gg_jiantou02_L type-right${this.props.content!==''&&this.props.isFocused?'--visible':'--invisible'}`} 
                            onTouchStart={()=>this.props.onClearInput(this.props.name)}>
                        </div>
                    }
                    <div><hr className='line'/><hr className='line-hover'/></div>
                    {this.props.showError?<InputError errorText={this.props.errorText}/>:null}
                </div>
                {this.props.onMaskClick?
                    <div className='input-mask' onClick={this.props.onMaskClick} />: null
                }
            </div>
        );
    }
}

/*SingleInput.propTypes={
    name:PropTypes.string.isRequired,
    inputType:PropTypes.oneof(['text','number']).isRequired,
    content:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
}*/

export default SingleInput;