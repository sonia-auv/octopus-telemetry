import { createContext, useContext } from 'react';
import {
  ActiveModules,
  ImageViewerMeta,
  ThrustersMeta,
} from '../components/modulepicker/ModulesMetadata';

const defaultModules: ActiveModules = {
  data: {
    imageViewer: {
      active: true,
      meta: ImageViewerMeta,
    },
    thrusters: {
      active: true,
      meta: ThrustersMeta,
    },
  },
};

export type GeneralContextType = {
  isDarkMode: boolean;
  isDryRunMode: boolean;
  isRelativeUnits: boolean;
  isRoboticArmClosed: boolean;
  isWayPointVelocityMode: boolean;
  activeModules: ActiveModules;

  setIsDarkMode: (units: boolean) => void;
  setIsDryRunMode: (mode: boolean) => void;
  setIsRelativeUnits: (units: boolean) => void;
  setIsRoboticArmClosed: (units: boolean) => void;
  setIsWayPointVelocityMode: (units: boolean) => void;

  setActiveModules: (activeModules: ActiveModules) => void;
};

export const GeneralContext = createContext<GeneralContextType>({
  isDarkMode: true,
  isDryRunMode: false,
  isRelativeUnits: false,
  isRoboticArmClosed: false,
  isWayPointVelocityMode: false,
  activeModules: defaultModules,
  setIsDarkMode: (units) => {},
  setIsRelativeUnits: (units) => {},
  setIsDryRunMode: (mode) => {},
  setIsRoboticArmClosed: (value) => {},
  setIsWayPointVelocityMode: (value) => {},
  setActiveModules: (modules) => {},
});

export const useGeneral = () => useContext(GeneralContext);
export { defaultModules };
export type { ActiveModules };
