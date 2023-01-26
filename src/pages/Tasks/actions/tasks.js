const receiveTasks=tasks=>({
    tasks,
    type:'RECEIVE_TASKS'
});

const requestTasks=()=>({
    type:'REQUEST_TASKS'
});

const errorReceiveTasks=()=>({
    type:'ERROR_RECEIVE_TASKS'
})

const getTasks=(tasksCount)=> {
    const url = "http://localhost:8080/task?count=" + tasksCount;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    };
return fetch(url,options);
}

const fetchTasks=({tasksCount})=>(dispatch)=>{
    dispatch(requestTasks());
    return getTasks(tasksCount)
        .then(tasks=>dispatch(receiveTasks(tasks)))
        .catch(()=>dispatch(errorReceiveTasks()));
};