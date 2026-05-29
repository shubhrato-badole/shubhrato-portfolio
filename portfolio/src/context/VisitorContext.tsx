import React,  {  useContext , createContext , useState } from "react";

interface VisitorContextType{
    visitorName : string
    setVisitorName: (name: string) => void
    hasEntered: boolean
  setHasEntered: (value: boolean) => void

}
 const VisitorContext = createContext<VisitorContextType | null>(null)

export function VisitorProvider({children}:{children: React.ReactNode }){
    const [visitorName , setVisitorName] = useState('')
    const [hasEntered , setHasEntered] = useState(false)

    return(
        <VisitorContext.Provider value={{
         visitorName,
          setVisitorName,
          hasEntered,
          setHasEntered,
        }} >
        {children}
  </VisitorContext.Provider>
    )
}


export function UseVisitor() {
  const ctx = useContext(VisitorContext)
  if (!ctx) throw new Error('useVisitor must be inside VisitorProvider')
  return ctx
}