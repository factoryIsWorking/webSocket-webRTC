const myset = new Proxy(new Map(), {
	defineProperty(list, target, descriptor) {
		console.log("define");
	},
	deleteProperty(list, target) {
		console.log("delete");
	},
	get: function (list, target, receiver) {
		console.log("get");
	},
});

myset.set();
