import { BehaviorSubject } from "rxjs";
import { Vec2 } from "src/util/vec";

const nodesBS = new BehaviorSubject(new Set<GraphNode>());
const edgesBS = new BehaviorSubject(new Set<Edge>());

export const nodes$ = nodesBS.asObservable();

export function addNode(node: GraphNode) {
	nodesBS.value.add(node);
	nodesBS.next(nodesBS.value);
}

export function addEdge(edge: Edge) {
	edgesBS.value.add(edge);
	edgesBS.next(edgesBS.value);
}

export class GraphNode {
	private posBS: BehaviorSubject<Vec2>;

	get pos$() {
		return this.posBS.asObservable();
	}

	constructor(pos: Vec2) {
		this.posBS = new BehaviorSubject(pos);
	}

	setPos(pos: Vec2) {
		this.posBS.next(pos);
	}
}

export interface Edge {
	from: GraphNode;
	to: GraphNode;
}
