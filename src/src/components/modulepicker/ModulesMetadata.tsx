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

const ImageViewerMeta: ModuleMetadata = {
  key: 'imageViewer',
  name: 'Image Viewer',
  thumbnailLabel: 'Image Viewer',
  thumbnailSource: 'http://placehold.it/400/400',
};

const ThrustersMeta: ModuleMetadata = {
  key: 'thrusters',
  name: 'Thrusters',
  thumbnailLabel: 'Thrusters',
  thumbnailSource: 'http://placehold.it/300/300',
};

const ModulesMetadata: Array<ModuleMetadata> = [ImageViewerMeta, ThrustersMeta];

export { ModulesMetadata, ImageViewerMeta, ThrustersMeta };
export type { ModuleMetadata, ActiveModules };
