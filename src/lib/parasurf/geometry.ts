import * as THREE from "three";
import type { FaceFunc, Range } from ".";

function lerp(a: number, b: number, t: number) {
  return t * b + (1 - t) * a;
}

function vlerp(v1: number[], v2: number[], t: number) {
  return [lerp(v1[0], v2[0], t), lerp(v1[1], v2[1], t), lerp(v1[2], v2[2], t)];
}

export function calcParametricGeometry(
  func: (arg0: number, arg1: number, arg2: number, arg3: number) => any,
  u_dom: Range,
  v_dom: Range,
  t: number,
  facefn: FaceFunc
) {
  const MULT = 1;
  const slices = u_dom.num * MULT;
  const stacks = v_dom.num * MULT;

  const verts: number[] = [];
  const faces: number[] = [];
  const uvs: number[] = [];

  let stackCount = stacks + 1;
  let sliceCount = slices + 1;

  // var wire_geometry = new THREE.Geometry();

  for (let i = 0; i <= stacks; i++) {
    let v = i / stacks;
    for (let j = 0; j <= slices; j++) {
      let u = j / slices;
      let p = func(u, v, j, i);
      if (p) {
        let pt;
        if (t < 1) {
          //p = vlerp([(u*u_dom.scale) + u_dom.off, (v*v_dom.scale) + v_dom.off, 0], p, t);
          pt = vlerp(p.uv0, p.xyz, t);
        } else {
          pt = p.xyz;
        }
        verts.push(pt[0], pt[1], pt[2]);
      }
    }
  }

  /*
      i ^
      | d----c
      | |    |
      | a----b
      +-------->
           j
    */

  for (let i = 0; i < stacks; i++) {
    for (let j = 0; j < slices; j++) {
      const a = i * sliceCount + j;
      const b = i * sliceCount + j + 1;
      const c = (i + 1) * sliceCount + j + 1;
      const d = (i + 1) * sliceCount + j;

      const uva = [j / slices, i / stacks];
      const uvb = [(j + 1) / slices, i / stacks];
      const uvc = [(j + 1) / slices, (i + 1) / stacks];
      const uvd = [j / slices, (i + 1) / stacks];

      let show = true;
      if (facefn) show = facefn(i, j, u_dom, v_dom, uva[0], uva[1]);

      if (show) {
        faces.push(a, b, d);
        uvs.push(...uva, ...uvb, ...uvd);

        faces.push(b, c, d);
        uvs.push(...uvb, ...uvc, ...uvd);
      }

      // var va = verts[a].clone(),
      //   vb = verts[b].clone(),
      //   vc = verts[c].clone(),
      //   vd = verts[d].clone();

      // if (i % MULT == 0) wire_geometry.vertices.push(va, vb);
      // if (j % MULT == 0) wire_geometry.vertices.push(va, vd);

      // if (i === stacks - 1) wire_geometry.vertices.push(vc, vd);
      // if (j === slices - 1) wire_geometry.vertices.push(vb, vc);
    }
  }

  const body_geometry = new THREE.BufferGeometry();
  body_geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(verts), 3)
  );
  body_geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uvs), 2)
  );

  const wire_geometry = new THREE.EdgesGeometry(body_geometry);

  //body_geometry.computeCentroids();
  // body_geometry.computeFaceNormals();
  body_geometry.computeVertexNormals();

  // wire_geometry.computeLineDistances();

  return {
    body: body_geometry,
    wire: wire_geometry,
  };
}
