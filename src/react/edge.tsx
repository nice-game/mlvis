import * as React from "react";
import styled from "styled-components";
import { Vec2 } from "src/util/vec";

const EdgeImpl = styled.div`
	position: absolute;
	height: 2px;
	background: #fff;
	transform-origin: top left;
`;

const Arrow = styled.div`
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 0;
	height: 0;
	border-top: 8px solid transparent;
	border-bottom: 8px solid transparent;
	border-left: 8px solid #fff;
`;

interface EdgeProps extends React.HTMLAttributes<HTMLDivElement> {
	from: HTMLDivElement | null;
	to: HTMLDivElement | null;
}
export const Edge: React.FC<EdgeProps> = (_props) => {
	const { from, to, ...props } = _props;

	if (!from || !to) {
		return <></>;
	}

	const fromTL = new Vec2(from.offsetLeft, from.offsetTop);
	const fromBR = fromTL.add(new Vec2(from.offsetWidth, from.offsetHeight));
	const toTL = new Vec2(to.offsetLeft, to.offsetTop);
	const toBR = toTL.add(new Vec2(to.offsetWidth, to.offsetHeight));

	const start = Vec2.lerp(Vec2.clamp(toTL, fromTL, fromBR), Vec2.clamp(toBR, fromTL, fromBR), 0.5);
	const end = Vec2.lerp(Vec2.clamp(fromTL, toTL, toBR), Vec2.clamp(fromBR, toTL, toBR), 0.5);

	const diff = end.sub(start);
	const len = diff.length();
	const normal = diff.divn(len);
	const rot = Math.atan2(normal.y, normal.x);

	const style = { ...props.style, top: start.y, left: start.x, width: len, transform: `rotate(${rot}rad)` };

	return (
		<EdgeImpl {...props} style={style}>
			<Arrow />
		</EdgeImpl>
	);
};
