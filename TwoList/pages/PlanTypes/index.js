import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAllPlanTypes} from '../../../../actions/planTypesAction';
import {queryParams,queryParam} from '../../../../../common/base/utils/utils';
import TopFuncBar from '../../../../../common/base/components/h5/header/TopFuncBar';
import Loading from '../../../../../common/base/components/loading/loading.js';
import TypeCategory from './TypeCategory';
import './less/planTypes.less';
class PlanTypes extends Component{
    static propTypes={
        planTypes:React.PropTypes.array.isRequired,
    }
    constructor(props){
        super(props);
        this.topFuncBarOption={
            theme:{
                headerTitleColorValue:'#333333',
                bgColorValue:'#F7F7F7',
            },
            title:{
                value:'选择计划类型'
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
        this.getPlanTypes=this.getPlanTypes.bind(this);
    }
    getPlanTypes(){
        let {planTypes}=this.props;
        let typeCategory=planTypes.map((category)=><TypeCategory key={category.id} {...category} />);
        return <ul className="category">{typeCategory}</ul>;
    }
    displayLoading(){
        let {isFetchingTypes}=this.props;
        return isFetchingTypes? <Loading /> : this.getPlanTypes();
    }
    componentDidMount(){
        this.props.fetchAllPlanTypes();
    }
    render(){
        return(
            <div className="typesView">
                <TopFuncBar options={this.topFuncBarOption} className="topFuncBarByZxp"/>
                {this.displayLoading()}
            </div>
            );
    }
}
function mapStateToProps(state){
    return {
        planTypes:state.planTypes.planTypes, 
        isFetchingTypes:state.planTypes.isFetchingTypes,
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchAllPlanTypes:bindActionCreators(fetchAllPlanTypes, dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PlanTypes);