import React from "react";

export const funcionesEntidadesContext = React.createContext();

export function FuncionesParaEntidadesContext({ children }) {





  return (
    <funcionesEntidadesContext.Provider
    value={{

    }}
    >
      {children}
    </funcionesEntidadesContext.Provider>
  )
}