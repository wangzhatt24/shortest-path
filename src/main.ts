import dijkstra, { ShortestPaths } from "./algorithms/graph/dijkstra/dijkstra";
import Graph from "./data-structures/graph/Graph";
import GraphEdge from "./data-structures/graph/GraphEdge";
import GraphVertex from "./data-structures/graph/GraphVertex";
import aStarSearchOnGraph from "./my-implement/a-star-search-on-graph/a-star-search-on-graph";
import bfsOnGraph from "./my-implement/bfs-on-graph/bfs-on-graph";
import dfsOnGraph from "./my-implement/dfs-on-graph/dfs-on-graph";
import greedySearchOnGraph from "./my-implement/greedy-search-on-graph/greedy-search-on-graph";
import idsOnGraph from "./my-implement/ids-on-graph/ids-on-graph";
import { colorVisitedVertexsByVertexId } from "./utils/color-visited-vertexs/color-vertexs";
import printGraphEdges from "./utils/print-graph-edges/print-graph-edges";
import { printVisitedVertexs } from "./utils/printVisitedVertexs/print-visited-vertexs";
import { removeV_s } from "./utils/remove-v_/remove-v_";

enum cellOperationData {
  incre = "increase scrore",
  decre = "decrease scrore",
  no = "no"
}

interface Point {
  id: string;
  x: number;
  y: number;
  sum: number;
  cellOperation: cellOperationData;
}

export interface GameData {
  n: number;
  startingPoint: Point | null;
  endingPoint: Point | null;
  barrierPoints: Point[];
  increasePoints: Point[];
  decreasePoints: Point[];
}

// function getSumValueOfPointValue(str: string) {
//   // check str match 
//   if (str.match(/v_\d+:\d+/) === null) {
//     throw new Error("Chuỗi không đúng định dạng")
//   }

//   // sample: v_0:1
//   //Lay ra 0:1
//   const strSplit1 = str.split("_")

//   const strSplit2 = strSplit1[1].split(":")

//   const sum = Number(strSplit2[0]) + Number(strSplit2[1])

//   return sum
// }

