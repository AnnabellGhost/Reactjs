import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCartInfo,onGoodsSelectedCal,increaseGoodsNum} from './actions/cart.js';
import Perf from 'react-addons-perf';
class GoodList extends React.Component{
    /* Test performance B */
    componentWillUpdate(nextProps,nextState){
        // Perf.start();
        // console.log('componentWillUpdate');
    }
    componentDidUpdate(){
        // console.log("in componentDidUpdate");
        //  Perf.stop();
        /* Perf.printInclusive();
        Perf.printWasted();  */ 
    }  
    /* Test performance E */
    
    render(){
        console.log(this.props.goods);
        return(
            <div>
                <h4>GoodsList</h4>
                {this.props.goodsIdArray.map((id)=>
                    <Goods key={id} 
                           {...this.props.goods.goods.entity[id]}
                           onMerchantSelected={this.props.onMerchantSelected}
                           onGoodsSelectedCal={this.props.onGoodsSelectedCal}
                           increaseGoodsNum={this.props.increaseGoodsNum}
                    />
                )} 
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        goods:state.cart.goods,
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchGoodList:bindActionCreators(fetchCartInfo,dispatch),
        onGoodsSelectedCal:bindActionCreators(onGoodsSelectedCal,dispatch),
        increaseGoodsNum:bindActionCreators(increaseGoodsNum,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(GoodList);

class Goods extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            onSlide:false,
            onSelect:false,
            // /* Dont know how ReactNative process this, sth like gesture responder */
        };
        this.handleSelect=this.handleSelect.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.props.onMerchantSelected!==nextProps.onMerchantSelected?
            this.setState({onSelect:nextProps.onMerchantSelected}):null;
    }
    /* Test performance B */
     /* componentWillUpdate(nextProps,nextState){
        Perf.start();
    }
    componentDidUpdate(){
        console.log("in componentDidUpdate");
        Perf.stop();
        Perf.printInclusive();
        Perf.printWasted(); 
    } */ 
    /* Test performance E */
    
    handleGoodsClick(goodsId){
        console.log(goodsId);
        this.state.onSlide?'setState(onSlide=false)':'router.push';
        /* router.push : To Detail */
    }
    handleSlide(){
        /* setState */
    }
    handleSelect(){
        this.setState({onSelect:!this.state.onSelect});
        this.props.onGoodsSelectedCal(this.props.goodsId);
        /* dispatch an action to calculate selected amount in infoFooter */
    }
    handleIncrease(goodsId){
        this.props.increaseGoodsNum(goodsId);
    }
    render(){
        let {cnt,...rest}=this.props;
        return(
            <div>
                <div onClick={this.handleSelect}>Radio{this.state.onSelect?'selected':'notSelected'}</div>
                <div onClick={()=>this.handleIncrease(rest.goodsId)}>IncreaseAmount</div>
                <div onClick={()=>this.handleGoodsClick(rest.goodsId)}>
                    <BasicGoodsInfo {...rest}/>
                </div>
                {this.state.onSlide?<div></div>:null}
            </div>
        )
    }
}
/*  function BasicGoodsInfo({id,name,price,onSlide}){
    return(
        <div className={`goods_basicInfo${onSlide?'--slide':''}`}>
            <span>{`ProductId is :${id}.ProductName is :${name}.productPrice is :${price}`}</span>
        </div>
    )
}  */
 class BasicGoodsInfo extends React.Component{
     shouldComponentUpdate(nextProps,nextState){
        return nextProps.goodsId===this.props.goodsId && 
               nextProps.salePrice===this.props.salePrice ?
                false:true;

     }
    render(){
        let {goodsId,goodsName,salePrice,onSlide}=this.props;
        return(
            <div className={`goods_basicInfo${onSlide?'--slide':''}`}>
                <span>{`ProductId is :${goodsId}.ProductName is :${goodsName}.ProductPrice is :${salePrice}`}</span>
            </div>
        )
    }
} 