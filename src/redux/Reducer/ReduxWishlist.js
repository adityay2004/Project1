
import { ADD_To_Wishlist, Remove_From_Wishlist } from "../ActionTypes";


const initialstate = [];
const reducerWishlist = (state = initialstate, action) => {
    switch (action.type) {
        case ADD_To_Wishlist:
            return [
                ...state, action.payload
            ];
        case Remove_From_Wishlist:
            const deletedArray = state.filter((item, index) => {
                return item.id !== action.payload.id;
            });
            return deletedArray;
        default:
            return state;
    };
}

export default reducerWishlist;