import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface UserContextProps {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextProps>({
  isLogged: false,
  setIsLogged: () => {}
});

interface UserProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
};