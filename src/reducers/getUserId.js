const idReducer = (state = "testing", action) => {
    switch (action.type) {
        case 'UPDATE_ID':
            state = action.id;
            return state;
        default:
            return state;
    }
}

export default idReducer;