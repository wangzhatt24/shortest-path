import dijkstra, { ShortestPaths } from "./algorithms/graph/dijkstra/dijkstra";
import Graph from "./data-structures/graph/Graph";
import GraphEdge from "./data-structures/graph/GraphEdge";
import GraphVertex from "./data-structures/graph/GraphVertex";

interface Point {
  id: string;
  x: number;
  y: number;
  sum: number;
}

interface GameData {
  n: number | null;
  startingPoint: Point | null;
  endingPoint: Point | null;
  barrierPoints: Point[];
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

  for (let i = 0; i < n; i++) {
    const tr = document.createElement("tr")
    for (let j = 0; j < n; j++) {
      const td = document.createElement("td")
      const tdId = `${i}:${j}`
      // const tdTextContent = `${i}:${j}`
      const tdTextContent = `${i + j} - ${i}:${j}`

      myGraph.addVertex(new GraphVertex(`v_${tdId}`))

      td.style.padding = "20px"
      td.style.textAlign = "center"
      td.style.borderRadius = "50%"
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
function colorPath(shorestPaths: ShortestPaths, vertexDesKey: string) {
  //@ts-ignore
  if (shorestPaths.previousVertices[vertexDesKey] === null) {
    return null;
  } else {
    const id = vertexDesKey.split("_")[1]
    const td = document.getElementById(id) as HTMLDataElement
    td.style.backgroundColor = 'red'

    //@ts-ignore
    return colorPath(shorestPaths, shorestPaths.previousVertices[vertexDesKey].value)
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
  n: null,
  startingPoint: null,
  endingPoint: null,
  barrierPoints: []
}


// Bắt sự kiện click vào nút khởi tạo playground
const playgroundInitBtn = document.getElementById("playgroundInitBtn") as HTMLButtonElement
playgroundInitBtn.addEventListener("click", () => {
  const playgroundInitInput = document.getElementById("playgroundInitInput") as HTMLInputElement | null
  const playgroundData = document.getElementById("playgroundData") as HTMLParagraphElement

  if (playgroundInitInput === null) throw new Error("Nhập vào null")
  if (didInitPlayground) throw new Error("Playground đã được khởi tạo")

  // Tạo playground sử dụng table với kích thước n*n
  const n = Number(playgroundInitInput.value)
  const playground = createPlayground(n);

  // Sửa thông tin trong gameData
  gameData.n = n

  // Nhét playground vào root
  root.appendChild(playground)
  didInitPlayground = true

  // Thông báo
  playgroundData.textContent = `Khởi tạo với n = ${playgroundInitInput.value}`
})


// Đặt điểm bắt đầu vào playground
const startingPointInitBtn = document.getElementById("startingPointInitBtn") as HTMLButtonElement
startingPointInitBtn.addEventListener("click", () => {
  const xStartingPoint = document.getElementById("xStartingPoint") as HTMLInputElement
  const yStartingPoint = document.getElementById("yStartingPoint") as HTMLInputElement
  const td = document.getElementById(`${xStartingPoint.value}:${yStartingPoint.value}`) as HTMLDataElement

  td.style.backgroundColor = "green"

  // Lưu vào gameData
  gameData.startingPoint = {
    id: td.id,
    x: Number(xStartingPoint.value),
    y: Number(yStartingPoint.value),
    sum: Number(xStartingPoint.value) + Number(yStartingPoint.value)
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

  // Lưu vào gameData
  gameData.endingPoint = {
    id: td.id,
    x: Number(xEndingPoint.value),
    y: Number(yEndingPoint.value),
    sum: Number(xEndingPoint.value) + Number(yEndingPoint.value)
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
  td.className = "barrier"

  const barrier = {
    id: `${xBarrierPoint.value}:${yBarrierPoint.value}`,
    x: Number(xBarrierPoint.value),
    y: Number(yBarrierPoint.value),
    sum: Number(xBarrierPoint.value) + Number(yBarrierPoint.value)
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
  
  const shorestPaths = getShortestPathsByDijkstra(`v_${gameData.startingPoint?.id}`, myGraph)
  console.log(shorestPaths)
  colorPath(shorestPaths, `v_${gameData.endingPoint?.id}`)
})

