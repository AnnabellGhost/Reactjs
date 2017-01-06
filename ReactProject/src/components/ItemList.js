import React from 'react';
import Item from './Item';
import {ListGroup} from 'react-bootstrap';
export default class ItemList extends React.Component{
    render(){
        let List=this.props.items.map((item)=>(
            <Item key={item.id} {...item} {...this.props}/>
        ));
        return(
            <ListGroup>{List}</ListGroup>
        );
    }
}