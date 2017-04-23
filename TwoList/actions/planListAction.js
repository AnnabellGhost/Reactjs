/* Created by Zhang Xingping on 20170327 */
import {FETCH_ALL_PLANS} from '../constants/ActionType';
import API from '../configs/api';
import {mtpFetch} from '../utils/utils';
import {Popup} from '../../common/base/components/popup/popup';
export function fetchAllPlans(data){
	return (dispatch,setState)=>{
		dispatch({type:'START_FETCHING_ALL_PLANS'});
		mtpFetch(API.queryPlanList,data).then(function(response){
        if(response.resultCode == '1000'){
			return dispatch({
				  type:FETCH_ALL_PLANS,
				  planList:response.schedules,
			});
      	}else{
        	Popup(response.resultMsg);
      	}
		
		}.bind(this));
	}
}