import React from 'react';
import DateCell from './DateCell.js';
import Perf from 'react-addons-perf';
import './App.css';
const MONTH_COL=7,MONTH_ROWS=6;
/*month:6,firstWeekDay:4,days:30*/
function daysInMonth(){
    // let dayInMonthCache={};
    return (year,month)=>{
        let cacheId=`${year}-${month}`;
        return this.dayInMonthCache[cacheId]?
                    this.dayInMonthCache[cacheId]:  
                    this.dayInMonthCache[cacheId] = new Date(year, month, 0).getDate();
    }
}
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
const MonthJail=({currentDayOfMonth,...props})=>{
    // Perf.getWasted();
    // React.addons.Perf.start()
    console.log(props.monthData);
    return (
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
                                        onDateClick={()=>props.onDateClick(day.value)}
                                    />
                                </td>
                        }
                    )}
                </tr>
            )}
        </div>
    );
// React.addons.Perf.stop()
// Perf.stop()
// let measure=Perf.getLastMeasurements()
// Perf.printWasted(measure);
}
function MonthJail2({currentDayOfMonth,...props}){
    return (
        <div></div>
    );

}
class MonthJail1 extends React.Component{
    constructor(props){
        super(props);
        // this.renderCeils=this.renderCeils.bind(this);
        
    }

    render(){
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