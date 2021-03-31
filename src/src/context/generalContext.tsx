import {createContext, useContext} from 'react';
import ImageViewer from '../components/ImageViewer';
import { ModuleMetadata, ModulesMetadata } from '../components/modulepicker/ModulesMetadata';
import ThrustersModule from '../components/ThustersModule';

interface Module {
    id: number;
    active: boolean;
    meta: ModuleMetadata
}

interface ActiveModules {
    data: Record<string, Module> 
}

const ImageViewerMeta: ModuleMetadata = {
    key: 'imageViewer',
    name: "Image Viewer",
    thumbnailLabel: "A label!",
    thumbnailSource: "http://placehold.it/400/400"
}

const ThrustersMeta: ModuleMetadata = {
    key: 'thrusters',
    name: "Thrusters",
    thumbnailLabel: "Thrusters",
    thumbnailSource: "http://placehold.it/300/300"
}

const defaultModules: ActiveModules = {
    data: {
        "imageViewer": {
            id: 0,
            active: true,
            meta: ImageViewerMeta
        },
        "thrusters": {
            id: 1,
            active: false,
            meta: ThrustersMeta
        }
    }
}

export type GeneralContextType = {
    isDarkMode: boolean
    isDryRunMode: boolean,
    isRelativeUnits: boolean,
    isRoboticArmClosed: boolean,
    isWayPointVelocityMode: boolean,
    activeModules: ActiveModules,

    setIsDarkMode: (units: boolean) => void
    setIsDryRunMode: (mode: boolean) => void,
    setIsRelativeUnits: (units: boolean) => void,
    setIsRoboticArmClosed: (units: boolean) => void,
    setIsWayPointVelocityMode: (units: boolean) => void,

    setActiveModules: (activeModules: ActiveModules) => void,
}

export const GeneralContext = createContext<GeneralContextType>({
    isDarkMode: true,
    isDryRunMode: false,
    isRelativeUnits: false,
    isRoboticArmClosed: false,
    isWayPointVelocityMode: false,
    activeModules: defaultModules,
    setIsDarkMode: units => {},
    setIsRelativeUnits: units => {},
    setIsDryRunMode: mode => {},
    setIsRoboticArmClosed: value => {},
    setIsWayPointVelocityMode: value => {},
    setActiveModules: modules => {}
});

export const useGeneral = () => useContext(GeneralContext);
export {defaultModules}
export type { ActiveModules }
