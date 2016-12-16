import React from 'react';
import ReactDOM from 'react-dom';
import style from './Mail.css'
var EMAILS = [
  {"unread": false, "desc": "Hey, I just wanted to check in with you from Toronto.", "name": "Tilo Mitra", "subject": "Hello from Toronto", "timestamp": "3:56pm, April 3, 2012", "content": "Content 1"},
  {"unread": true, "desc": "Hey, I had some feedback for pull request #51.", "name": "Eric Ferraiuolo",  "subject": "Re: Pull Requests", "timestamp": "2:27pm, April 3, 2012", "content": "Content 2"},
  {"unread": true, "desc": "Duis aute irure dolor in ", "name": "YUI Library",  "subject": "You have 5 bugs assigned to you", "timestamp": "12:05am, April 2, 2012", "content": "Aliquam ac feugiat dolor. Proin mattis massa sit amet enim iaculis tincidunt. Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris. Curabitur ornare arcu quis mi blandit laoreet. Vivamus imperdiet fermentum mauris, ac posuere urna tempor at. Duis pellentesque justo ac sapien aliquet egestas. Morbi enim mi, porta eget ullamcorper at, pharetra id lorem."},
  {"unread": false, "desc": "Excepteur sint occaecat", "name": "Reid Burke", "subject": "Re: Design Language", "timestamp": "1:00pm, April 2, 2012", "content": "Donec sagittis dolor ut quam pharetra pretium varius in nibh. Suspendisse potenti. Donec imperdiet, velit vel adipiscing bibendum, leo eros tristique augue, eu rutrum lacus sapien vel quam. Nam orci arcu, luctus quis vestibulum ut, ullamcorper ut enim. Morbi semper erat quis orci aliquet condimentum. Nam interdum mauris sed massa dignissim rhoncus."},
  {"unread": false, "desc": "Ut enim ad minim veniam", "name": "Andrew Wooldridge", "subject": "YUI Blog Updates?", "timestamp": "12:59pm, April 2, 2012", "content": "Nevermind, I got it."},
  {
    "unread": false, 
  "desc": "Mauris tempor ", 
  "name": "Yahoo!",
   "avatar": "http://api.", 
   "subject": "How", 
   "timestamp": "12", 
   "content": "6"
 }
];

class EmailItem extends React.Component{
  constructor(props){
    super(props);

  }
  handleClick(index){
    
    this.props.aa(index);
  }
  render(){
    // console.log(this.props.OnMouseOver);
    // console.log(Array.isArray(this.props.children));
    // console.log(this.props.children.length);
    return(
            <div 
              className={style.emailList}
              onClick={this.handleClick.bind(this,this.props.index)}

            >
              <p>{this.props.name}</p>
              <span className={style.timeStamp}>{this.props.children}</span>
            </div>
      );

  }
}

class List extends React.Component{
  constructor(props){
    super(props);
    // this.handleClick=this.handleClick.bind(this);

  }
  
  render(){
    // var number=React.Children.count(EmailItem);
    // console.log(number);
    const {emails}=this.props;
    // console.log(this.props);
    var items=emails.map(function(email,i){
    // var items=React.Children.map(emails,(email,i)=>{
      
      return(
          <EmailItem
            aa={this.props.onEmailSelected}
            selected={this.props.selected===i}
            name={email.name}
            unread={email.unread && !this.props.read[i]}
            subject={email.subject}
            key={i}
            index={i}
          >
          {email.timestamp}
          </EmailItem>
        );

    }.bind(this));//.bind(this)
      
      return(
        <div className={style.emailListContainer}> 
             {items}
        </div>
      );

  }
}

class Main extends React.Component{
  render(){
    return ( <div className={style.mainContent} dangerouslySetInnerHTML={{__html: this.props.email.content}} />);
  }
}


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selected:0,
      read:{},
    };
    this.handleEmailSelected=this.handleEmailSelected.bind(this);

  }
  handleEmailSelected(index){
    var read = this.state.read;
    read[this.state.selected]=true;
    this.setState({
      selected:index,
      read:read,
    });
    console.log('enter handleEmailSelected');

  }
  render(){

    return(
        <div className={style.content}>
         
          <List emails={this.props.emails} 
                selected={this.state.selected}
                onEmailSelected={this.handleEmailSelected}
                read={this.state.read}
          />
          <Main email={this.props.emails[this.state.selected]} />
        </div>
      );
  }
}



ReactDOM.render(
  <App emails={EMAILS}/>,
  document.getElementById('container')
);