import {createContext, useContext} from 'react';

export type GeneralContextType = {
    isDryRunMode: boolean,
    isRelativeUnits: boolean,

    setIsDryRunMode: (mode: boolean) => void,
    setIsRelativeUnits: (units: boolean) => void
}

export const GeneralContext = createContext<GeneralContextType>({
    isDryRunMode: false,
    isRelativeUnits: false,
    setIsRelativeUnits: units => {},
    setIsDryRunMode: mode => {}});
export const useGeneral = () => useContext(GeneralContext);