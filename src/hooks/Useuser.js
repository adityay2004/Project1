import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/Index";


export const Useuser = () => {
    const { data, login } = React.useContext(AuthContext);
    const [user, setUser] = data;
    return [user, setUser]
}

export const Loginuser = () => {
    const { data, login } = React.useContext(AuthContext);
    const [user, setUser] = login;
    return [user, setUser]
}


export const AddtoCard = () => {
    const { card } = React.useContext(AuthContext);
    const [carddata, setCarddata] = card;
    return [carddata, setCarddata]
}

export const AddtoWishlist = () => {
    const { wishlist } = React.useContext(AuthContext);
    const [wishlistdata, setWishlistdata] = wishlist;
    return [wishlistdata, setWishlistdata]
}