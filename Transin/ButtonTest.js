import React from 'react';
import './less/button.less'
// import WithLoading from './WithLoading';
// isActive,
/*cusStyle [bottom,fixed,basic]*/
function Button({ButtonName,onClick,status,cusStyle}){
	return(
			<div className={`button-container_${cusStyle}${status?'--disable':'--able'}`} >
				<button 
					onClick={onClick} disabled={status}>
						{ButtonName}
				</button>
			</div>
		);
}
// export default WithLoading(Button);
export default Button;
/*BEM Naming*/
// button-container_basic--disable
// button-container_basic--disable
//className={`button--${cusStyle}${status?' buttonDisabled':' buttonAbled'}`} 