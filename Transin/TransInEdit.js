/*Created by Zhang Xingping on 20170516*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPlanDetail,updateUserInput} from '../../../../actions/transinAction.js';
import SingleInput from './SingleInput.js';
import Button from './ButtonTest.js';
import {run,validateRules} from './runValidation.js';
import {required,beginWithDecimal,notZero} from './rules.js';
import './less/zxpInput.less';
const inputValidation=[
    validateRules('deposite','转入金额',notZero,beginWithDecimal,required)
];
function isEmptyObject(e){
    for(let t in e) return !1;
    return !0;
}
class TransInEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            showError:false,
            validationErrors:{},
            isFocused:false,
            isEdited:{},
        };
        console.warn(props.deposite,props.excutionDate);
        this.handleTransinInput=this.handleTransinInput.bind(this);
        this.handleTransinBlur=this.handleTransinBlur.bind(this);
        this.handleFocus=this.handleFocus.bind(this);
        this.handleDateClick=this.handleDateClick.bind(this);
        this.handleClearInput=this.handleClearInput.bind(this);

        this.state.validationErrors=run(props,inputValidation);

    }
    handleTransinInput(e){
        this.props.updateUserInput(e.target.name,e.target.value);
        let updatedProps=Object.assign({},this.props,{[e.target.name]:e.target.value});
        this.setState({validationErrors:run(updatedProps,inputValidation)});
    }
    handleTransinBlur(e){
        this.state.showError===false?this.setState({showError:true}):null; 
        this.setState({isFocused:false}); 
    }
    handleFocus(){/*For CSS Purpose*/this.setState({isFocused:true});}

    handleClearInput(key){this.props.updateUserInput(key,'');}
    
    /*NativeDatePicker Begin*/
    handleDateClick(event) {
      event.stopPropagation();event.preventDefault();
      let index=0,_this=this;
      if(this.fsId){index=this.props.excutionDate;}
      setTimeout(function(){_this.getPickerView(index);},100)
    }
    changeDate(dateNum){this.props.updateUserInput('excutionDate',dateNum);}
    changeDateStr(data){return data.substring(data.indexOf("月")+1,data.indexOf("日"));}
    getPickerView(dateOfMonth){
        let _this=this;
        window.getPickerData = function (data) {let dateNum=_this.changeDateStr(data);_this.changeDate(dateNum);}
        window.falseTest=function(){}
        let arg1=[];
        for(var i=1;i<29;i++){let str="每月"+i+"日";arg1.push(str);}
        let arr={"arg1":arg1,"arg2": [],"arg3": []};
        if(window.YiQianBao && window.YiQianBao.UniversalJSFunction) {
            window.YiQianBao.UniversalJSFunction("getPickerView", arr, "window.getPickerData('[data]')", dateOfMonth-1);
            window.YiQianBao.UniversalJSFunction("universalJsFun", "window.falseTest()");
        }else{alert("app接口注入失败")}
    }
    /*NativeDatePicker End*/
    componentWillUpdate(nextState,nextProps){
        // isEmptyObject(nextState.validationErrors)!==isEmptyObject(this.state.validationErrors);
    }
    render(){
        let dateString=this.props.excutionDate?`每月${this.props.excutionDate}日`:'';
        return(
            <div>
                <div className='single-input_with_padding_left'>
                    <div className='single-input'>
                    <label>转入金额</label>
                    <SingleInput
                        name='deposite'
                        inputType='number'
                        pattern='[0-9.]*'
                        content={this.props.deposite}
                        controlFunc={this.handleTransinInput}
                        controlBlur={this.handleTransinBlur}
                        controlFocus={this.handleFocus}
                        onClearInput={this.handleClearInput}
                        showError={this.state.showError&&(!this.state.isFocused)}
                        isFocused={this.state.isFocused}
                        errorText={this.state.validationErrors.deposite}
                    />
                </div></div>
                <div className='single-input_with_padding_left'>
                    <div className='single-input'>
                    <label>转入日期</label>
                    <SingleInput
                        name='excutionDate'
                        inputType='text'
                        content={dateString}
                        onMaskClick={this.handleDateClick}
                    />
                </div></div>
                <div className='protocol'>
                    <p>同意 <span onClick={this.props.onSelectContract}>相关服务协议</span></p>
                </div>
                <Button 
                    cusStyle='fixed'
					onClick={this.props.onConfirmClicked}
					ButtonName='确认'
                    status={!isEmptyObject(this.state.validationErrors)}
				/>
            </div>
        );
    }
}
function mapStateToProps(state) {
  return {
    excutionDate: state.transin.excutionDate,
    deposite:state.transin.deposite,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateUserInput: bindActionCreators(updateUserInput, dispatch),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(TransInEdit);
