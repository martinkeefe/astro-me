import type { BufferGeometry, EdgesGeometry } from "three";

export * from "./geometry";

export type Range = {
  off: number;
  scale: number;
  num: number;
};

export type FaceFunc = (
  i: number,
  j: number,
  u_dom: Range,
  v_dom: Range,
  u: number,
  v: number
) => boolean;

export type ParasurfDef = {
  calc: (
    ur: Range,
    vr: Range,
    p: number[],
    t: number,
    ff: FaceFunc
  ) => { body: BufferGeometry; wire: EdgesGeometry };
  domain: {
    name: string;
    min: number;
    max: number;
    steps: number;
    pi?: boolean;
  }[];
};
