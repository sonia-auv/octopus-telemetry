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
  thumbnailSource: 'http://placehold.it/400/400',
};

const ImageViewer2Meta: ModuleMetadata = {
  key: 'imageViewer2',
  name: 'Image Viewer 2',
  thumbnailLabel: 'image-viewer-2-thumbnail',
  thumbnailSource: 'http://placehold.it/200/200',
};

const ActuatorsMetadata: ModuleMetadata = {
  key: 'actuators',
  name: 'Actuators',
  thumbnailLabel: 'actuators-thumbnail',
  thumbnailSource: 'http://placehold.it/400/400',
};

const ThrustersMeta: ModuleMetadata = {
  key: 'thrusters',
  name: 'Thrusters',
  thumbnailLabel: 'thrusters-thumbnail',
  thumbnailSource: 'http://placehold.it/300/300',
};

const TestBoardMeta: ModuleMetadata = {
  key: 'testBoard',
  name: 'Test board',
  thumbnailLabel: 'test-board-thumbnail',
  thumbnailSource: 'http://placehold.it/500/500',
};

const PFDMeta: ModuleMetadata = {
  key: 'pfd',
  name: 'PFD',
  thumbnailLabel: 'pfd-thumbnail',
  thumbnailSource: 'http://placehold.it/400/400',
};

const VisionUIMeta: ModuleMetadata = {
  key: 'visionUi',
  name: 'Vision UI',
  thumbnailLabel: 'visionui-thumbnail',
  thumbnailSource: 'http://placehold.it/300/300',
};

const ModulesMetadata: Array<ModuleMetadata> = [
  ImageViewer1Meta,
  ImageViewer2Meta,
  ActuatorsMetadata,
  ThrustersMeta,
  TestBoardMeta,
  PFDMeta,
  VisionUIMeta,
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
};
export type { Module, ModuleMetadata, ActiveModules };
