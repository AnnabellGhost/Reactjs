import {combineReducers} from 'redux';

const initialState={
    isFetching:false,
    '20178':{
        monthID:'20178',
        plans:[
            {
                dateOfMonth:8,
                plansPerDay:[
                    {
                        planName:'Deposite',
                        amount:'200',
                    },
                    {
                        planName:'Deposite',
                        amount:'1200', 
                    },
                    {
                        planName:'TransOut',
                        amount:'600',
                    },
                ]
            },
                
        ], 
    },
    
}
/*const statckdSubjectsSelector=createSelector(
    [state=>state.list],
    list=>stackAndGetTopLevelSubjects(list)
);
const listSelector=state=>({});
function subjectToHash(subjects){
    let hash={};
    subjects.forEach(s=>hash[s.monthID]=s);
}*/
function subjectToHash(subject){
    let hash={};
    let {ID,...monthData}=subject;
    // subjects.forEach(s=>hash[s.monthID]=s);
    hash[ID]=monthData;
    console.log('subjectToHash'+hash);
    return hash;
}
export function calendar(state=initialState,action){
    switch(action.type){
        case 'FETCH_CALENDAR_MONTH':
            return Object.assign({},state,{...subjectToHash(action.payload)});
        /*case 'LOAD_SUBJECT_RESULT':
            return Object.assign({},state,{list:statckdSubjectsSelector()})*/;
        default :
            return state;
    }
}
export function calendar1(state=initialState,action){
    switch(action.type){
        case 'FETCH_CALENDAR_MONTH':
            return Object.assign({},state,{...subjectToHash(action.payload)});
        /*case 'LOAD_SUBJECT_RESULT':
            return Object.assign({},state,{list:statckdSubjectsSelector()})*/;
        default :
            return state;
    }
}
// export {calendar,calendar1};
//  calendarTable