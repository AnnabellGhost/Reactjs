/*Created by Zhang Xingping on 20170516*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTemplateDetail,updateUserInput} from '../../../../actions/transinAction.js';
import SingleInput from './SingleInput.js';
// import Contracts from './Contracts.js';
import Button from './ButtonTest.js';
import {run,validateRules} from './runValidation.js';
import {required,lengthMaximum,beginWithDecimal,notZero} from './rules.js';
import {queryParam} from '../../../../../common/base/utils/base/baseUtils';
import './less/zxpInput.less';
const inputValidation=[
    validateRules('planName','计划名称',lengthMaximum(8),required),
    validateRules('deposite','转入金额',notZero,beginWithDecimal,required),
    validateRules('excutionDate','转入日期',required),
];
function isEmptyObject(e){
    for(let t in e) return !1;
    return !0;
}
class TransInCreate extends Component{
    constructor(props){
        super(props);
        this.state={
            showError:{deposite:false,bankCardNo:false,planName:false},
            validationErrors:{},
            isFocused:{planName:false,deposite:false},
        };
        this.handleTransinInput=this.handleTransinInput.bind(this);
        this.handleTransinBlur=this.handleTransinBlur.bind(this);
        this.handleFocus=this.handleFocus.bind(this);
        this.handleDateClick=this.handleDateClick.bind(this);
        this.handleClearInput=this.handleClearInput.bind(this);
        // this.getPickerView=this.getPickerView.bind(this);handleFocus

        this.state.validationErrors=run(props,inputValidation);
    }
    handleTransinInput(e){
        console.log("e "+e.target.name);
        this.props.updateUserInput(e.target.name,e.target.value);
        /*and validation Passed sth like &&vlidationError[planName] is empty to avoid invalid user input recorded by store*/
        let updatedProps=Object.assign({},this.props,{[e.target.name]:e.target.value});
        this.setState({validationErrors:run(updatedProps,inputValidation)});
    }
    handleTransinClick(e){/*console.warn(this.depositeNode.type);*/}
    handleTransinBlur(e){
        /*I change all inputs's focus and error props so sholdComponentUpdate is excuted and return true every time*/
        let key=e.target.name;
        if(this.state.showError[key]===false){
            let errorState=Object.assign({},this.state.showError,{[e.target.name]:true});
            this.setState({showError:errorState,}); 
        }
        let focusState=Object.assign({},this.state.isFocused,{[e.target.name]:false});
        this.setState({isFocused:focusState}); 
    }
    handleFocus(e){/*For CSS Purpose*/
        let focusState=Object.assign({},this.state.isFocused,{[e.target.name]:true});
        this.setState({isFocused:focusState});
    }
    handleClearInput(key){this.props.updateUserInput(key,'')}
    /*NativeDatePicker Begin*/
    handleDateClick(event) {
      event.stopPropagation();event.preventDefault();
      let index=0,_this=this;
      if(this.fsId){index=this.props.excutionDate;}
      setTimeout(function(){_this.getPickerView(index);},100)
    }
    changeDate(dateNum){this.props.updateUserInput('excutionDate',dateNum);}
    changeDateStr(data){return data.substring(data.indexOf("月")+1,data.indexOf("日"));}
    getPickerView(dateOfMonth) {
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

    /*if i do change the click function on TopFuncBar owned by parent component,it'll resulting two-bway binding.So better to lift up*/
    /*handleContractRender(e){
        this.setState({renderContracts:!this.state.renderContracts});
        e.target.name==='bankCardNo'?this.props.updateUserInput(e.target.name,"12345"):null;
        this.props.updateUserInput('bankCardNo','e.target.value');
    }*/
    componentWillUpdate(nextState,nextProps){
        // isEmptyObject(nextState.validationErrors)!==isEmptyObject(this.state.validationErrors);
    }
    render(){
        let dateString=this.props.excutionDate?`每月${this.props.excutionDate}日`:'';
        // console.log(this.props.router);
        return(
            <div>
                <div className='single-input_with_padding_left'>
                    <div className='single-input'>
                    <label>计划名称</label>
                    <SingleInput
                        name='planName'
                        inputType='text'
                        placeholder="给计划起个容易记的名字"
                        isFocused={this.state.isFocused.planName}
                        content={this.props.planName}
                        controlFunc={this.handleTransinInput}
                        controlBlur={this.handleTransinBlur}
                        controlFocus={this.handleFocus}
                        onClearInput={this.handleClearInput}
                        showError={this.state.showError.planName}
                        errorText={this.state.validationErrors.planName}
                    />
                </div></div>
                <div className='single-input_with_padding_left'>
                    <div className='single-input'>
                    {this.props.bankCardIdx?<label>此处有图</label>:<label>选择银行卡</label>}
                    <SingleInput
                        name='bankCardNo'
                        inputType='text'
                        content={this.props.bankCardNo}
                        controlFunc={this.handleTransinInput}
                        controlClick={this.props.onRenderCardSelection}
                        controlBlur={this.handleTransinBlur}
                        showError={this.state.showError.bankCardNo}
                        errorText={this.state.validationErrors.bankCardNo}
                    />
                </div></div>
                <div className='single-input_with_padding_left'>
                    <div className='single-input'>
                    <label>转入金额</label>
                    <SingleInput
                        name='deposite'
                        inputType='number'
                        pattern='[0-9.,]*'
                        isFocused={this.state.isFocused.deposite}
                        placeholder='每月转入金额'
                        content={this.props.deposite}
                        controlFunc={this.handleTransinInput}
                        controlBlur={this.handleTransinBlur}
                        controlFocus={this.handleFocus}
                        onClearInput={this.handleClearInput}
                        showError={this.state.showError.deposite}
                        errorText={this.state.validationErrors.deposite}
                        inputRef={node=>this.depositeNode=node}
                    />
                </div></div>
                <div className='single-input_with_padding_left'>
                    <div className='single-input'>
                    <label>转入日期</label>
                    <SingleInput
                        name='excutionDate'
                        inputType='text'
                        placeholder='每月转入日期'
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
/*&& !isFetching*/
function mapStateToProps(state) {
  return {
    planName: state.transin.planName,
    bankCardNo:state.transin.bankCardNo,
    bankCardIdx:state.transin.bankCardIdx,
    deposite:state.transin.deposite,
    excutionDate: state.transin.excutionDate,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateUserInput: bindActionCreators(updateUserInput, dispatch),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(TransInCreate);
