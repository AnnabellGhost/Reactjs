import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, 
        FlatList, Button, Switch,
        Modal, TouchableHighlight
  
} from 'react-native';
import { Constants, Svg} from 'expo';

export default class App extends Component {
  state = {
    inputValue: "Default",
    list:[
      {name:'zxp',age:25},
      {name:'zbd',age:24},
      {name:'wjm',age:100},
      {name:'shuangxingji',age:20}],
    switchValue: true,
    modalShow:false,
  };

  _handleButtonPress=()=>{
    console.log ("button pressed");
    this.setState((state)=>({modalShow:!state.modalShow}));
    
  }
  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };
  _handleModalClose=(visibility)=>this.setState({modalShow:visibility});
  
  _handleToggleSwitch = () => this.setState(state => ({
    switchValue: !state.switchValue
  }));

  render() {
    return (
      <View style={styles.container}>
      
        <Text style={styles.paragraph}>Text</Text>
        
        <Modal
        animationType={"slide"} 
        transparent={true} 
        visible={this.state.modalShow}
        onRequestClose={this._handleModalClose}
        >
        <View style={styles.modalStyle}>
        <TouchableHighlight onPress={()=>this._handleModalClose(!this.state.modalShow)}>
        <Text>Hide Modal</Text>
        </TouchableHighlight>
        </View>
        </Modal>
        
        
        <Svg height={100} width={100}>
          <Svg.Circle
            cx={50}
            cy={50}
            r={45}
            strokeWidth={2.5}
            stroke="#e74c3c"
            fill="#f1c40f"
          />
        </Svg>
      
        <Button
          title="Press me"
          onPress={this._handleButtonPress}
        />
      
        <Switch
          onValueChange={this._handleToggleSwitch}
          value={this.state.switchValue}
        />
      
      <TextInput
        value={this.state.inputValue}
        onChangeText={this._handleTextChange}
        style={styles.inputStyle}
      />
      <FlatList 
        style={styles.listStyle}
        data={this.state.list}
        keyExtractor={(item,index)=>index}
        renderItem={({item,index})=>
          <Text>No:{index} Name:{item.name} Age:{item.age}</Text>
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  listStyle:{
    backgroundColor: '#FFF',
  },
  inputStyle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFF',
    margin:'0 auto'
  },
  modalStyle:{
    flex: 1,
    flexDirection: 'column',
    paddingTop:30,
    width: 50, height: 50,
    backgroundColor:'beige',
    
  }
});

      
    
      
    
      
    