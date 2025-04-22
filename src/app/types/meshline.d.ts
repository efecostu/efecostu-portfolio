import { ComponentProps } from "react";
import * as THREE from "three";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ComponentProps<"mesh">;
      meshLineMaterial: ComponentProps<"meshBasicMaterial"> & {
        color?: string;
        depthTest?: boolean;
        resolution?: [number, number];
        useMap?: boolean;
        map?: THREE.Texture;
        repeat?: [number, number];
        lineWidth?: number;
        transparent?: boolean;
      };
    }
  }
}
