/*By Zhang Xingping on 20170628*/
import React from 'react';
const DateCell=({...props})=>{
    // console.log(props);
        return(
            <div>
                <span>{props.date}</span>
                {props.planName?
                    <span onClick={props.onDateClick}>{props.planName}</span>:null
                }
                {props.clickableTest?
                    <span onClick={()=>alert("clickableTest!")} style={{fontSize:'8px'}}>Click</span>:null
                }
            </div>
        );

}
 
export default DateCell;