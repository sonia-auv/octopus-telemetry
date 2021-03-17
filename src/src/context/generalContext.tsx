import {createContext, useContext} from 'react';

export type GeneralContextType = {
    isDryRunMode: boolean,
    isRelativeUnits: boolean,
    isRoboticArmClosed: boolean,
    isWayPointVelocityMode: boolean,

    setIsDryRunMode: (mode: boolean) => void,
    setIsRelativeUnits: (units: boolean) => void,
    setIsRoboticArmClosed: (units: boolean) => void,
    setIsWayPointVelocityMode: (units: boolean) => void
}

export const GeneralContext = createContext<GeneralContextType>({
    isDryRunMode: false,
    isRelativeUnits: false,
    isRoboticArmClosed: false,
    isWayPointVelocityMode: false,
    setIsRelativeUnits: units => {},
    setIsDryRunMode: mode => {},
    setIsRoboticArmClosed: value => {},
    setIsWayPointVelocityMode: value => {},
});

export const useGeneral = () => useContext(GeneralContext);