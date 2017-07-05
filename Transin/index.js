import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {withRouter,Link} from 'react-router';
import TransInCreate from './TransInCreate.js';
import TransInEdit from './TransInEdit.js';
import Contracts from './Contracts.js';
import Button from './ButtonTest.js';
import SelectBankCard from '../../commonComponents/SelectBankCard/index.js';
import PayValidate from '../../commonComponents/payValidate/PayValidate.js';
import ModalTemplate from '../../commonComponents/Modal/index.js';
import {createPlan,modifyPlan,
		getPlanDetail,getTemplateDetail,
		updateUserInput,resetValidationStatus,
		queryHQ,queryCustomerInfo,queryFsPolicy} from '../../../../actions/transinAction.js';
import TopFuncBar from '../../../../../common/base/business/h5/header/TopFuncBar.js';
import {queryParam} from '../../../../../common/base/utils/base/baseUtils.js';

/*onCardSelected queryHQ,,*/
class TransIn extends Component{
	constructor(props){
        super(props);
        this.state={
			renderContracts:false,
			contractType:'',
			renderBankCardSelection:false,
			modalConfig:{show:false},
        };
		 this.topFuncBarOption={
            title:{value:'Deposite',},
            theme:{headerTitleColorValue:'#333333',bgColorValue:'#F7F7F7',},
            left: {isShow: true,isEscapeContainerShow: "hide",iconClass:'yqbfont_gg_jiantou02_R',
			onClick:()=>queryParam('fromApp')?location.href = "ewap://1qianbao/merchant/action_finish": window.history.go(-1),
            },
        };
		this.urlParams=this.props.location.query;
        this.handleConfirmClick=this.handleConfirmClick.bind(this);
        this.handleContractRender=this.handleContractRender.bind(this);
		this.handleContractSelection=this.handleContractSelection.bind(this);
		this.handleCardRender=this.handleCardRender.bind(this);
		this.handleCardSelection=this.handleCardSelection.bind(this);
    }
	handleConfirmClick(){
		/*need to reset all validation status*/
		this.props.resetValidationStatus();//enter WillUpdate as well
		/*queryCustomerInfo(InDidMount) -> queryIsOpenHQ(discarded) -> queryFsValidation -> payValidation[Password OTP ] -> Submit Info*/
		this.props.queryFsPolicy();
		/*Submit in validation CallBack*/
	}

	validationBack(data){
		console.log("validationCB OTPCode is "+data);
		this.props.updateUserInput('smsOTPCode',data);//synic ? synic
		this.urlParams.fsId?
			this.props.modifyPlan({fsId:this.urlParams.fsId}):
			this.urlParams.tplId?this.props.createPlan():null;
	}
	handleContractRender(typeOfContract){
		this.setState({modalConfig:{show:false},renderContracts:true,contractType:typeOfContract});
	}
	handleContractSelection(){
		this.setState({modalConfig:{
			show:true,btnType:'ok',title:'自动转入相关服务协议',onOk:()=>{this.setState({modalConfig:{show:false}})},
			children:
				<div className='modal-content--contract'>
					<ul>
						<li key='1' onClick={()=>this.handleContractRender('BanckToHuoqi')}>《活期自动转入服务协议》</li>
						<li key='2' onClick={()=>this.handleContractRender('BanckToPafwin')}>《平安赢自动转入协议》</li>
						<li key='3' onClick={()=>this.handleContractRender('BanckToNanfang')}>《南方基金自动转入协议》</li>
						<li key='4' onClick={()=>this.handleContractRender('BanckToDahuajijin')}>《大华日增利自动转入协议》</li>
					</ul>
				</div>,
			}
		});
	}
	handleCardRender(){
		this.setState({renderBankCardSelection:true});
	}
	handleCardSelection(cardinfo){
		this.setState({renderBankCardSelection:!this.state.renderBankCardSelection});
		this.props.updateUserInput('bankCardNo',cardinfo.lastCardNo);
		this.props.updateUserInput('bankCardIdx',cardinfo.bandCardIdx);/*FUCK MTP bandCard????*/
	}
	componentDidMount(){
		/*queryCustomerInfo*/
		this.props.queryCustomerInfo();
		this.urlParams.tplId?
			this.props.getTemplateDetail({fsTplId:queryParam('tplId')}):
			this.props.getPlanDetail({fsId:queryParam('fsId')});
	}
	componentWillReceiveProps(nextProps){
		nextProps.topBarTitle!==this.props.topBarTitle?
			this.topFuncBarOption.title.value=nextProps.topBarTitle:null;
		
		if(this.props.operationSuccess===false&&nextProps.operationSuccess===true){
			this.props.history.push('transferin/result?fsId=' + nextProps.fsId);
		}
	}
	componentWillUpdate(nextProps,nextState){
		nextState.renderContracts===true?
			this.topFuncBarOption.left.onClick=()=>{this.setState({renderContracts:!this.state.renderContracts});}:
				nextState.renderBankCardSelection===true?
					this.topFuncBarOption.left.onClick=()=>{this.setState({renderBankCardSelection:!this.state.renderBankCardSelection});}:
					this.topFuncBarOption.left.onClick=()=>{queryParam('fromApp')?location.href = "ewap://1qianbao/merchant/action_finish": window.history.go(-1);}
	}
	render(){
		return (
			<div>
				<TopFuncBar options={this.topFuncBarOption} />
				{
					this.state.renderContracts?
						<div className='ContractsView'><Contracts contractType={this.state.contractType}/></div>:
							this.state.renderBankCardSelection?
								<SelectBankCard onCardSelected={this.handleCardSelection} />:
									this.urlParams.fsId?
										<TransInEdit 
											onConfirmClicked={this.handleConfirmClick} 
											onSelectContract={this.handleContractSelection}
										/>
										:
										<TransInCreate 
											onConfirmClicked={this.handleConfirmClick} 
											onSelectContract={this.handleContractSelection} 
											onRenderCardSelection={this.handleCardRender}
										/>
				}
				{
					<PayValidate
                        ref={(ref)=>{this.payValidateRef = ref}}
                        validations={this.props.validationsRules}
                        validationToken={this.props.validationToken}
                        otpConfig={{operateType:this.urlParams.fsId?"UPDATE":"ADD",serviceType:"001"}}
                        cb={(data)=>{this.validationBack(data)}}
                    />
				}
				{
					<ModalTemplate {...this.state.modalConfig}></ModalTemplate>
				}
			</div>
		);
	}
}
function mapStateToProps(state) {
  return {
	topBarTitle:state.transin.topBarTitle,
	planName: state.transin.planName,
	bankCardIdx: state.transin.bankCardIdx,
    validationToken: state.transin.validationToken,
    validationsRules:state.transin.validationsRules,
	operationSuccess:state.transin.operationSuccess,
	fsId:state.transin.fsId,
  };
};
function mapDispatchToProps(dispatch) {
  return {
	queryCustomerInfo: bindActionCreators(queryCustomerInfo, dispatch),
	getPlanDetail: bindActionCreators(getPlanDetail, dispatch),
	getTemplateDetail: bindActionCreators(getTemplateDetail, dispatch),
    createPlan: bindActionCreators(createPlan, dispatch),
    modifyPlan: bindActionCreators(modifyPlan, dispatch),
    updateUserInput: bindActionCreators(updateUserInput, dispatch),
	resetValidationStatus: bindActionCreators(resetValidationStatus, dispatch),
	queryFsPolicy: bindActionCreators(queryFsPolicy, dispatch),
  };
};
/*need to connect validation reducer to get validationToken and smsOTPCode*/
export default connect(mapStateToProps,mapDispatchToProps)(TransIn);