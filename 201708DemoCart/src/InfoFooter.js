import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class InfoFooter extends React.Component{
    render(){
        return(
            <div>
                <h6>Footer</h6>
                <ul>
                    <li>{this.props.overView.selectedCash}</li>
                    <li>{this.props.overView.selectedPoint}</li>
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        overView:state.cart.overView,
    }
}
function mapDispatchToProps(dispatch){
    return {
    }
}
export default connect(mapStateToProps)(InfoFooter)