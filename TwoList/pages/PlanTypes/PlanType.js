/* created by Zhang Xingping on 20170327*/
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {queryParams} from '../../../../../common/base/utils/utils';
import {Popup} from '../../../../../common/base/components/popup/popup';
import {src} from '../../../../../apiConfig.js';
import {dataCollector_PlanType} from '../../../../utils/DataCollection.js';
import './less/planTypes.less';
class PlanType extends Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(serviceType,tplId){
        let {inLength,outLength}=queryParams();
        let popUpNotification=serviceType==="001"?{limits:"5",type:"转入"}:{limits:"100",type:"转出"};
        /*埋点开始*/
        dataCollector_PlanType(serviceType,inLength,outLength,tplId);
        /*埋点结束*/
        serviceType==="001"&&inLength<5?location.href=`${window.h5Patch}/yqbBalance/index.html#/autotransfer/edit?tplId=${tplId}&returnUrl=${window.h5Patch}/planmanager/index.html#/`:
        serviceType==="003"&&outLength<100?this.props.router.push(`/selectcredit?tplId=${tplId}`):
        serviceType==="004"&&outLength<100?this.props.router.push(`/transferout?tplId=${tplId}`):
        Popup(`最多可设置 ${popUpNotification.limits}条定时${popUpNotification.type}`);
    }
    render(){
        let { name,desc,iconPath,serviceType,tplId }=this.props;
        let icon=window.staticDomain==='$staticDomain'?`.${iconPath}` :`${window.staticDomain}/${iconPath}`;
        return (
        <li className="type" onClick={()=>this.handleClick(serviceType,tplId,name)}>
            <div className="icon-wrapper">
                <img src={icon} className="icon" role="presentation" />
            </div>
            <div className="type-left">
                <p className="title">{name}</p>
                <span className="note">{desc}</span>
            </div>
            <i className="type-right yqbfont_gg_jiantou02_L"></i>         
        </li>
        );
    }
};
  
export default withRouter(PlanType);