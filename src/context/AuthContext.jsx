import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [userToken, setuserToken] = useState(localStorage.getItem("userToken"));
  const [logedUserId, setLogedUserId] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setuserToken(localStorage.getItem("userToken"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      const { user } = jwtDecode(localStorage.getItem("userToken")); //loged-in user Id
      setLogedUserId(user);
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ userToken, setuserToken, logedUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
