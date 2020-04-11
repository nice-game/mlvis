import * as React from "react";
import { useObservable } from "rxjs-hooks";
import { addNode, nodes$, GraphNode } from "src/state/diagram";
import { iter } from "src/util/iter";
import { Vec2 } from "src/util/vec";
import { NodeComp } from "./node";
import { scan } from "rxjs/operators";
import { tuple } from "src/util/tuple";

export const Diagram: React.FC = () => {
	const nodes: Map<GraphNode, HTMLDivElement | null> =
		useObservable(() =>
			nodes$.pipe(
				scan(
					(acc, val) =>
						iter(val)
							.map((k) => tuple(k, acc.get(k) || null))
							.toMap(),
					new Map(),
				),
			),
		) || new Map();

	console.log(nodes);

	return (
		<div style={{ position: "relative" }}>
			<a href="javascript:void(0)" role="button" onClick={() => addNode(new GraphNode(new Vec2(100, 100)))}>
				+ Add Node
			</a>
			{iter(nodes.keys())
				.enumerate()
				.map(([i, node]) => (
					<NodeComp key={i} ref={(el) => nodes.set(node, el)} node={node}>
						node {i}
					</NodeComp>
				))
				.toArray()}
			{/* <Edge from={node1} to={node2} /> */}
		</div>
	);
};
