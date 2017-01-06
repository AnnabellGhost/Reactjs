import React from 'react';
import {ListGroupItem,InputGroup,FormControl,Button} from 'react-bootstrap';
export default class Item extends React.Component{
    constructor(props){
        super(props);
        this.state={isEdit:false,inputText:''};
        this.handleDoubleClick=this.handleDoubleClick.bind(this);
        this.handleSave=this.handleSave.bind(this);
    }
    handleDoubleClick(){
        this.setState({
            isEdit:true,
            inputText:this.props.text
        });
    }
    handleSave(id,text){
        this.props.actions.editItem(id,text);
		this.setState({isEdit:false});
    }
    getItem(){
        let {id,text}=this.props;
        if(this.state.isEdit){
            return(
                <InputGroup bsSize='small'>
                    <FormControl 
                        inputRef={ref => { this.input = ref; }} 
                        value={this.state.inputText}
                        onChange={()=>this.setState({inputText:this.input.value})}
                    />
                    <InputGroup.Button>
                        <Button onClick={()=>{this.handleSave(id,this.input.value)}}>
                            Save
                        </Button>
                        <Button onClick={()=>{this.props.actions.deleteItem(id);}}>
                            Delete
                        </Button>
                    </InputGroup.Button>
                    
                </InputGroup>
            );
        }else{
            return(
                <ListGroupItem onDoubleClick={this.handleDoubleClick}>
                    {this.props.text}
                </ListGroupItem>
            );
        }
    }
    render(){
        return(
            <i>{this.getItem()}</i>
        );
    }
}