import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPlansMonthly} from './actions/calendar.js'
import MonthJail from './MonthJail.js';
import DumbInput from './DumbInput.js';
import Tip from './Tip.js';
import './dumbModal.css';
const CURRENT_DATE=new Date();
const CURRENT_YEAR=CURRENT_DATE.getFullYear();
const CURRENT_MONTH=CURRENT_DATE.getMonth()+1;
const CURRENT_DAY=CURRENT_DATE.getDate();

const Search=({value,onChange,onSubmit,children})=>
    <form onSubmit={()=>onSubmit()}>
        <h3>Search</h3>
        <input type='text' defaultValue={value} />
        <button type='submit'>Submit</button>
    </form>

const MaskInput=({value,reassignCallBack})=><input value={value} onChange={(e)=>reassignCallBack(e)}/>


class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.handleDateClick=this.handleDateClick.bind(this);
        this.needsToFetch=this.needsToFetch.bind(this);
        // this.fetchPlansMonthly=this.fetchPlansMonthly.bind(this);
        // this.setMonthData=this.setMonthData.bind(this);
        // this.handleMonthChange=this.handleMonthChange.bind(this);
        this.handleMonthChangeSubmit=this.handleMonthChangeSubmit.bind(this);
        this.state={
            selectedMonth:`${CURRENT_YEAR}${CURRENT_MONTH}`,
        };
        this.dayInMonthCache={};
    }
    handleDateClick(id){
        console.log(id);
    }
    /*handleMonthChange(e){
        console.log(e.target.value);
        this.setState({selectedMonth:e.target.value});
    }*/
    handleMonthChangeSubmit(){
        console.log('handleMonthChangeSubmit');
        let {selectedMonth}=this.state;
        if(this.needsToFetch(selectedMonth)){
            this.props.fetchPlansMonthly(selectedMonth);
        }
    }
    needsToFetch(month){
        return !this.props.calendarData[`2017${month}`];
    }
    /*fetchPlansMonthly(month){
        his.props.fetchCalendarMonthData(month);
        this.setMonthData(month);
        return MOCK_DATA[month];
        
    }*/
    /*setMonthData(monthID){
        this.setState({
            calendarCache:{
                ...this.state.calendarCache,
                [month]:{},
            }
        });
        calendarData[]
    }*/
    
    componentDidMount(){
        this.props.fetchPlansMonthly(this.state.selectedMonth);
    }
    componentWillUpdate(nextProps,nextState){
        console.log(nextState.selectedMonth);
        nextProps.calendarData[nextState.selectedMonth]?
            null:this.props.fetchPlansMonthly(nextState.selectedMonth);
    }
    render(){
        // console.log(this.state.selectedMonth);
        return(
            <div>
                
                <DumbInput />
                <br/> 
                <Tip tipText='For your information '/>
                <MaskInput value={this.state.selectedMonth} />
                <button onClick={()=>{this.setState({selectedMonth:Number(this.state.selectedMonth)+1})}}>change date</button>
                <MonthJail 
                    monthData={this.props.calendarData[this.state.selectedMonth]} 
                    onDateClick={(id)=>this.handleDateClick(id)}
                    currentDayOfMonth={CURRENT_DAY}
                />
                <div className='Container'>
                <div className='main'>
                    <div className='header'>AAAA</div>
                    
                    <div className='content'>
                        <div className='box'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, quibusdam maiores eaque cupiditate itaque id, blanditiis omnis quod quis sint. Recusandae ipsa doloremque ducimus minus, aliquid ipsum facere eaque odit.
                        </div>
                    </div>
                    
                    <div className='footer'>BBBBB</div>
                </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        calendarData:state.calendar,
        isFetching:state.isFetching,
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchPlansMonthly:bindActionCreators(fetchPlansMonthly,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Calendar);

/*daysInMonth = (function() {
    var cache = {};
    return function(month, year) {
        var entry = year + '-' + month;

        if (cache[entry]) return cache[entry];

        return cache[entry] = new Date(year, month, 0).getDate();
    }
})();
<Search value={this.state.selectedMonth} onChange={this.handleMonthChange} onSubmit={this.handleMonthChangeSubmit}/>
*/


