import {  ADD_To_Card, ADD_To_Wishlist,  Remove_From_Card, Remove_From_Wishlist } from "../ActionTypes";


export function addItemtoCard(data){
    return{
        type:ADD_To_Card,
        payload:data,
    }
}

export const removeItemFromCard=index=>({
    type:Remove_From_Card,
    payload:index,
});

export const addItemtoWishlist=data=>({
    type:ADD_To_Wishlist,
    payload:data,
});

export const removeItemFromWishlist=index=>({
    type:Remove_From_Wishlist,
    payload:index,
});

