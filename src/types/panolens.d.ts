declare module 'panolens' {
  import * as THREE from 'three';

  export class ImagePanorama extends THREE.Mesh {
    constructor(imageUrl: string);
  }

  export class Viewer {
    constructor(options?: {
      container?: HTMLElement;
      autoRotate?: boolean;
      autoRotateSpeed?: number;
    });

    add(panorama: ImagePanorama): void;
    remove(panorama: ImagePanorama): void;
    dispose(): void;
  }
}
