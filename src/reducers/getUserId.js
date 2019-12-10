const idReducer = (state = null, action) => {
    switch (action.type) {
        case 'initialize':
            state = action.id;
            return state;
        default:
            return state;
    }
}

export default idReducer;