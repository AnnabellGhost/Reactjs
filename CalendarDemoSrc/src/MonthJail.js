import React from 'react';
import DateCell from './DateCell.js';
import './App.css';
const MONTH_COL=7,MONTH_ROWS=6;
/*const pastDayStyle={color:'grey'};
const furtureStyle={color:'blue',fontSize:'16px'}*/
/*month:6,firstWeekDay:4,days:30*/
function getWeeks(month,firstWeekDay,howManyDays,currentDayOfMonth){
    let weeks=[],days,count=1;
    for(let row=0;row<6;row++){
        let week=[];
        for(let col=0;col<7;col++){
            (row===0&&col<=(firstWeekDay-1))||count>howManyDays?
                week.push({value:0}):
                week.push({value:count++});
        }
        weeks.push(week);
    }
    return weeks;
}
class MonthJail extends React.Component{
    constructor(props){
        super(props);
        // this.renderCeils=this.renderCeils.bind(this);
        
    }
    /*renderCeils(){
        let {month,firstWeekDay,howManyDays,currentDayOfMonth}=this.props.monthData;
        return getWeeks(month,firstWeekDay,howManyDays,currentDayOfMonth).map((week,index)=>
            <tr key={index}>
                    {
                        week.map((day,dayOfWeek)=>{
                            day.plans?
                            <td key={dayOfWeek}><DateCell date={day.value} clickableTest={true} plans={day.plans} onDateClick={this.props.onDateClick}/></td>
                            :
                            <td key={dayOfWeek}><DateCell date={day.value} clickableTest={true} /></td>
                        }
                    )}
                </tr>
        );
    }*/
    render(){
        // let {month,firstWeekDay,howManyDays,currentDayOfMonth}=this.props.monthData;
        // currentDayOfMonth==day.value?pastDayStyle:''
        // style={currentDayOfMonth==day.value?pastDayStyle:furtureStyle}
        // className={currentDayOfMonth==day.value?'pastDayStyle':'furtureStyle'}
        let {currentDayOfMonth}=this.props;
        console.log(this.props.monthData);
        return(
            <div>
                <h3>Calendar</h3>
                {getWeeks(6,4,30,5).map((week,index)=>
                    <tr key={index} >
                        {week.map((day,dayOfWeek)=>{
                                return day.value==0?<td />:
                                    <td key={dayOfWeek} className={day.value<currentDayOfMonth?'pastDayStyle':'furtureStyle'}>
                                        <DateCell 
                                            date={day.value} 
                                            clickableTest={true} plans={day.plans} 
                                            onDateClick={this.props.onDateClick}
                                        />
                                    </td>
                                
                            }
                        )}
                    </tr>
                )}
            </div>
        );
    }
}
export default MonthJail;