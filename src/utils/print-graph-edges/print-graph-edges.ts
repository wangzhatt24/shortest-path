import Graph from "../../data-structures/graph/Graph";
import createSpanAndFormat from "../format-span/format-span";

export default function printGraphEdges(graph: Graph, printTo: HTMLDivElement) {
  graph.getAllEdges().forEach(e => {
    printTo.appendChild(createSpanAndFormat(e, "5px", "gray", "1px solid black", "3px"))
  })
}