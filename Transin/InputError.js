import React,{PropTypes} from 'react';
import '../../../../../common/base/componentUI/h5/input/simpleInput.less';

const InputError=({...props})=>{
    return(
        <div className='input-group-tips'>{props.errorText}</div>
    );
}
export default InputError;
// props.showError?"block":"none"