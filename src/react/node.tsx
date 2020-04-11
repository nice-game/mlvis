import * as React from "react";
import { BehaviorSubject, fromEvent, of, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";
import styled from "styled-components";
import { useObservable } from "rxjs-hooks";
import { GraphNode } from "src/state/diagram";
import { Vec2 } from "src/util/vec";

const NodeWrap = styled.div`
	position: absolute;
	background: #333;
	padding: 8px;
	user-select: none;
	cursor: pointer;
`;

interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
	node: GraphNode;
}
export const NodeComp = React.forwardRef<HTMLDivElement, NodeProps>((_props, ref) => {
	const { node, ...props } = _props;

	const pos = useObservable(() => node.pos$);

	const draggingBS = React.useRef(new BehaviorSubject(false)).current;

	React.useEffect(() => {
		const sub = draggingBS
			.pipe(switchMap((dragging) => (dragging ? fromEvent<MouseEvent>(window, "mousemove") : of<MouseEvent>())))
			.subscribe((ev) => node.setPos(pos!.add(new Vec2(ev.movementX, ev.movementY))));

		return () => sub.unsubscribe();
	});

	const style = { ...props.style, top: pos?.y, left: pos?.x };

	return (
		<NodeWrap
			{...props}
			ref={ref}
			style={style}
			onMouseDown={() => draggingBS.next(true)}
			onMouseUp={() => draggingBS.next(false)}
		/>
	);
});
