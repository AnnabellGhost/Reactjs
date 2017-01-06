export function editItem(id,text){
	return{
		type:'EDIT_ITEM',
		id:id,
		text:text
	}
}