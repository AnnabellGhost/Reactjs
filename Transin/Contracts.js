import React from 'react';
const Contracts =({contractType})=>{
    let iframe=`<iframe style="width:100%;height: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;" src="https://d.1qianbao.com/activity/h5/${contractType}.html"></iframe>`;
    return (
        <div 
            dangerouslySetInnerHTML={{__html:iframe}}>
        </div>
    );
}
export default Contracts;
    