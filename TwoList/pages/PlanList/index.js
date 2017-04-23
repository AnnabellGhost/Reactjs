/* created by Zhang Xingping on 20170327 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAllPlans} from '../../../../actions/planListAction';
import {withRouter} from 'react-router';
import {queryParams,queryParam} from '../../../../../common/base/utils/utils';
import {QueryDays} from '../../../../constants/common.js';
import TopFuncBar from '../../../../../common/base/components/h5/header/TopFuncBar';
import Loading from '../../../../../common/base/components/loading/loading.js';
import bg_planList from './images/bg_planList.jpg';
import PlanSet from './PlanSet';
import {dataCollector_PlanList} from '../../../../utils/DataCollection.js';
import './less/planList.less';
const propTypes = {
    planList: React.PropTypes.array.isRequired,
};
class PlanList extends Component {
    constructor(props) {
        super(props);
        this.topFuncBarOption={
            title:{value:'即将执行计划',},
            left:{iconClass:'yqbfont_gg_jiantou02_R',},
            theme:{
                headerTitleColorValue:'#333333',
                bgColorValue:'#F7F7F7',
            },
            left: {
                isShow: true,
                isEscapeContainerShow: "hide",
                iconClass:'yqbfont_gg_jiantou02_R',
                onClick: function () {
                    if (queryParam('fromApp')) {
                        location.href = "ewap://1qianbao/merchant/action_finish";
                    } else {
                        window.history.go(-1);
                    }
                }.bind(this)
            },
        };
        this.getListView = this.getListView.bind(this);
        this.displayLoading= this.displayLoading.bind(this);
    };
    componentDidMount() {
        //dispatch fetchAction then store has a List of onGoingPlans.
        let {queryType}=queryParams();
        this.props.fetchAllPlans({queryType:QueryDays[queryType]});
    }
    handleClick(){
        //click button to PlanTypes page with params
        let {outcomeLength,incomeLength} = this.props;
        /*埋点开始*/
        dataCollector_PlanList(outcomeLength,incomeLength);
        /*埋点结束*/
        this.props.router.push(`/plantypes?inLength=${incomeLength}&outLength=${outcomeLength}`);
    }
    getListView() {
        let {planList} = this.props;
        let clientHeight = window.screen.height + "px";
        const pageHeight = {height: clientHeight};
        console.log(planList.length);
        if (planList.length >= 1) {
            let data = [];
            planList.reduce((pre, cur) => {
                if (pre.date === cur.date && !pre.plans.includes(cur.plans[0])) {
                    pre.plans.push(cur.plans[0]);
                    data.pop();data.push(pre);
                    return pre;
                }
                else if(pre.date === cur.date && pre.plans.includes(cur.plans[0])){
                    return pre;
                }
                else{
                    data.push(cur);
                    return cur;
                }
            }, []);
            console.log(data);
            let planSets = data.map(set => <PlanSet planSet={set} key={set.id} />);
            return (
                <div>
                    <ul className="planSet">{planSets}</ul>
                    <button className="addbutton" onClick={()=>this.handleClick(planList.length)} data-event="添加更多计划">
                        <span className="yqbfont_gg_jiahao"></span>添加更多计划
                    </button>
                </div>
            );
        }
        else {
            return (
                <div className="blankPlanList" style={pageHeight}>
                    <img className="blankBg" src={bg_planList} />
                    <p className="blankpageNote">三十天内没有即将执行的计划</p>
                    <button className="blankpagebutton" onClick={()=>this.handleClick()} data-event="添加更多计划">
                        <span className="yqbfont_gg_jiahao"></span>添加更多计划
                    </button>
                </div>
            );

        }
    };
    displayLoading(){
        let {isFetchingAllPlans}=this.props;
        return isFetchingAllPlans? <Loading /> : this.getListView();
    }
    render() {
        return (
            <div className="planView">
                <TopFuncBar options={this.topFuncBarOption} className="topFuncBarByZxp" />
                {this.displayLoading()}
            </div>
        );
    };
}
PlanList.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        planList: state.planList.planList,
        isFetchingAllPlans:state.planList.isFetchingAllPlans,
        outcomeLength:state.planList.outcomeLength,
        incomeLength:state.planList.incomeLength,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchAllPlans: bindActionCreators(fetchAllPlans, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlanList));