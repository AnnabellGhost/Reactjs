/* created by Zhang Xingping on 20170327 */
import React,{Component} from 'react';
import {withRouter} from 'react-router';
import {dataCollector_PlanList_Plan} from '../PlanTypes/DataCollection';
import './less/planList.less';
class Plan extends Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(id,amount,serviceType){
        /*埋点开始*/
        dataCollector_PlanList_Plan(id,serviceType);
        /*埋点结束*/
        amount===0 && serviceType==='003'?
            this.props.router.push(`/creditout?fsId=${id}`):
            this.props.router.push(`/plandetail?fsId=${id}`); 
    }
    render(){
        let {name,amount,id,status,iconPath,serviceType,income}=this.props;
        let type=serviceType==='001'?'存入':serviceType==='003'&&amount!==0?'还款':serviceType==='003'&&amount===0?null:'转出';
        let detail=amount===0?null:`${amount}元`;
        let oneLineStyle=detail===null?" oneLineStyle":"";
        let icon=window.staticDomain==='$staticDomain'?`.${iconPath}` :`${window.staticDomain}/${iconPath}`;
        // console.log(this.props.id);
        return (
            <li className="plan" onClick={()=>this.handleClick(id,amount,serviceType)}>
                <div className="icon-wrapper">
                    <img src={icon} className="icon" role="presentation" />
                </div>
                <p className="plan-left">{name}</p>
                <div className={`plan-right${oneLineStyle}`}>
                    <p className="detail">
                        <span className="type">{type}</span>
                        {detail}
                    </p>
                    <span className="status">{status}</span>
                </div>
            </li>
        );
    }
};
export default withRouter(Plan);
