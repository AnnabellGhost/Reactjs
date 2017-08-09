/* By Zhang Xingping on 20170804 Shoppingcart Demo */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCartInfo} from './actions/cart.js';
import Perf from 'react-addons-perf';
import GoodList from './GoodList.js';
import Merchant from './Merchant.js';
import InfoFooter from './InfoFooter';
class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tab:'',/* visual or not */
            multiSpecModal:false,
            orderDivisionModal:false,

        };
    }
    componentDidMount(){

    }
    render(){
        return (
            <div>
                {/* <TabHeader /> */}
                 <Merchant> 
                     <GoodList />
                 </Merchant> 
                 <InfoFooter /> 
            </div>
        );
    }
}
function mapStateToProps(state){
   
}
function mapDispatchToProps(dispatch){
    return {
        fetchGoodList:bindActionCreators(fetchCartInfo,dispatch),
    }
}
export default connect(null,mapDispatchToProps)(Cart);





