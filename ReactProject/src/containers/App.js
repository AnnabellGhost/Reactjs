import React from 'react';
import Navigator from '../components/Navigator'

class App extends React.Component{
    render(){
        return(
            <div>
                <Navigator routes={this.props.route}/>
                {this.props.children}
            </div>
        );
    }
}
export default App;