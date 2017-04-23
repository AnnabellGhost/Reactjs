/* Created by Zhang Xingping on 20170327 */
import {FETCH_ALL_PLANS} from '../constants/ActionType';
const initialState={
 	planList:[],
	outcomeLength :0,
	incomeLength :0,
	isFetchingAllPlans:false,
 }
export default function planList(state=initialState,action){
	switch(action.type){
		case 'START_FETCHING_ALL_PLANS':
			return Object.assign({},state,{isFetchingAllPlans:true,});
		case FETCH_ALL_PLANS:
			return Object.assign({},state,{
				planList:action.planList.map((plan,index)=>{
					return {
						id:index,
						date:plan.executionDate,
						plans:[
							{
								amount:plan.amount,
								name:plan.fsName,
								id:plan.fsId,
								iconPath:plan.iconPath,
								serviceType:plan.serviceType,
								income:plan.income,
								tplId:plan.tplId,
							}
						]
					}
				}),
				outcomeLength:action.planList.filter((plan)=>!plan.income).length,
				incomeLength:action.planList.filter((plan)=>plan.income).length,
				isFetchingAllPlans:false,
			});
		default:
			return state;
	}
 }