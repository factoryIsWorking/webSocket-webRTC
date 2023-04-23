class Descriptor1 {
	writable = false;
	enumerable = false;
	value: any;
	constructor(value: any) {
		this.value = value;
	}
}
type Callbacks = {
	_onDestroy?: Function;
	_onUpdate?: Function;
	[props: string]: any;
};

export class Factory<T> {
	constructor() {}
	list = new Set<T>();
	make(obj: T): T {
		Object.defineProperties(obj, {
			_onDestroy: {
				value: new Set<Function>(),
				writable: false,
				enumerable: false,
			},
			_onUpdate: {
				value: new Set<Function>(),
				writable: false,
				enumerable: false,
			},
		});
		Object.defineProperties(obj, {
			_destory: {
				value: function () {
					for (const callback of this._onDestroy) {
						callback(obj);
					}
					this.list.delete(obj);
					return obj;
				},
				writable: false,
				enumerable: false,
			},
			_addListener: {
				value: function (callbacks: Callbacks) {
					for (const event in callbacks) {
						this[event].add(callbacks[event] as Function);
					}
					return obj;
				},
				writable: false,
				enumerable: false,
			},
			_removeListener: {
				value: function (callbacks: Callbacks) {
					const res: any = {};
					for (const event in callbacks) {
						const [callbackSet, target] = [
							this[event],
							callbacks[event],
						];
						if (callbackSet.has(target)) {
							res[event] = true;
							callbackSet.delete(target as Function);
						} else {
							res[event] = false;
						}
					}
					return res;
				},
				writable: false,
				enumerable: false,
			},
		});
		this.list.add(obj);
		return new Proxy(obj as Object, {
			set(target, prop, receiver): boolean {
				for (const callback of (obj as any)._onUpdate) {
					callback(target, prop, receiver);
				}
				return Reflect.set(target, prop, receiver);
			},
		}) as T;
	}
}
