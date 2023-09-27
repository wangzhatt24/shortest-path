(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class h{constructor(e){this.compare=e||h.defaultCompareFunction}static defaultCompareFunction(e,t){return e===t?0:e<t?-1:1}equal(e,t){return this.compare(e,t)===0}lessThan(e,t){return this.compare(e,t)<0}greaterThan(e,t){return this.compare(e,t)>0}lessThanOrEqual(e,t){return this.lessThan(e,t)||this.equal(e,t)}greaterThanOrEqual(e,t){return this.greaterThan(e,t)||this.equal(e,t)}reverse(){const e=this.compare;this.compare=(t,n)=>e(n,t)}}class m{constructor(e){if(new.target===m)throw new TypeError("Cannot construct Heap instance directly");this.heapContainer=[],this.compare=new h(e)}getLeftChildIndex(e){return 2*e+1}getRightChildIndex(e){return 2*e+2}getParentIndex(e){return Math.floor((e-1)/2)}hasParent(e){return this.getParentIndex(e)>=0}hasLeftChild(e){return this.getLeftChildIndex(e)<this.heapContainer.length}hasRightChild(e){return this.getRightChildIndex(e)<this.heapContainer.length}leftChild(e){return this.heapContainer[this.getLeftChildIndex(e)]}rightChild(e){return this.heapContainer[this.getRightChildIndex(e)]}parent(e){return this.heapContainer[this.getParentIndex(e)]}swap(e,t){const n=this.heapContainer[t];this.heapContainer[t]=this.heapContainer[e],this.heapContainer[e]=n}peek(){return this.heapContainer.length===0?null:this.heapContainer[0]}poll(){if(this.heapContainer.length===0)return null;if(this.heapContainer.length===1)return this.heapContainer.pop();const e=this.heapContainer[0];return this.heapContainer[0]=this.heapContainer.pop(),this.heapifyDown(),e}add(e){return this.heapContainer.push(e),this.heapifyUp(),this}remove(e,t=this.compare){const n=this.find(e,t).length;for(let i=0;i<n;i+=1){const s=this.find(e,t).pop();if(s===this.heapContainer.length-1)this.heapContainer.pop();else{this.heapContainer[s]=this.heapContainer.pop();const o=this.parent(s);this.hasLeftChild(s)&&(!o||this.pairIsInCorrectOrder(o,this.heapContainer[s]))?this.heapifyDown(s):this.heapifyUp(s)}}return this}find(e,t=this.compare){const n=[];for(let i=0;i<this.heapContainer.length;i+=1)t.equal(e,this.heapContainer[i])&&n.push(i);return n}isEmpty(){return!this.heapContainer.length}toString(){return this.heapContainer.toString()}heapifyUp(e){let t=e||this.heapContainer.length-1;for(;this.hasParent(t)&&!this.pairIsInCorrectOrder(this.parent(t),this.heapContainer[t]);)this.swap(t,this.getParentIndex(t)),t=this.getParentIndex(t)}heapifyDown(e=0){let t=e,n=null;for(;this.hasLeftChild(t)&&(this.hasRightChild(t)&&this.pairIsInCorrectOrder(this.rightChild(t),this.leftChild(t))?n=this.getRightChildIndex(t):n=this.getLeftChildIndex(t),!this.pairIsInCorrectOrder(this.heapContainer[t],this.heapContainer[n]));)this.swap(t,n),t=n}pairIsInCorrectOrder(e,t){throw new Error(`
      You have to implement heap pair comparision method
      for ${e} and ${t} values.
    `)}}class w extends m{pairIsInCorrectOrder(e,t){return this.compare.lessThanOrEqual(e,t)}}class N extends w{constructor(){super(),this.priorities=new Map,this.compare=new h(this.comparePriority.bind(this))}add(e,t=0){return this.priorities.set(e,t),super.add(e),this}remove(e,t){return super.remove(e,t),this.priorities.delete(e),this}changePriority(e,t){return this.remove(e,new h(this.compareValue)),this.add(e,t),this}findByValue(e){return this.find(e,new h(this.compareValue))}hasValue(e){return this.findByValue(e).length>0}comparePriority(e,t){return this.priorities.get(e)===this.priorities.get(t)?0:this.priorities.get(e)<this.priorities.get(t)?-1:1}compareValue(e,t){return e===t?0:e<t?-1:1}}function k(r,e){const t={},n={},i={},s=new N;for(r.getAllVertices().forEach(o=>{t[o.getKey()]=1/0,i[o.getKey()]=null}),t[e.getKey()]=0,s.add(e,t[e.getKey()]);!s.isEmpty();){const o=s.poll();o.getNeighbors().forEach(a=>{if(!n[a.getKey()]){const u=r.findEdge(o,a),K=t[a.getKey()],E=t[o.getKey()]+u.weight;E<K&&(t[a.getKey()]=E,s.hasValue(a)&&s.changePriority(a,t[a.getKey()]),i[a.getKey()]=o),s.hasValue(a)||s.add(a,t[a.getKey()])}}),n[o.getKey()]=o}return{distances:t,previousVertices:i}}class S{constructor(e=!1){this.vertices={},this.edges={},this.isDirected=e,this.level={}}addVertex(e){return this.vertices[e.getKey()]=e,this}getVertexByKey(e){return this.vertices[e]}getNeighbors(e){return e.getNeighbors()}getAllVertices(){return Object.values(this.vertices)}getAllEdges(){return Object.values(this.edges)}addEdge(e){let t=this.getVertexByKey(e.startVertex.getKey()),n=this.getVertexByKey(e.endVertex.getKey());if(t||(this.addVertex(e.startVertex),t=this.getVertexByKey(e.startVertex.getKey())),n||(this.addVertex(e.endVertex),n=this.getVertexByKey(e.endVertex.getKey())),this.edges[e.getKey()])throw new Error("Edge has already been added before");return this.edges[e.getKey()]=e,this.isDirected?t.addEdge(e):(t.addEdge(e),n.addEdge(e)),this}deleteEdge(e){if(this.edges[e.getKey()])delete this.edges[e.getKey()];else throw new Error("Edge not found in graph");const t=this.getVertexByKey(e.startVertex.getKey()),n=this.getVertexByKey(e.endVertex.getKey());t.deleteEdge(e),n.deleteEdge(e)}findEdge(e,t){const n=this.getVertexByKey(e.getKey());return n?n.findEdge(t):null}getWeight(){return this.getAllEdges().reduce((e,t)=>e+t.weight,0)}reverse(){return this.getAllEdges().forEach(e=>{this.deleteEdge(e),e.reverse(),this.addEdge(e)}),this}getVerticesIndices(){const e={};return this.getAllVertices().forEach((t,n)=>{e[t.getKey()]=n}),e}getAdjacencyMatrix(){const e=this.getAllVertices(),t=this.getVerticesIndices(),n=Array(e.length).fill(null).map(()=>Array(e.length).fill(1/0));return e.forEach((i,s)=>{i.getNeighbors().forEach(o=>{const a=t[o.getKey()];n[s][a]=this.findEdge(i,o).weight})}),n}toString(){return Object.keys(this.vertices).toString()}}class B{constructor(e,t,n=0){this.startVertex=e,this.endVertex=t,this.weight=n}getKey(){const e=this.startVertex.getKey(),t=this.endVertex.getKey();return`${e}_${t}`}reverse(){const e=this.startVertex;return this.startVertex=this.endVertex,this.endVertex=e,this}toString(){return this.getKey()}}class f{constructor(e,t=null){this.value=e,this.next=t}toString(e){return e?e(this.value):`${this.value}`}}class x{constructor(e){this.head=null,this.tail=null,this.compare=new h(e)}prepend(e){const t=new f(e,this.head);return this.head=t,this.tail||(this.tail=t),this}append(e){const t=new f(e);return this.head?(this.tail.next=t,this.tail=t,this):(this.head=t,this.tail=t,this)}insert(e,t){const n=t<0?0:t;if(n===0)this.prepend(e);else{let i=1,s=this.head;const o=new f(e);for(;s&&i!==n;)s=s.next,i+=1;s?(o.next=s.next,s.next=o):this.tail?(this.tail.next=o,this.tail=o):(this.head=o,this.tail=o)}return this}delete(e){if(!this.head)return null;let t=null;for(;this.head&&this.compare.equal(this.head.value,e);)t=this.head,this.head=this.head.next;let n=this.head;if(n!==null)for(;n.next;)this.compare.equal(n.next.value,e)?(t=n.next,n.next=n.next.next):n=n.next;return this.compare.equal(this.tail.value,e)&&(this.tail=n),t}find({value:e=void 0,callback:t=void 0}){if(!this.head)return null;let n=this.head;for(;n;){if(t&&t(n.value)||e!==void 0&&this.compare.equal(n.value,e))return n;n=n.next}return null}deleteTail(){const e=this.tail;if(this.head===this.tail)return this.head=null,this.tail=null,e;let t=this.head;for(;t.next;)t.next.next?t=t.next:t.next=null;return this.tail=t,e}deleteHead(){if(!this.head)return null;const e=this.head;return this.head.next?this.head=this.head.next:(this.head=null,this.tail=null),e}fromArray(e){return e.forEach(t=>this.append(t)),this}toArray(){const e=[];let t=this.head;for(;t;)e.push(t),t=t.next;return e}toString(e){return this.toArray().map(t=>t.toString(e)).toString()}reverse(){let e=this.head,t=null,n=null;for(;e;)n=e.next,e.next=t,t=e,e=n;return this.tail=this.head,this.head=t,this}}class ${constructor(e){if(e===void 0)throw new Error("Graph vertex must have a value");const t=(n,i)=>n.getKey()===i.getKey()?0:n.getKey()<i.getKey()?-1:1;this.value=e,this.edges=new x(t)}addEdge(e){return this.edges.append(e),this}deleteEdge(e){this.edges.delete(e)}getNeighbors(){const e=this.edges.toArray(),t=n=>n.value.startVertex===this?n.value.endVertex:n.value.startVertex;return e.map(t)}getEdges(){return this.edges.toArray().map(e=>e.value)}getDegree(){return this.edges.toArray().length}hasEdge(e){return!!this.edges.find({callback:n=>n===e})}hasNeighbor(e){return!!this.edges.find({callback:n=>n.startVertex===e||n.endVertex===e})}findEdge(e){const t=i=>i.startVertex===e||i.endVertex===e,n=this.edges.find({callback:t});return n?n.value:null}getKey(){return this.value}deleteAllEdges(){return this.getEdges().forEach(e=>this.deleteEdge(e)),this}toString(e){return e?e(this.value):`${this.value}`}}function y(r){const[e,t]=r.getKey().split("_")[1].split(":");return[Number(e),Number(t)]}function c(r){if(r!==void 0)return r.map(e=>v(e))}function v(r){return r.split("_")[1]}function O(r,e){const t=v(r.getKey());for(let n=0;n<e.increasePoints.length;n++)if(e.increasePoints[n].id===t)return!0;return!1}function L(r,e){const t=v(r.getKey());for(let n=0;n<e.decreasePoints.length;n++)if(e.decreasePoints[n].id===t)return!0;return!1}function b(r,e){return O(r,e)===!0?-2:L(r,e)===!0?2:0}function G(r,e,t){const[n,i]=y(r),[s,o]=y(e);return Math.sqrt(Math.pow(n-s,2)+Math.pow(i-o,2))+b(r,t)}function D(r,e,t,n){let i=r;const s=[];for(;;){const o=i;if(s.push(o.getKey()),o.getKey()===e.getKey())return s;if(o.getNeighbors().length!==0){let a=o.getNeighbors();a=_(a,s),i=A(a,e,n)}}}function _(r,e){return r.filter(t=>!e.includes(t.getKey()))}function A(r,e,t){const n=r.map(s=>({vertex:s,h:G(s,e,t)}));let i=n[0];return n.forEach(s=>{s.h<i.h&&(i=s)}),i.vertex}function q(r,e){const[t,n]=y(r),[i,s]=y(e);return Math.sqrt(Math.pow(t-i,2)+Math.pow(n-s,2))}function T(r,e,t){return r+e+t}function F(r,e,t,n){let i=r;const s=[];let o=0;for(;;){const a=i;if(s.push(a.getKey()),o++,a.getKey()===e.getKey())return s;if(a.getNeighbors().length!==0){let u=a.getNeighbors();u=R(u,s),i=j(u,e,o,n)}}}function R(r,e){return r.filter(t=>!e.includes(t.getKey()))}function j(r,e,t,n){const s=r.map(a=>({vertex:a,h:q(a,e),cellOperationValue:b(a,n)})).map(a=>({vertex:a.vertex,f:T(t,a.h,a.cellOperationValue)}));let o=s[0];return s.forEach(a=>{a.f<o.f&&(o=a)}),o.vertex}class M{constructor(){this.linkedList=new x}isEmpty(){return!this.linkedList.head}peek(){return this.isEmpty()?null:this.linkedList.head.value}enqueue(e){this.linkedList.append(e)}dequeue(){const e=this.linkedList.deleteHead();return e?e.value:null}toString(e){return this.linkedList.toString(e)}}function H(r,e,t){const n=new M,i=[];let s;for(n.enqueue(e);!n.isEmpty();)if(s=n.dequeue(),!U(i,s)){if(i.push(s.getKey()),s.getKey()===t.getKey())return i;const o=s.getNeighbors();o.length!==0&&Y(n,o)}}function U(r,e){return!!r.find(n=>n===e.getKey())}function Y(r,e){e.forEach(t=>r.enqueue(t))}class C{constructor(){this.linkedList=new x}isEmpty(){return!this.linkedList.head}peek(){return this.isEmpty()?null:this.linkedList.head.value}push(e){this.linkedList.prepend(e)}pop(){const e=this.linkedList.deleteHead();return e?e.value:null}toArray(){return this.linkedList.toArray().map(e=>e.value)}toString(e){return this.linkedList.toString(e)}}function Q(r,e){const t=new C,n=[];let i;for(t.push(r);!t.isEmpty();)if(i=t.pop(),!X(n,i)){if(n.push(i.getKey()),i.getKey()===e.getKey())return n;const s=i.getNeighbors();if(s.length!==0)for(let o=s.length-1;o>=0;o--)t.push(s[o])}}function X(r,e){return!!r.find(n=>n===e.getKey())}function V(r,e,t,n){const i=new C,s=[];let o;for(i.push(r);!i.isEmpty();){if(o=i.pop(),s.push(o.getKey()),o.getKey()===e.getKey())return{founded:!0,visitedVertexs:s};const a=o.getNeighbors();if(a.length!==0)for(let u=a.length-1;u>=0;u--)W(a[u],t,i,n,s)}return{founded:!1,visitedVertexs:s}}function W(r,e,t,n,i){Z(r,e,n)===!1&&z(i,r)===!1&&t.push(r)}function z(r,e){return!!r.find(n=>n===e.getKey())}function J(r,e,t){let n=0,i=V(r,e,n,t);for(;i.founded===!1;)n=n+1,i=V(r,e,n,t);return{visitedVertexs:i.visitedVertexs,atLevel:n}}function Z(r,e,t){for(let n=0;n<=e;n++)if(t.level[`level_${n}`]===void 0||t.level[`level_${n}`].includes(r.getKey()))return!1;return!0}function ee(r,e){const t=document.getElementById(r);t.style.backgroundColor=e}function g(r,e){r!==void 0&&r.forEach(t=>ee(t,e))}function te(r,e,t,n,i){const s=document.createElement("span");return s.textContent=r,s.style.padding=e,s.style.backgroundColor=t,s.style.border=n,s.style.borderRadius=i,s}function ne(r,e){r.getAllEdges().forEach(t=>{e.appendChild(te(t,"5px","gray","1px solid black","3px"))})}function p(r,e,t){if(r===void 0)return;const n=document.createElement("p");n.textContent=`Số đỉnh đã duyệt ${r.length}`,t.appendChild(n),r.forEach(i=>{const s=document.createElement("span");s.textContent=i,s.style.padding="5px",s.style.backgroundColor=e,s.style.borderRadius="3px",t.appendChild(s)})}function re(r){const e=document.createElement("table");e.id="playgroundTable";for(let t=1;t<=r;t++){const n=document.createElement("tr");for(let i=1;i<=r;i++){const s=document.createElement("td"),o=`${t}:${i}`,a=`${t+i} - ${t}:${i}`;l.addVertex(new $(`v_${o}`)),s.style.padding="20px",s.style.textAlign="center",s.style.border="1px solid black",s.id=o,s.addEventListener("mouseover",()=>s.style.cursor="pointer"),s.textContent=a,n.appendChild(s)}e.appendChild(n)}return e}function ie(r){let e=!1;if(d.barrierPoints.length===0)d.barrierPoints.push(r);else{if(d.barrierPoints.forEach(t=>{t.id===r.id&&(e=!0)}),e)return console.error("Trùng lặp vật cản"),!1;d.barrierPoints.push(r)}return!0}function se(r){if(r.match(/v_\d+:\d+/)===null)throw new Error("Chuỗi không đúng định dạng");const e=r.split("_"),[t,n]=e[1].split(":");return`v_${Number(t)+1}:${n}`}function oe(r){if(r.match(/v_\d+:\d+/)===null)throw new Error("Chuỗi không đúng định dạng");const e=r.split("_"),[t,n]=e[1].split(":");return`v_${t}:${Number(n)+1}`}function ae(r){const e=se(r);if(l.vertices[e]!==void 0){const t=l.getVertexByKey(r),n=l.getVertexByKey(e),i=new B(t,n,1);l.addEdge(i)}}function le(r){const e=oe(r);if(l.vertices[e]!==void 0){const t=l.getVertexByKey(r),n=l.getVertexByKey(e),i=new B(t,n,1);l.addEdge(i)}}function de(r,e){const t=e.getVertexByKey(r);return k(e,t)}function P(r,e){if(r.previousVertices[e]===null)return null;{const t=e.split("_")[1],n=document.getElementById(t);return n.style.backgroundColor="red",P(r,r.previousVertices[e].value)}}const ce=document.getElementById("root");let I=!1;const d={n:0,startingPoint:null,endingPoint:null,barrierPoints:[],increasePoints:[],decreasePoints:[]},ue=document.getElementById("playgroundInitBtn");ue.addEventListener("click",()=>{const r=document.getElementById("playgroundInitInput"),e=document.getElementById("playgroundDataP");if(r===null)throw new Error("Nhập vào null");if(I)throw new Error("Playground đã được khởi tạo");const t=Number(r.value),n=re(t);d.n=t,ce.appendChild(n),I=!0,e.textContent=`Khởi tạo với n = ${r.value} với tập cạnh sau đây`});const he=document.getElementById("startingPointInitBtn");he.addEventListener("click",()=>{const r=document.getElementById("xStartingPoint"),e=document.getElementById("yStartingPoint"),t=document.getElementById(`${r.value}:${e.value}`);t.style.backgroundColor="green",t.style.border="5px solid green",d.startingPoint={id:t.id,x:Number(r.value),y:Number(e.value),sum:Number(r.value)+Number(e.value),cellOperation:"no"};const n=document.getElementById("startingPointData"),i=document.createElement("span");i.textContent=`${d.startingPoint.id}`,i.style.border="1px solid black",i.style.padding="5px",i.style.borderRadius="3px",i.style.display="inline-block",i.style.backgroundColor="green",n.appendChild(i)});const ge=document.getElementById("endingPointInitBtn");ge.addEventListener("click",()=>{const r=document.getElementById("xEndingPoint"),e=document.getElementById("yEndingPoint"),t=document.getElementById(`${r.value}:${e.value}`);t.style.backgroundColor="blue",t.style.border="5px solid blue",d.endingPoint={id:t.id,x:Number(r.value),y:Number(e.value),sum:Number(r.value)+Number(e.value),cellOperation:"no"};const n=document.getElementById("endingPointData"),i=document.createElement("span");i.textContent=`${d.endingPoint.id}`,i.style.padding="5px",i.style.border="1px solid black",i.style.borderRadius="3px",i.style.margin="5px",i.style.display="inline-block",i.style.backgroundColor="blue",n.appendChild(i)});const pe=document.getElementById("addBarrierBtn");pe.addEventListener("click",()=>{const r=document.getElementById("xBarrierPoint"),e=document.getElementById("yBarrierPoint"),t=document.getElementById(`${r.value}:${e.value}`);t.style.backgroundColor="DarkGray",t.classList.add("barrier");const n={id:`${r.value}:${e.value}`,x:Number(r.value),y:Number(e.value),sum:Number(r.value)+Number(e.value),cellOperation:"no"},i=ie(n);if(delete l.vertices[`v_${n.id}`],i){const s=document.getElementById("barrierData"),o=document.createElement("span");o.textContent=n.id,o.style.border="1px solid black",o.style.margin="5px",o.style.padding="5px",o.style.borderRadius="3px",o.style.backgroundColor="DarkGray",s.appendChild(o)}});const ye=document.getElementById("addIncreaseBtn");ye.addEventListener("click",()=>{const r=document.getElementById("xIncreasePoint"),e=document.getElementById("yIncreasePoint"),t=document.getElementById(`${r.value}:${e.value}`);t.style.border="5px solid #00BFFF",t.classList.add("increasePoint");const n={id:t.id,x:Number(r.value),y:Number(e.value),sum:Number(r.value)+Number(e.value),cellOperation:"increase scrore"};d.increasePoints.push(n);const i=document.getElementById("increasePointData"),s=document.createElement("span");s.textContent=`${n.id}`,s.style.border="1px solid #00BFFF",s.style.padding="5px",s.style.borderRadius="3px",s.style.display="inline-block",i.appendChild(s)});const fe=document.getElementById("addDecreaseBtn");fe.addEventListener("click",()=>{const r=document.getElementById("xDecreasePoint"),e=document.getElementById("yDecreasePoint"),t=document.getElementById(`${r.value}:${e.value}`);t.style.border="5px solid chocolate",t.classList.add("increasePoint");const n={id:t.id,x:Number(r.value),y:Number(e.value),sum:Number(r.value)+Number(e.value),cellOperation:"decrease scrore"};d.decreasePoints.push(n);const i=document.getElementById("decreasePointData"),s=document.createElement("span");s.textContent=`${n.id}`,s.style.border="1px solid chocolate",s.style.padding="5px",s.style.borderRadius="3px",s.style.display="inline-block",i.appendChild(s)});const l=new S,me=document.getElementById("createGraphBtn");me.addEventListener("click",()=>{for(const n in l.vertices)le(n),ae(n);const r=document.getElementById("createGraphStatus"),e=document.createElement("p");e.textContent="Graph đã được tạo thành công!",r.appendChild(e),console.log("Graph đã được tạo thành công!");const t=document.getElementById("playgroundData");ne(l,t),xe(),console.log(l)});function xe(){const r=Object.keys(l.vertices)[0];let e=0;l.level[`level_${e}`]=[r],ve(e),console.log(l),console.log(d)}function ve(r){let e=[];for(;l.level[`level_${r}`].forEach(n=>{be(n).forEach(i=>{e.push(i)})}),e=Ve(e),e=Ie(e),e=Ee(e),e.length!==0;)r++,l.level[`level_${r}`]=[...e],e.length=0}function Ee(r){const e=document.getElementsByClassName("barrier"),t=[];for(const n of e)t.push(`v_${n.id}`);return r.filter(n=>!t.includes(n))}function Ve(r){const e=new Set(r);return Array.from(e)}function Ie(r){return r.filter(e=>Be(e))}function Be(r){return!!l.getVertexByKey(r)}function be(r){const e=document.getElementById("playgroundInitInput"),t=Number(e.value),[n,i]=Ce(r),s=[];return i+1<=t&&s.push(`v_${n}:${i+1}`),n+1<=t&&s.push(`v_${n+1}:${i}`),s}function Ce(r){const[e,t]=r.split("_")[1].split(":");return[Number(e),Number(t)]}const Pe=document.getElementById("dijkstraSearchBtn");Pe.addEventListener("click",()=>{var e,t;console.time("Dijkstra time");const r=de(`v_${(e=d.startingPoint)==null?void 0:e.id}`,l);console.timeEnd("Dijkstra time"),console.log("Shortest path by dijkstra"),console.log(r),P(r,`v_${(t=d.endingPoint)==null?void 0:t.id}`)});const Ke=document.getElementById("bfsOnGraphBtn");Ke.addEventListener("click",()=>{var i,s;const r=l.getVertexByKey(`v_${(i=d.startingPoint)==null?void 0:i.id}`),e=l.getVertexByKey(`v_${(s=d.endingPoint)==null?void 0:s.id}`);console.time("BFS time");const t=H(l,r,e);console.timeEnd("BFS time"),g(c(t),"yellow");const n=document.getElementById("bfsOnGraphStatus");p(c(t),"yellow",n)});const we=document.getElementById("dfsOnGraphBtn");we.addEventListener("click",()=>{var i,s;const r=l.getVertexByKey(`v_${(i=d.startingPoint)==null?void 0:i.id}`),e=l.getVertexByKey(`v_${(s=d.endingPoint)==null?void 0:s.id}`);console.time("DFS time");const t=Q(r,e);console.timeEnd("DFS time"),g(c(t),"aqua");const n=document.getElementById("dfsOnGraphStatus");p(c(t),"aqua",n)});const Ne=document.getElementById("idsOnGraphBtn");Ne.addEventListener("click",()=>{var s,o;const r=l.getVertexByKey(`v_${(s=d.startingPoint)==null?void 0:s.id}`),e=l.getVertexByKey(`v_${(o=d.endingPoint)==null?void 0:o.id}`);console.time("IDS time");const t=J(r,e,l);console.timeEnd("IDS time"),g(c(t.visitedVertexs),"blue");const n=document.getElementById("idsOnGraphStatus"),i=document.createElement("p");i.textContent=`Found at level: ${t.atLevel}`,n.appendChild(i),p(c(t.visitedVertexs),"blue",n)});const ke=document.getElementById("greedySearchOnGraphBtn");ke.addEventListener("click",()=>{var i,s;const r=l.getVertexByKey(`v_${(i=d.startingPoint)==null?void 0:i.id}`),e=l.getVertexByKey(`v_${(s=d.endingPoint)==null?void 0:s.id}`);console.time("Greedy Search Time");const t=D(r,e,l,d);console.timeEnd("Greedy Search Time"),g(c(t),"orange");const n=document.getElementById("greedySearchOnGraphStatus");p(c(t),"orange",n)});const Se=document.getElementById("aStarSearchOnGraphBtn");Se.addEventListener("click",()=>{var i,s;const r=l.getVertexByKey(`v_${(i=d.startingPoint)==null?void 0:i.id}`),e=l.getVertexByKey(`v_${(s=d.endingPoint)==null?void 0:s.id}`);console.time("A start Search Time");const t=F(r,e,l,d);console.timeEnd("A start Search Time"),g(c(t),"pink");const n=document.getElementById("aStarSearchOnGraphStatus");p(c(t),"pink",n)});