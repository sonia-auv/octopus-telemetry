const ModulesMetadata: Array<ModuleMetadata>  = [
    {
      key: 'imageViewer',
      name: 'ImageViewer',
      thumbnailLabel: 'image-viewer-thumbnail',
      thumbnailSource: 'http://placehold.it/300/300',
    },
    {
      key: 'thrusters',
      name: 'Thrusters',
      thumbnailLabel: 'thrusters-thumbnail',
      thumbnailSource: 'http://placehold.it/300/300',
    },
];

interface ModuleMetadata {
    key: string;
    name: string;
    thumbnailLabel: string;
    thumbnailSource: string;
}

  
export { ModulesMetadata }
export type {ModuleMetadata}