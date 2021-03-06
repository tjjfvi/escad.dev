import { Vector3 } from "./Vector3.ts";
import { Plane } from "./Plane.ts";
import { createLeafProductUtils, Id, LeafProduct } from "../core/mod.ts";

const faceId = Id.create(
  import.meta.url,
  "@escad/3d",
  "LeafProduct",
  "Face",
);
export interface Face extends LeafProduct {
  readonly type: typeof faceId;
  readonly points: readonly Vector3[];
  readonly plane: Plane;
}

export const Face = {
  id: faceId,
  create: (points: readonly Vector3[]): Face => ({
    type: faceId,
    points,
    plane: Plane.create(points),
  }),
  ...createLeafProductUtils<Face, "Face">(faceId, "Face"),
  toTriangles: (face: Face): Face[] =>
    face.points.slice(2).map((_, i) =>
      Face.create([face.points[0], face.points[i + 1], face.points[i + 2]])
    ),
  flip: (face: Face) => Face.create([...face.points].reverse()),
};
