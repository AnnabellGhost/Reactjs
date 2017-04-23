import React from 'react';
import PlanType from './PlanType';
import './less/planTypes.less';
function TypeCategory ({category,types}) {
    let typesList=types.map((type)=><PlanType key={type.tplId} {...type} />);
    return(
        <div>
            <p className="category-name">{category}</p>
            <ul className="types">{typesList}</ul>
        </div>
    );
}
export default TypeCategory;