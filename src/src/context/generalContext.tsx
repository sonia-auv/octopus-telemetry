import {createContext, useContext} from 'react';

export type GeneralContextType = {
    isDryRunMode: boolean,
    isRelativeUnits: boolean,
    isRoboticArmClosed: boolean,

    setIsDryRunMode: (mode: boolean) => void,
    setIsRelativeUnits: (units: boolean) => void,
    setIsRoboticArmClosed: (units: boolean) => void
}

export const GeneralContext = createContext<GeneralContextType>({
    isDryRunMode: false,
    isRelativeUnits: false,
    isRoboticArmClosed: false,
    setIsRelativeUnits: units => {},
    setIsDryRunMode: mode => {},
    setIsRoboticArmClosed: value => {}});

export const useGeneral = () => useContext(GeneralContext);