import GraphVertex from "../../data-structures/graph/GraphVertex";

export default function getVertexCoordinates(vertex: GraphVertex) {
  const [x, y] = vertex.getKey().split("_")[1].split(":")
  return [Number(x), Number(y)]
}