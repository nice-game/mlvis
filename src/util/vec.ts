export class Vec2 {
	static clamp(n: Vec2, min: Vec2, max: Vec2): Vec2 {
		const x = Math.max(Math.min(n.x, max.x), min.x);
		const y = Math.max(Math.min(n.y, max.y), min.y);
		return new Vec2(x, y);
	}

	static lerp(start: Vec2, end: Vec2, t: number): Vec2 {
		const x = (end.x - start.x) * t + start.x;
		const y = (end.y - start.y) * t + start.y;
		return new Vec2(x, y);
	}

	constructor(public x: number, public y: number) {}

	length(): number {
		const a = Math.abs(this.x);
		const b = Math.abs(this.y);
		return Math.sqrt(a * a + b * b);
	}

	divn(rhs: number): Vec2 {
		return new Vec2(this.x / rhs, this.y / rhs);
	}

	add(rhs: Vec2): Vec2 {
		return new Vec2(this.x + rhs.x, this.y + rhs.y);
	}

	sub(rhs: Vec2): Vec2 {
		return new Vec2(this.x - rhs.x, this.y - rhs.y);
	}
}
