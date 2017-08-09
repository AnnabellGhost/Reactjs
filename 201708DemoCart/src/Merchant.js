import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Perf from 'react-addons-perf';
import {fetchCartInfo} from './actions/cart.js';
import GoodList from './GoodList.js';
class MerchantList extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchGoodList();
    }
    
    render(){
        console.log(this.props.merchant.merchants);
        return (
            <div>
                {this.props.merchant.merchants.byId.map(merId=><Merchant {...this.props.merchant.merchants.entity[merId]}/>)}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        merchant:state.cart.merchant,
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchGoodList:bindActionCreators(fetchCartInfo,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MerchantList);

class Merchant extends React.Component{
    constructor(props){
        super(props);
        this.state={
            onSelect:false,
        }
        this.handleSelectAllGoods=this.handleSelectAllGoods.bind(this);
        this.handleMerchantSelected=this.handleMerchantSelected.bind(this);
    }
    handleMerchantSelected(){
        this.setState({onSelect:!this.state.onSelect});
    }
    handleSelectAllGoods(){
        this.setState({onSelect:true});
    }
    render(){
        console.log(this.props.goodsPerMer);
        return(
            <div>
                
                <h4><span onClick={this.handleMerchantSelected}>Click Toggle All</span>Merchant{this.props.sellerName}</h4>
                <GoodList goodsIdArray={this.props.goodsPerMer} 
                          onMerchantSelected={this.state.onSelect} 
                          onSelectAllGoods={this.handleSelectAllGoods}  
                /> 
            </div>
        )
    }
}