export function dataCollector_PlanType(serviceType,inLength,outLength,tplId,name){
	let listName = serviceType === "001" ? "活期转入" : serviceType === "002" ? "活期转出" : serviceType === "003" ? "信用卡还款" : serviceType === "004" ? "转账" : "未知";
	let cardUrl = serviceType === "001" && inLength < 5 ? `yqbBalance/index.html#/autotransfer/edit?tplId=${tplId}` :
		serviceType === "003" && outLength < 100 ? `/creditout?tplId=${tplId}` :
		serviceType === "004" && outLength < 100 ? `/transferout?tplId=${tplId}` :
		"";
	var params = new HashMap();
	params.put(`${name}`, name);
	params.put("cardId", tplId);
	params.put("cardUrl", cardUrl);
	params.put("listName", listName);
	serviceType === "001" ? Agent.customizeEvent('Event_HQGJHQChooseIn', params, null) : Agent.customizeEvent('Event_HQGJHQChooseOut', params, null);

}
export function dataCollector_PlanList(outcomeLength,incomeLength){
    outcomeLength+incomeLength===0?
    	Agent.customizeEvent('Event_HQGJProAddPlanN',null,null):
    	Agent.customizeEvent('Event_HQGJProAddPlanY',null,null);
        
}

export function dataCollector_PlanList_Plan(id,amount,serviceType){
	let cardUrl = amount === 0 && serviceType === '003' ? `/creditout?fsId=${id}` : `/plandetail?fsId=${id}`;
	let listName = serviceType === "001" ? "活期转入" : serviceType === "002" ? "活期转出" : serviceType === "003" ? "信用卡还款" : serviceType === "004" ? "转账" : "未知";
	let cardName = `计划金额-${amount}元_结果-成功`;
	var params = new HashMap();
	params.put("cardId", id);
	params.put("cardName", cardName);
	params.put("cardUrl", cardUrl);
	params.put("listName", listName);
	Agent.customizeEvent('Event_HQGJProPlan', params, null);
}







