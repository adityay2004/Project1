
const { ADD_To_Card, Remove_From_Card } = require("../ActionTypes");

const initialstate = [];
const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case ADD_To_Card:
            return [
                ...state, action.payload
            ];
        case Remove_From_Card:
            const fildata1 = state.filter((el) => el.id != action.payload.id);
            const fildata = state.filter((el) => el.id === action.payload.id);
            if (fildata.length > 0)
                fildata.pop()
            return [...fildata1, ...fildata];
        default:
            return state;
    };
}

export default reducer;