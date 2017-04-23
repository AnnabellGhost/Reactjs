import {FETCH_ALL_PLAN_TYPES} from '../constants/ActionType';
const initialState={
	planTypes:[],
	isFetchingTypes:false,
}
export default function planTypes(state=initialState,action){
	switch(action.type){
		case 'START_FETCHING_TYPES':
			return Object.assign({},state,{isFetchingTypes:true,});
		case FETCH_ALL_PLAN_TYPES:
			return Object.assign({},state,{isFetchingTypes:false,planTypes:action.planTypes});
		default:
			return state;
	}
}