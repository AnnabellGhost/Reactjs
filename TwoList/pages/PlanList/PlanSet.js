/* created by Zhang Xingping on 20170327 */
import React from 'react';
import Plan from './Plan';
import './less/planList.less';
function PlanSet({planSet}) {
    let plans= planSet.plans.map( plan => 
        <Plan 
            name={plan.name}
            amount={plan.amount!==0?plan.amount.toString().slice(0,-2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").concat(".").concat(plan.amount.toString().slice(-2)):0}
            id={plan.id}
            status={plan.amount===0?"还款金额待设置":"待执行"}
            key={plan.id} 
            iconPath={plan.iconPath}
            serviceType={plan.serviceType}
            income={plan.income}
        />
    );
    return (
        <div>
            <p className="planSetDate">{`${planSet.date.slice(0,4)}.${planSet.date.slice(4,6)}.${planSet.date.slice(6)}`}</p>
            <ul className="plans">{plans}</ul>
        </div>
    );
}

export default PlanSet;
