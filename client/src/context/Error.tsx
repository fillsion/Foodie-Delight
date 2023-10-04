import React, { createContext} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ErrorContextProps {
  showError: (message: string) => void;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

interface ErrorProviderProps {
  children: JSX.Element;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }: ErrorProviderProps) => {
  const notify = (message = "General error") => toast(message);
  const showError = (message: string) => {
    notify(message);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      <>
        <ToastContainer />
        {children}
      </>
    </ErrorContext.Provider>
  );
};
