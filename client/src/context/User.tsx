import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface UserContextProps {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps>({
  isLogged: false,
  setIsLogged: () => { },
  userEmail: '',
  setUserEmail: () => { },
});

interface UserProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged, userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};