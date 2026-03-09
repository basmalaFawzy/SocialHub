import axios from "axios";
import { createContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const UserContext = createContext(null);

async function fetchUserData() {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    },
  );
  
  return response.data.data.user;
}

export default function UserContextProvider({ children }) {
  const queryClient = useQueryClient();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    retry: false,
  });

  function setUserData(newData) {
    queryClient.setQueryData(["userData"], newData);
  }

  function getUserData() {
    return queryClient.invalidateQueries({ queryKey: ["userData"] });
  }

  return (
    <UserContext.Provider
      value={{ userData, setUserData, getUserData, isLoading, isError }}
    >
      {children}
    </UserContext.Provider>
  );
}
