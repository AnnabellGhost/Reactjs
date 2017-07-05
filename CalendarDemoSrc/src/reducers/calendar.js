import {combineReducers} from 'redux';

const initialState={
    
        '201705':{
            monthID:'201705',
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
function subjectToHash(subjects){
    let hash={};
    subjects.forEach(s=>hash[s.monthID]=s);
}
function calendar(state=initialState,action){
    switch(action.type){
        case 'FETCH_CALENDAR_MONTH':
            return Object.assign({},state,{});
        /*case 'LOAD_SUBJECT_RESULT':
            return Object.assign({},state,{list:statckdSubjectsSelector()})*/;
        default :
            return state;
    }
}
const reducers=combineReducers({calendar});
export default reducers;