import pfdModuleBig from '../image/pfd_module_big.png'
import testBoardBig from '../image/test_board_big.png'
import waypointsModuleBig from '../image/waypoints_module_big.png'
import thrustersModuleBig from '../image/thrusters_module_big.png'
import actuatorsModuleBig from '../image/actuators_module_big.png'
import cameraModuleBig from '../image/camera_module_big.png'
import visionUiModuleBig from '../image/visionui_module_big.png'
import missionManagerBig from '../image/mission_manager_big.png'
import powerModuleBig from '../image/powermodule_big.png'
import controlModuleBig from '../image/control_module_big.png'
import setPwmModuleBig from '../image/set_pwm_module_big.png'
import setTemplateModuleBig from '../image/set_pwm_module_big.png'

interface ModuleMetadata {
  key: string;
  name: string;
  thumbnailLabel: string;
  thumbnailSource: string;
}

interface Module {
  active: boolean;
  meta: ModuleMetadata;
}

interface ActiveModules {
  data: Record<string, Module>;
}

const ImageViewer1Meta: ModuleMetadata = {
  key: 'imageViewer1',
  name: 'Image Viewer 1',
  thumbnailLabel: 'image-viewer-1-thumbnail',
  thumbnailSource: cameraModuleBig,
};

const ImageViewer2Meta: ModuleMetadata = {
  key: 'imageViewer2',
  name: 'Image Viewer 2',
  thumbnailLabel: 'image-viewer-2-thumbnail',
  thumbnailSource: cameraModuleBig,
};

const ActuatorsMetadata: ModuleMetadata = {
  key: 'actuators',
  name: 'Actuators',
  thumbnailLabel: 'actuators-thumbnail',
  thumbnailSource: actuatorsModuleBig,
};

const ThrustersMeta: ModuleMetadata = {
  key: 'thrusters',
  name: 'Thrusters',
  thumbnailLabel: 'thrusters-thumbnail',
  thumbnailSource: thrustersModuleBig,
};

const TestBoardMeta: ModuleMetadata = {
  key: 'testBoard',
  name: 'Test board',
  thumbnailLabel: 'test-board-thumbnail',
  thumbnailSource: testBoardBig,
};

const PFDMeta: ModuleMetadata = {
  key: 'pfd',
  name: 'PFD',
  thumbnailLabel: 'pfd-thumbnail',
  thumbnailSource: pfdModuleBig,
};

const VisionUIMeta: ModuleMetadata = {
  key: 'visionUi',
  name: 'Vision UI',
  thumbnailLabel: 'visionui-thumbnail',
  thumbnailSource: visionUiModuleBig,
};

const WaypointsMeta: ModuleMetadata = {
  key: 'waypoints',
  name: 'Waypoints',
  thumbnailLabel: 'waypoints-thumbnail',
  thumbnailSource: waypointsModuleBig,
};

const PowerModuleMeta: ModuleMetadata = {
  key: 'powerModule',
  name: 'Powermodule',
  thumbnailLabel: 'powermodule-thumbnail',
  thumbnailSource: powerModuleBig
}

const MissionManagerMeta: ModuleMetadata = {
  key: 'missionManager',
  name: 'Mission Manager',
  thumbnailLabel: 'missionManager-thumbnail',
  thumbnailSource: missionManagerBig,
};

const ControlModuleMeta: ModuleMetadata = {
  key: 'controlModule',
  name: 'Control Module',
  thumbnailLabel: 'controlModule-thumbnail',
  thumbnailSource: controlModuleBig,
};

const SetPwmModuleMeta: ModuleMetadata = {
  key: 'setPwmModule',
  name: 'Set Pwm Module',
  thumbnailLabel: 'setPwmModule-thumbnail',
  thumbnailSource: setPwmModuleBig,
};

const TemplateModuleMeta: ModuleMetadata = {
  key: 'templateModule',
  name: 'Template Module',
  thumbnailLabel: 'templateModule-thumbnail',
  thumbnailSource: setTemplateModuleBig,
};

const ModulesMetadata: Array<ModuleMetadata> = [
  ImageViewer1Meta,
  ImageViewer2Meta,
  ActuatorsMetadata,
  ThrustersMeta,
  TestBoardMeta,
  PFDMeta,
  VisionUIMeta,
  WaypointsMeta,
  PowerModuleMeta,
  MissionManagerMeta,
  ControlModuleMeta,
  SetPwmModuleMeta,
  TemplateModuleMeta,
];

export {
  ModulesMetadata,
  ImageViewer1Meta,
  ImageViewer2Meta,
  ActuatorsMetadata,
  ThrustersMeta,
  TestBoardMeta,
  PFDMeta,
  VisionUIMeta,
  WaypointsMeta,
  PowerModuleMeta,
  MissionManagerMeta,
  ControlModuleMeta,
  SetPwmModuleMeta,
  TemplateModuleMeta,
};

export type { Module, ModuleMetadata, ActiveModules };
