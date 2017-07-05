import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPlansMonthly} from './actions/calendar.js'
import MonthJail from './MonthJail.js';
// month,firstWeekDay,howManyDays,currentDayOfMonth
const CURRENT_DATE=new Date();
const CURRENT_YEAR=CURRENT_DATE.getFullYear();
const CURRENT_MONTH=CURRENT_DATE.getMonth();

const Search=({value,onChange,onSubmit,children})=>
    <form onSubmit={onSubmit}>
        <h3>Search</h3>
        <input type='text' value={value} onChange={onChange}/>
        <button type='submit'>Submit</button>
    </form>
class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.handleDateClick=this.handleDateClick.bind(this);
        this.needsToFetch=this.needsToFetch.bind(this);
        // this.fetchPlansMonthly=this.fetchPlansMonthly.bind(this);
        // this.setMonthData=this.setMonthData.bind(this);
        this.handleMonthChange=this.handleMonthChange.bind(this);
        this.handleMonthChangeSubmit=this.handleMonthChangeSubmit.bind(this);
        this.state={
            selectedMonth:`${CURRENT_YEAR}${CURRENT_MONTH}`,
        };
        this.dayInMonthCache={};
        
    }
    handleDateClick(id){

    }
    handleMonthChange(e){
        console.log(e.target.value);
        this.setState({selectedMonth:e.target.value});
    }
    handleMonthChangeSubmit(){
        console.log('handleMonthChangeSubmit');
        let {selectedMonth}=this.state;
        if(this.needsToFetch(selectedMonth)){
            this.props.fetchPlansMonthly(selectedMonth);
        }/*else{
            this.state.calendarCache[selectedMonth];
        }*/
    }
    needsToFetch(month){
        return !this.props.calendarData[`2017${month}`];
    }
    /*fetchPlansMonthly(month){
        // this.props.fetchCalendarMonthData(month);
        this.setMonthData(month);
        return MOCK_DATA[month];
        
    }*/
    // setMonthData(monthID){
        /*this.setState({
            calendarCache:{
                ...this.state.calendarCache,
                [month]:{},
            }
        });*/
        // calendarData[]
    // }
    daysInMonth(){
        // let dayInMonthCache={};
        return (year,month)=>{
            let cacheId=`${year}-${month}`;
            return this.dayInMonthCache[cacheId]?
                        this.dayInMonthCache[cacheId]:  
                        this.dayInMonthCache[cacheId] = new Date(year, month, 0).getDate();
        }
    }
    componentDidMount(){
        this.props.fetchPlansMonthly(this.state.selectedMonth);
    }
    componentWillReceiveProps(nextProps){
        !this.props.calendarData[this.state.selectedMonth]&&nextProps.calendarData[this.state.selectedMonth]?
            '':'';
        /*no need for this It will re-renderanyway*/

    }
    render(){
        console.log(this.state.selectedMonth);
        return(
            <div>
                <Search value={this.state.selectedMonth} onChange={this.handleMonthChange} onSubmit={this.handleMonthChangeSubmit}/>
                <MonthJail 
                    monthData={this.props.calendarData[this.state.selectedMonth]} 
                    onDateClick={(id)=>this.handleDateClick(id)}
                    currentDayOfMonth={7}
                />
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        calendarData:state.calendar,
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
})();*/


