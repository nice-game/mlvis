import * as React from "react";
import { Node } from "./node";
import { Edge } from "./edge";

export const Diagram: React.FC = () => {
	const [node1, setNode1] = React.useState<HTMLDivElement | null>(null);
	const [x1, setX1] = React.useState<number>(100);
	const [y1, setY1] = React.useState<number>(100);
	const [node2, setNode2] = React.useState<HTMLDivElement | null>(null);
	const [x2, setX2] = React.useState<number>(130);
	const [y2, setY2] = React.useState<number>(200);

	return (
		<div style={{ position: "relative" }}>
			<Node ref={(x) => setNode1(x)} x={x1} xChange={setX1} y={y1} yChange={setY1}>
				node 1
			</Node>
			<Node ref={(x) => setNode2(x)} x={x2} xChange={setX2} y={y2} yChange={setY2}>
				node 2
			</Node>
			<Edge from={node1} to={node2} />
		</div>
	);
};
