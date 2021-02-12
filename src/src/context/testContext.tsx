import React, {createContext, useContext} from 'react';

export type GeneralContextType = {
    isDryMode: boolean,
    isRelativeUnits: boolean,

    setDryMode: (mode: boolean) => void,
    setUnits: (units: boolean) => void
}

export const GeneralContext = createContext<GeneralContextType>({
    isDryMode: false,
    isRelativeUnits: false,
    setUnits: units => console.warn('changing units'),
    setDryMode: mode => console.warn('changing mode')});
export const useGeneral = () => useContext(GeneralContext);