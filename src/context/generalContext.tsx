import { createContext, useContext } from 'react';
import {
  Module,
  ActiveModules,
  ImageViewer1Meta,
  ThrustersMeta,
  ImageViewer2Meta,
  ActuatorsMetadata,
  TestBoardMeta,
  PFDMeta,
  VisionUIMeta,
  WaypointsMeta,
  PowerModuleMeta,
  MissionManagerMeta,
  ControlModuleMeta,
  SetPwmModuleMeta,
  TargetModuleMeta,
  TemplateModuleMeta,
} from '../components/modulepicker/ModulesMetadata';

const defaultModules: ActiveModules = {
  data: {
    imageViewer1: {
      active: true,
      meta: ImageViewer1Meta,
    },
    imageViewer2: {
      active: true,
      meta: ImageViewer2Meta,
    },
    actuators: {
      active: true,
      meta: ActuatorsMetadata,
    },
    thrusters: {
      active: true,
      meta: ThrustersMeta,
    },
    testBoard: {
      active: false,
      meta: TestBoardMeta,
    },
    pfd: {
      active: true,
      meta: PFDMeta,
    },
    visionUi: {
      active: false,
      meta: VisionUIMeta,
    },
    waypoints: {
      active: false,
      meta: WaypointsMeta
    },
    powerModule: {
      active: true,
      meta: PowerModuleMeta
    },
    missionManager: {
      active: false,
      meta: MissionManagerMeta
    },
    controlModule: {
      active: true,
      meta: ControlModuleMeta
    },
    setPwmModule: {
      active: true,
      meta: SetPwmModuleMeta
    },
    targetModule: {
      active: true,
      meta: TargetModuleMeta
    },
    templateModule: {
      active: true,
      meta: TemplateModuleMeta
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

  updateActiveModule: (activeModule: Module, active: boolean) => void;
};

export const GeneralContext = createContext<GeneralContextType>({
  isDarkMode: true,
  isDryRunMode: false,
  isRelativeUnits: false,
  isRoboticArmClosed: false,
  isWayPointVelocityMode: false,
  activeModules: defaultModules,
  setIsDarkMode: (units) => {},
  setIsDryRunMode: (mode) => {},
  setIsRelativeUnits: (units) => {},
  setIsRoboticArmClosed: (value) => {},
  setIsWayPointVelocityMode: (value) => {},
  setActiveModules: (modules) => {},
  updateActiveModule: (module, boolean) => {},
});

export const useGeneral = () => useContext(GeneralContext);
export { defaultModules };
export type { ActiveModules };
