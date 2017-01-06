import React from 'react';
import {Button,InputGroup,FormControl} from 'react-bootstrap';
import Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class AddItem extends React.Component{
    render(){
        let input;
        return(
                <InputGroup bsSize='small'>
                    <FormControl inputRef={ref => { this.input = ref; }} />
                    <InputGroup.Button>
                        <Button onClick={()=>{this.props.addItem(this.input.value);this.input.value='';}}>
                            AddItem
                        </Button>
                    </InputGroup.Button>
                </InputGroup>

        );
    }
}
// function mapStateToProps(state) {
//   return {
//     Items: state.Items
//   };
// };

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(Actions, dispatch)
//   };
// };
export default AddItem;
