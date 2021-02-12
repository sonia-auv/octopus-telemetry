import React, {createContext, useContext} from 'react';

export type GeneralContextType = {
    isDryRunMode: boolean,
    isRelativeUnits: boolean,

    setIsDryRunMode: (mode: boolean) => void,
    setIsRelativeUnits: (units: boolean) => void
}

export const GeneralContext = createContext<GeneralContextType>({
    isDryRunMode: false,
    isRelativeUnits: false,
    setIsRelativeUnits: units => console.warn('changing units'),
    setIsDryRunMode: mode => console.warn('changing mode')});
export const useGeneral = () => useContext(GeneralContext);