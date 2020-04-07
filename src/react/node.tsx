import * as React from "react";
import { BehaviorSubject, fromEvent, of, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";
import styled from "styled-components";

const NodeWrap = styled.div`
	position: absolute;
	background: #333;
	padding: 8px;
	user-select: none;
	cursor: pointer;
`;

interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
	x: number;
	y: number;
	xChange?: (x: number) => void;
	yChange?: (y: number) => void;
}
export const Node = React.forwardRef<HTMLDivElement, NodeProps>((_props, ref) => {
	const { x, y, xChange, yChange, ...props } = _props;

	const input = React.useRef(new Subject()).current;
	const draggingBS = React.useRef(new BehaviorSubject(false)).current;

	React.useEffect(() => {
		const sub = draggingBS
			.pipe(switchMap((dragging) => (dragging ? fromEvent<MouseEvent>(window, "mousemove") : of<MouseEvent>())))
			.subscribe((ev) => {
				xChange && xChange(x + ev.movementX);
				yChange && yChange(y + ev.movementY);
			});

		return () => sub.unsubscribe();
	});

	React.useEffect(() => input.next({ x, y }), [x, y]);

	const style = { ...props.style, top: y, left: x };

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
