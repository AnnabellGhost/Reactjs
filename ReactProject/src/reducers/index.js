import { combineReducers } from 'redux';

function Items(state=[],action){
	switch(action.type){
		case 'ADD_NEW_ITEM':
			if(action.text.toString().length===0){
				return state;
			}else{
				return [
			{
				text:action.text,
				id:action.id
			}
			,...state];
			}
		case 'DELETE_ITEM':
			return state.filter((item)=>(item.id!==action.id));
		case 'EDIT_ITEM':
			return state.map((item)=>{
				if(item.id===action.id) {item.text=action.text;return item;}
				else return item;
			});
		default :
			return state;
	}
};

const reducers=combineReducers({Items});
export default reducers;

// state.delete(action.id);