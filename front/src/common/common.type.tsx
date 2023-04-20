//
export class Model<T> {
	state: T;

	// 겹치는 속성을 업데이트, 겹치지 않으면 그대로 유지
	// 만일 인자가 오브젝트가 아니면 바로 반영함
	set(params: any): boolean {
		if (!params || params.constructor !== Object) return false;
		const stack: [any, any][] = [[this.state, params]];
		while (stack.length !== 0) {
			const [target, param] = stack.pop() as [any, any];
			for (const key of Object.keys(param)) {
				if (!param[key] || param[key].constructor !== Object) {
					target[key] = param[key];
				} else if (target[key] === undefined) {
					target[key] = param[key];
				} else {
					stack.push([target[key], param[key]]);
				}
			}
		}
		return true;
	}

	// 마지막 인자로 null을 입력한 대상 키 삭제
	unset(params: any): boolean {
		if (params.constructor !== Object) return false;
		const stack: [any, any][] = [[this.state, params]];
		while (stack.length !== 0) {
			const [target, param] = stack.pop() as [any, any];
			for (const key of Object.keys(param).filter(
				(key) => target[key] !== undefined
			)) {
				if (param[key] === null) {
					delete target[key];
				} else {
					stack.push([target[key], param[key]]);
				}
			}
		}
		return true;
	}
	constructor(init: T) {
		this.state = init;
		this.set.bind(this);
		this.unset.bind(this);
	}
}

// Subscribable
export interface Subscribable {
	state: any;
	update: Function;
	callbacks: Set<Function>;
	subscribe: Function;
	unsubscribe: Function;
}

export class Channel<T> implements Subscribable {
	state: Model<T>;
	callbacks: Set<Function> = new Set<Function>();
	get(): T {
		return this.state.state;
	}
	// 인자로 업데이트, 이후 등록된 콜백 실행
	update(params?: any) {
		if (params !== undefined) {
			this.state.set(params);
		}
		for (const func of Array.from(this.callbacks)) {
			func(this.state.state, params);
		}
	}
	// 콜백함수를 등록, 이후 업데이트 함수와 콜백을 반환받음
	subscribe(callback?: Function): [Function, Function] | Function {
		if (callback === undefined) {
			return this.update;
		}
		this.callbacks.add(callback);
		return [callback, this.update];
	}
	// 콜백함수를 등록 해제
	unsubscribe(callback: Function) {
		this.callbacks.delete(callback);
	}
	constructor(init: T) {
		this.state = new Model(init);
	}
}
