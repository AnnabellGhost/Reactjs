import React, {Component} from 'react';
import Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Grid, Col} from 'react-bootstrap';
import AddItem from '../components/AddItem';
import ItemList from '../components/ItemList';

class Main extends Component {
    render(){
        // console.log(this.props.actions);
        return(
           <Grid>
			    <Col xs={12} md={4}>
                    <AddItem items={this.props.Items} addItem={this.props.actions.addItem}/>
				    <p>Hey</p>
                    <ItemList items={this.props.Items} actions={this.props.actions}/>
			    </Col>
		    </Grid>
        );
    }
};
function mapStateToProps(state) {
  return {
    Items: state.Items
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Main);