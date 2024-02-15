import React, { useState, createContext } from 'react';

const AuthContext = createContext({ user: null, setUser: () => { } });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loginData, SetloginData] = useState([]);

  const [wishlistdata, setWishlistdata] = useState([]);
  const [carddata, setCarddata] = useState([]);
  return (
    <AuthContext.Provider value={{
      data: [user, setUser], login: [loginData, SetloginData]
      , wishlist: [wishlistdata, setWishlistdata], card: [carddata, setCarddata]
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };