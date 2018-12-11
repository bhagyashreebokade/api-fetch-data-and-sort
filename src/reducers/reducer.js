const initialState = {userList:[],buttonText:"Sort ASC",currentSort:"DEF"};

const reducer = (state = initialState, action) => {
    console.log("state::",state,action);
    
    let newState = Object.assign({},state);
    console.log("newstate::",newState,action);
    switch(action.type){
        case "SORT_ASC":{
            console.log("action.user...",action.userList);
            newState.userList = action.userList.sort((a,b)=>((a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0)));
            newState.buttonText = "Sort DESC";
            newState.currentSort = "ASC";
            console.log("newState :: ",newState);
            return newState;
        }
        case "SORT_DESC":{
            newState.userList = action.userList.reverse();
            newState.buttonText = "Sort ASC";
            newState.currentSort = "DESC";
            return newState;
        }
        default:{
            return newState;
        }
    }
}

export default reducer;