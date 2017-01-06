import React from 'react';
import {Nav,NavItem,Navbar} from 'react-bootstrap';
import {Link} from 'react-router';
export default class Navigator extends React.Component{
    render(){
        return(
            <Navbar>
                <Nav bsStyle="pills" activeKey={1}>
                    <NavItem eventKey={1} href='/'>Main</NavItem>
                    <NavItem eventKey={2} href='/a'>Sub</NavItem>
                    <NavItem eventKey={3}>About</NavItem>                                
                </Nav>
            </Navbar>
        );
    }
}