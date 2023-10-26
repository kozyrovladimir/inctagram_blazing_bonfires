import React, { PropsWithChildren } from "react";

type AddPostContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AddPostContext = React.createContext<AddPostContextType | undefined>(undefined);

const AddPostContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AddPostContext.Provider value={{isOpen, setIsOpen}}>
      {/*temp button*/}
      <button onClick={() => setIsOpen(true)}>click</button>
      {children}
    </AddPostContext.Provider>
  );
};

export const useAddPostContext = () => {
  const context = React.useContext(AddPostContext);

  if (context === undefined) {
    throw new Error('useAddPostContext must be used within a AddPostContextProvider');
  }

  return context;
}

export default AddPostContextProvider;
