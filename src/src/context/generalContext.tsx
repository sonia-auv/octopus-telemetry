import {createContext, useContext} from 'react';

export type GeneralContextType = {
    isDarkMode: boolean
    isDryRunMode: boolean,
    isRelativeUnits: boolean,
    isRoboticArmClosed: boolean,
    isWayPointVelocityMode: boolean,

    setIsDarkMode: (units: boolean) => void
    setIsDryRunMode: (mode: boolean) => void,
    setIsRelativeUnits: (units: boolean) => void,
    setIsRoboticArmClosed: (units: boolean) => void,
    setIsWayPointVelocityMode: (units: boolean) => void,

}

export const GeneralContext = createContext<GeneralContextType>({
    isDarkMode: true,
    isDryRunMode: false,
    isRelativeUnits: false,
    isRoboticArmClosed: false,
    isWayPointVelocityMode: false,
    setIsDarkMode: units => {},
    setIsRelativeUnits: units => {},
    setIsDryRunMode: mode => {},
    setIsRoboticArmClosed: value => {},
    setIsWayPointVelocityMode: value => {},
});

export const useGeneral = () => useContext(GeneralContext);