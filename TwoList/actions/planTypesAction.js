/*Created by Zhang Xingping on 20170329*/
import {mtpFetch} from '../utils/utils';
import API from '../configs/api';
import {FETCH_ALL_PLAN_TYPES} from '../constants/ActionType';
import {Popup} from '../../common/base/components/popup/popup';
export function fetchAllPlanTypes(){
	return (dispatch,getState) => {
		/*Start Fetching*/
		dispatch({type:'START_FETCHING_TYPES'});
        mtpFetch(API.queryPlanTypes,{}).then(function (response) {
           	if(response.resultCode=="1000"){
				/*Fetching*/   
				return dispatch({
					type:FETCH_ALL_PLAN_TYPES,
					planTypes:[
						{
							category:"定时转入",
							id:1001,
							types:response.incomeTpls,
						},
						{
							category:"定时转出",
							id:1002,
							types:response.expandTpls,
						}
					]});
      			}else{
        			Popup(response.resultMsg);
      			}
			}.bind(this));	
	}
}


	  