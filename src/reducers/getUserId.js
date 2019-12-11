const idReducer = (state = "testing", action) => {
    switch (action.type) {
        case 'UPDATE_ID':
            return action.id;
        default:
            return state;
    }
}

export default idReducer;