function createPlayground(n: number) {
  // Làm từ table
  // Cột ngang  là x
  // Cột dọc    là y
  // Cần thêm một cột ngang trên cùng để đặt số vd 1, 2, 3...
  // Cần thêm một cột dọc ngoài cùng để đặt số  vd 1, 2, 3...
  const table = document.createElement("table")
  table.id = "playgroundTable"

  for (let i = 1; i <= n; i++) {
    const tr = document.createElement("tr")
    for (let j = 1; j <= n; j++) {
      const td = document.createElement("td")
      const tdId = `${i}:${j}`
      // const tdTextContent = `${i}:${j}`
      const tdTextContent = `${i + j} - ${i}:${j}`

      myGraph.addVertex(new GraphVertex(`v_${tdId}`))

      td.style.padding = "20px"
      td.style.textAlign = "center"
      // td.style.borderRadius = "50%"
      td.style.border = "1px solid black"
      td.id = tdId
      td.addEventListener("mouseover", () => td.style.cursor = "pointer")
      td.textContent = tdTextContent
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }

  return table;
}

function checkAndPushBarrier(barrier: Point) {
  let duplicated = false

  if (gameData.barrierPoints.length === 0) {
    gameData.barrierPoints.push(barrier)
  } else {
    gameData.barrierPoints.forEach(b => {
      if (b.id === barrier.id) duplicated = true
    })

    if (duplicated) {
      console.error("Trùng lặp vật cản")
      return false
    }

    gameData.barrierPoints.push(barrier)
  }

  return true
}

/**
 * Hàm này nhận vào một chuỗi như v_0:0 và trả về vế trái +1 như v_1:0
 * @param vertextKey 
 */
function leftVertexUpper(vertextKey: string) {
  // check str match 
  if (vertextKey.match(/v_\d+:\d+/) === null) {
    throw new Error("Chuỗi không đúng định dạng")
  }

  //v_0:0
  // Cắt ra v và 0:0
  const spl1 = vertextKey.split("_")
  const [left, right] = spl1[1].split(":")

  // Trả về v_0:1
  return `v_${Number(left) + 1}:${right}`
}

/**
 * Hàm này nhận vào một chuỗi như v_0:0 và trả về vế phải +1 như v_0:1
 * @param vertextKey 
 */
function rightVertexUpper(vertextKey: string) {
  // check str match 
  if (vertextKey.match(/v_\d+:\d+/) === null) {
    throw new Error("Chuỗi không đúng định dạng")
  }

  //v_0:0
  // Cắt ra v và 0:0
  const spl1 = vertextKey.split("_")
  const [left, right] = spl1[1].split(":")

  // Trả về v_0:1
  return `v_${left}:${Number(right) + 1}`
}

function leftHandler(vertexKey: string) {
  const leftVertex = leftVertexUpper(vertexKey)

  //@ts-ignore
  if (myGraph.vertices[leftVertex] === undefined) {
    // do nothing
  } else {
    const vertex1 = myGraph.getVertexByKey(vertexKey)
    const vertex2 = myGraph.getVertexByKey(leftVertex)
    const newEdge = new GraphEdge(vertex1, vertex2, 1)

    myGraph.addEdge(newEdge)
  }
}

function rightHandler(vertextKey: string) {
  const rightVertex = rightVertexUpper(vertextKey)

  //@ts-ignore
  if (myGraph.vertices[rightVertex] === undefined) {
    // do nothing
  } else {
    const vertex1 = myGraph.getVertexByKey(vertextKey)
    const vertex2 = myGraph.getVertexByKey(rightVertex)
    const newEdge = new GraphEdge(vertex1, vertex2, 1)

    myGraph.addEdge(newEdge)
  }
}

// Tìm đường đi từ đỉnh str đến tất cả các đỉnh khác bằng disska
function getShortestPathsByDijkstra(vertexBegin: string, graph: Graph): ShortestPaths {
  const vertex = graph.getVertexByKey(vertexBegin)
  return dijkstra(graph, vertex)
}

/**
 * Viết hàm nhận một shorestPath bằng dijkstra
 * và tô màu những path đó
 * màu đỏ nhé
 */
function colorShortestPaths(shorestPaths: ShortestPaths, vertexDesKey: string) {
  //@ts-ignore
  if (shorestPaths.previousVertices[vertexDesKey] === null) {
    return null;
  } else {
    const id = vertexDesKey.split("_")[1]
    const td = document.getElementById(id) as HTMLDataElement
    td.style.backgroundColor = 'red'

    //@ts-ignore
    return colorShortestPaths(shorestPaths, shorestPaths.previousVertices[vertexDesKey].value)
  }
}

/**
Cho một bàn cờ kích thước n x n. Hãy tìm đường đi ngắn nhất từ điểm 〇 đến điểm △ biết rằng:
Các ô trắng là đường đi
Các ô đen là vật cản, không đi được
Tại một ô bất kỳ, chỉ có thể đi lên, xuông, trái, phải nếu không bị cản. Không được đi chéo
wikipedia giai thuat tim kiem A*
 */

const root = document.getElementById("root") as HTMLDivElement
let didInitPlayground = false;
const gameData: GameData = {
  n: 0,
  startingPoint: null,
  endingPoint: null,
  barrierPoints: [],
  increasePoints: [],
  decreasePoints: [],
}


// Bắt sự kiện click vào nút khởi tạo playground
const playgroundInitBtn = document.getElementById("playgroundInitBtn") as HTMLButtonElement
playgroundInitBtn.addEventListener("click", () => {
  const playgroundInitInput = document.getElementById("playgroundInitInput") as HTMLInputElement | null
  const playgroundDataP = document.getElementById("playgroundDataP") as HTMLParagraphElement

  if (playgroundInitInput === null) throw new Error("Nhập vào null")
  if (didInitPlayground) throw new Error("Playground đã được khởi tạo")

  // Tạo playground sử dụng table với kích thước n*n
  const n = Number(playgroundInitInput.value)
  const playground = createPlayground(n)

  // Sửa thông tin trong gameData
  gameData.n = n

  // Bỏ playground vào root
  root.appendChild(playground)
  didInitPlayground = true

  // Thông báo
  playgroundDataP.textContent = `Khởi tạo với n = ${playgroundInitInput.value} với tập cạnh sau đây`
})


// Đặt điểm bắt đầu vào playground
const startingPointInitBtn = document.getElementById("startingPointInitBtn") as HTMLButtonElement
startingPointInitBtn.addEventListener("click", () => {
  const xStartingPoint = document.getElementById("xStartingPoint") as HTMLInputElement
  const yStartingPoint = document.getElementById("yStartingPoint") as HTMLInputElement
  const td = document.getElementById(`${xStartingPoint.value}:${yStartingPoint.value}`) as HTMLDataElement

  td.style.backgroundColor = "green"
  td.style.border = "5px solid green"

  // Lưu vào gameData
  gameData.startingPoint = {
    id: td.id,
    x: Number(xStartingPoint.value),
    y: Number(yStartingPoint.value),
    sum: Number(xStartingPoint.value) + Number(yStartingPoint.value),
    cellOperation: cellOperationData.no
  }

  // Xuất thông báo ra html 
  const startingPointData = document.getElementById("startingPointData") as HTMLDivElement
  const span = document.createElement("span") as HTMLSpanElement
  span.textContent = `${gameData.startingPoint.id}`
  span.style.border = '1px solid black'
  span.style.padding = '5px'
  span.style.borderRadius = '3px'
  span.style.display = 'inline-block'
  span.style.backgroundColor = 'green'

  startingPointData.appendChild(span)
  // startingPointData.textContent = `Điểm bắt đầu id: ${gameData.startingPoint.id}, x: ${gameData.startingPoint.x}, y: ${gameData.startingPoint.y}`
})


// Đặt điểm kết thúc vào playground
const endingPointInitBtn = document.getElementById("endingPointInitBtn") as HTMLButtonElement
endingPointInitBtn.addEventListener("click", () => {
  const xEndingPoint = document.getElementById("xEndingPoint") as HTMLInputElement
  const yEndingPoint = document.getElementById("yEndingPoint") as HTMLInputElement
  const td = document.getElementById(`${xEndingPoint.value}:${yEndingPoint.value}`) as HTMLDataElement

  td.style.backgroundColor = "blue"
  td.style.border = "5px solid blue"

  // Lưu vào gameData
  gameData.endingPoint = {
    id: td.id,
    x: Number(xEndingPoint.value),
    y: Number(yEndingPoint.value),
    sum: Number(xEndingPoint.value) + Number(yEndingPoint.value),
    cellOperation: cellOperationData.no
  }

  // Xuất thông báo ra html 
  const endingPointData = document.getElementById("endingPointData") as HTMLDivElement
  const span = document.createElement("span")
  span.textContent = `${gameData.endingPoint.id}`
  span.style.padding = '5px'
  span.style.border = '1px solid black'
  span.style.borderRadius = '3px'
  span.style.margin = '5px'
  span.style.display = 'inline-block'
  span.style.backgroundColor = 'blue'

  endingPointData.appendChild(span)
  // endingPointData.textContent = `Điểm kết thúc id: ${gameData.endingPoint.id}, x: ${gameData.endingPoint.x}, y: ${gameData.endingPoint.y}`
})


// Đặt các vật cản vào playground
const addBarrierBtn = document.getElementById("addBarrierBtn") as HTMLInputElement
addBarrierBtn.addEventListener("click", () => {
  const xBarrierPoint = document.getElementById("xBarrierPoint") as HTMLInputElement
  const yBarrierPoint = document.getElementById("yBarrierPoint") as HTMLInputElement
  const td = document.getElementById(`${xBarrierPoint.value}:${yBarrierPoint.value}`) as HTMLDataElement

  td.style.backgroundColor = "DarkGray"
  td.classList.add("barrier")

  const barrier: Point = {
    id: `${xBarrierPoint.value}:${yBarrierPoint.value}`,
    x: Number(xBarrierPoint.value),
    y: Number(yBarrierPoint.value),
    sum: Number(xBarrierPoint.value) + Number(yBarrierPoint.value),
    cellOperation: cellOperationData.no 
  }
  const pushBarrier = checkAndPushBarrier(barrier)

  // Xóa đỉnh barrier trong tập đỉnh của graph
  //@ts-ignore
  delete myGraph.vertices[`v_${barrier.id}`]

  if (pushBarrier) {
    const barrierData = document.getElementById("barrierData") as HTMLDivElement
    const spanBarrier = document.createElement("span")

    spanBarrier.textContent = barrier.id
    spanBarrier.style.border = "1px solid black"
    spanBarrier.style.margin = "5px"
    spanBarrier.style.padding = "5px"
    spanBarrier.style.borderRadius = "3px"
    spanBarrier.style.backgroundColor = "DarkGray"

    barrierData.appendChild(spanBarrier)
  }
})

// Đặt ô tăng điểm vào playground
const addIncreaseBtn = document.getElementById("addIncreaseBtn") as HTMLButtonElement
addIncreaseBtn.addEventListener("click", () => {
  const xIncreasePoint = document.getElementById("xIncreasePoint") as HTMLInputElement
  const yIncreasePoint = document.getElementById("yIncreasePoint") as HTMLInputElement
  const td = document.getElementById(`${xIncreasePoint.value}:${yIncreasePoint.value}`) as HTMLDataElement

  td.style.border = '5px solid #00BFFF'
  td.classList.add('increasePoint')

  // Lưu vào gameData
  const increasePoint: Point = {
    id: td.id,
    x: Number(xIncreasePoint.value),
    y: Number(yIncreasePoint.value),
    sum: Number(xIncreasePoint.value) + Number(yIncreasePoint.value),
    cellOperation: cellOperationData.incre
  }
  gameData.increasePoints.push(increasePoint)

  // Xuất thông báo ra html 
  const increasePointData = document.getElementById("increasePointData") as HTMLDivElement
  const span = document.createElement("span") as HTMLSpanElement
  span.textContent = `${increasePoint.id}`
  span.style.border = '1px solid #00BFFF'
  span.style.padding = '5px'
  span.style.borderRadius = '3px'
  span.style.display = 'inline-block'
  // span.style.backgroundColor = 'green'

  increasePointData.appendChild(span)
})

// Đặt ô trừ điểm vào playground
const addDecreaseBtn = document.getElementById("addDecreaseBtn") as HTMLButtonElement
addDecreaseBtn.addEventListener("click", () => {
  const xDecreasePoint = document.getElementById("xDecreasePoint") as HTMLInputElement
  const yDecreasePoint = document.getElementById("yDecreasePoint") as HTMLInputElement
  const td = document.getElementById(`${xDecreasePoint.value}:${yDecreasePoint.value}`) as HTMLDataElement

  td.style.border = '5px solid chocolate'
  td.classList.add('increasePoint')

  // Lưu vào gameData
  const decreasePoint: Point = {
    id: td.id,
    x: Number(xDecreasePoint.value),
    y: Number(yDecreasePoint.value),
    sum: Number(xDecreasePoint.value) + Number(yDecreasePoint.value),
    cellOperation: cellOperationData.decre
  }
  gameData.decreasePoints.push(decreasePoint)

  // Xuất thông báo ra html 
  const decreasePointData = document.getElementById("decreasePointData") as HTMLDivElement
  const span = document.createElement("span") as HTMLSpanElement
  span.textContent = `${decreasePoint.id}`
  span.style.border = '1px solid chocolate'
  span.style.padding = '5px'
  span.style.borderRadius = '3px'
  span.style.display = 'inline-block'
  // span.style.backgroundColor = 'green'

  decreasePointData.appendChild(span)
})

// Graph section
const myGraph = new Graph()

// Tạo đỉnh tạo cạnh làm sao đây? done nhe
const createGraphBtn = document.getElementById("createGraphBtn") as HTMLButtonElement

createGraphBtn.addEventListener("click", () => {
  // lặp dô từng vertex của mygraph
  // ví dụ v_0:0
  // duyệt phải + 1 tức là v_0:1
  // nếu đỉnh đó có tồn tại thì tạo edge nối đỉnh hiện tại và đỉnh đó
  // sau đó duyệt trái +1 tức là v_1:0
  // nếu đỉnh đó có tồn tại thì tạo edge nối đỉnh hiện tại và đỉnh đó

  for (const key in myGraph.vertices) {
    rightHandler(key)
    leftHandler(key)
  }
  
  const createGrapStatusDiv = document.getElementById("createGraphStatus") as HTMLDivElement
  const p = document.createElement("p")
  p.textContent = "Graph đã được tạo thành công!"
  createGrapStatusDiv.appendChild(p)

  console.log(`Graph đã được tạo thành công!`)
  // console.log(myGraph)

  // in tập cạnh
  const playgroundData = document.getElementById("playgroundData") as HTMLDivElement
  printGraphEdges(myGraph, playgroundData)

  // gọi hàm đánh dấu level cho graph
  levelMark()
  console.log(myGraph)

})

function levelMark() {
  const currentVertex = Object.keys(myGraph.vertices)[0]
  let level = 0

  //@ts-ignore
  myGraph.level[`level_${level}`] = [currentVertex]

  createLevelFrom(level)

  console.log(myGraph)
  console.log(gameData)
}

function createLevelFrom(level: number) {
   /**
   * level_0: [v_1:1]
   * level_1: [v_1:2, v_2:1]
   * level_2: [v_1:3, v_2:2, v_3:1]
   */
  //từ level 0 tạo level 1 kiểm tra level tiếp theo có thể hay không?
  let levelVertexs: string[] = []

  while(true) {
    //@ts-ignore
    let vertexsFromLevel: string[] = myGraph.level[`level_${level}`]
    vertexsFromLevel.forEach(v => {
      getPossibleNeighborVertex(v).forEach(v => {
        levelVertexs.push(v)
      })
    })


    levelVertexs = removeDuplicatedVertexs(levelVertexs)
    levelVertexs = removeInvalidVertexs(levelVertexs)
    levelVertexs = removeBarrierVertexs(levelVertexs)

    if(levelVertexs.length === 0) {
      break;
    }

    level++

    //@ts-ignore
    myGraph.level[`level_${level}`] = [...levelVertexs]
    levelVertexs.length = 0
  }
}

function removeBarrierVertexs(levelVertexs: string[]) {
  // lấy tất cả barrier
  // duyệt từng levelvertex nào có chứa barrier thì bỏ
  const allBarrierTds = document.getElementsByClassName("barrier")
  const barrierIds: string[] = []

  for (const e of allBarrierTds) {
    barrierIds.push(`v_${e.id}`)
  }

  return levelVertexs.filter(lv => !barrierIds.includes(lv))
}

function removeDuplicatedVertexs(levelVertexs: string[]) {
  const newSet = new Set(levelVertexs)
  return Array.from(newSet)
}

function removeInvalidVertexs(levelVertexs: string[]) {
  return levelVertexs.filter(lv => {
    return isValidVertex(lv)
  })
}

function isValidVertex(vertex: string) {
  if(myGraph.getVertexByKey(vertex)) {
    return true
  } else {
    return false
  }
}

function getPossibleNeighborVertex(vertex: string): string[] {
  const playgroundInitInput = document.getElementById("playgroundInitInput") as HTMLInputElement
  const n = Number(playgroundInitInput.value)
  const [x, y] = getCoordinates(vertex)

  const result = []

  if(y + 1 <= n) {
    result.push(`v_${x}:${y+1}`)
  }

  if(x + 1 <= n) {
    result.push(`v_${x+1}:${y}`)
  }

  return result
}

function getCoordinates(vertex: string) {
  //v_0:1
  const [x, y] = vertex.split("_")[1].split(":")

  return [Number(x), Number(y)]
}

const dijkstraSearchBtn = document.getElementById("dijkstraSearchBtn") as HTMLButtonElement
dijkstraSearchBtn.addEventListener("click", () => {
  console.time("Dijkstra time")
  const shorestPaths = getShortestPathsByDijkstra(`v_${gameData.startingPoint?.id}`, myGraph)
  console.timeEnd("Dijkstra time")

  console.log(`Shortest path by dijkstra`)
  console.log(shorestPaths)

  colorShortestPaths(shorestPaths, `v_${gameData.endingPoint?.id}`)
})


const bfsOnGraphBtn = document.getElementById("bfsOnGraphBtn") as HTMLButtonElement
bfsOnGraphBtn.addEventListener("click", () => {
  //@ts-ignore
  const startingVertex = myGraph.getVertexByKey(`v_${gameData.startingPoint?.id}`)
  //@ts-ignore
  const goalVertex = myGraph.getVertexByKey(`v_${gameData.endingPoint?.id}`)

  console.time("BFS time")
  //@ts-ignore
  const visitedVertexs = bfsOnGraph(myGraph, startingVertex, goalVertex)
  console.timeEnd("BFS time")

  // Tô màu những đỉnh đã duyệt
  colorVisitedVertexsByVertexId(removeV_s(visitedVertexs), "yellow")

  // Xuất thông tin những đỉnh đã duyệt lên màn hình
  const bfsOnGraphStatus = document.getElementById("bfsOnGraphStatus") as HTMLDivElement
  printVisitedVertexs(removeV_s(visitedVertexs),"yellow", bfsOnGraphStatus)
})


const dfsOnGraphBtn = document.getElementById("dfsOnGraphBtn") as HTMLButtonElement
dfsOnGraphBtn.addEventListener("click", () => {
  //@ts-ignore
  const startingVertex = myGraph.getVertexByKey(`v_${gameData.startingPoint?.id}`)
  //@ts-ignore
  const goalVertex = myGraph.getVertexByKey(`v_${gameData.endingPoint?.id}`)

  console.time("DFS time")
  const visitedVertexs = dfsOnGraph(startingVertex, goalVertex)
  console.timeEnd("DFS time")
  
  // Tô màu những đỉnh đã duyệt
  colorVisitedVertexsByVertexId(removeV_s(visitedVertexs), "aqua")

  // Xuất thông tin những đỉnh đã duyệt lên màn hình
  const dfsOnGraphStatus = document.getElementById("dfsOnGraphStatus") as HTMLDivElement
  printVisitedVertexs(removeV_s(visitedVertexs),"aqua", dfsOnGraphStatus)
})

const idsOnGraphBtn = document.getElementById("idsOnGraphBtn") as HTMLButtonElement
idsOnGraphBtn.addEventListener("click", () => {
  //@ts-ignore
  const startingVertex = myGraph.getVertexByKey(`v_${gameData.startingPoint?.id}`)
  //@ts-ignore
  const goalVertex = myGraph.getVertexByKey(`v_${gameData.endingPoint?.id}`)

  console.time("IDS time")
  const result = idsOnGraph(startingVertex, goalVertex, myGraph)
  // console.log(result)
  console.timeEnd("IDS time")

  // Tô màu những đỉnh đã duyệt
  colorVisitedVertexsByVertexId(removeV_s(result.visitedVertexs), "blue")

  // Xuất thông tin những đỉnh đã duyệt lên màn hình
  const idsOnGraphStatus = document.getElementById("idsOnGraphStatus") as HTMLDivElement
  const p = document.createElement("p")
  p.textContent = `Found at level: ${result.atLevel}`
  idsOnGraphStatus.appendChild(p)
  printVisitedVertexs(removeV_s(result.visitedVertexs),"blue", idsOnGraphStatus)
})

const greedySearchOnGraphBtn = document.getElementById("greedySearchOnGraphBtn") as HTMLButtonElement
greedySearchOnGraphBtn.addEventListener("click", () => {
  //@ts-ignore
  const startingVertex = myGraph.getVertexByKey(`v_${gameData.startingPoint?.id}`)
  //@ts-ignore
  const goalVertex = myGraph.getVertexByKey(`v_${gameData.endingPoint?.id}`)

  console.time("Greedy Search Time")
  const result = greedySearchOnGraph(startingVertex, goalVertex, myGraph, gameData)
  // console.log(result)
  console.timeEnd("Greedy Search Time")

  // Tô màu những đỉnh đã duyệt
  colorVisitedVertexsByVertexId(removeV_s(result), "orange")

  // Xuất thông tin những đỉnh đã duyệt lên màn hình
  const greedySearchOnGraphStatus = document.getElementById("greedySearchOnGraphStatus") as HTMLDivElement
  printVisitedVertexs(removeV_s(result), "orange", greedySearchOnGraphStatus)
})

const aStarSearchOnGraphBtn = document.getElementById("aStarSearchOnGraphBtn") as HTMLButtonElement
aStarSearchOnGraphBtn.addEventListener("click", () => {
  //@ts-ignore
  const startingVertex = myGraph.getVertexByKey(`v_${gameData.startingPoint?.id}`)
  //@ts-ignore
  const goalVertex = myGraph.getVertexByKey(`v_${gameData.endingPoint?.id}`)

  console.time("A start Search Time")
  const result = aStarSearchOnGraph(startingVertex, goalVertex, myGraph, gameData)
  // console.log(result)
  console.timeEnd("A start Search Time")

  // Tô màu những đỉnh đã duyệt
  colorVisitedVertexsByVertexId(removeV_s(result), "pink")

  // Xuất thông tin những đỉnh đã duyệt lên màn hình
  const aStarSearchOnGraphStatus = document.getElementById("aStarSearchOnGraphStatus") as HTMLDivElement
  printVisitedVertexs(removeV_s(result), "pink", aStarSearchOnGraphStatus)
})

