const initialState = {
    isLoading: false,
    isError: false,
    list: [],
    name: "This is tasks from Back-End",
}
// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case 'ERROR_RECEIVE_TASKS': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        case 'REQUEST_TASKS': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'RECEIVE_TASKS': {
            const {
                tasks,
            } = action;
            return {
                ...state,
                isLoading: false,
                list: tasks,
                isError: false,
            };
        }
        default:
            return state;
    }
}