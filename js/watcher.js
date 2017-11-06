class Watcher {
	constructor(vm, exp, cb) {
		this.cb = cb;
		this.vm = vm;
		this.exp = exp;

		// 将自己添加到订阅器的操作
		this.value = this.getValue();
	}

	update() {
		const value = this.vm.data[this.exp];
		const oldValue = this.value;
		if (value !== oldValue) {
			this.value = value;
			this.cb.call(this.vm, value, oldValue);
		}
	}

	getValue() {
		Dep.target = this;
		const value = this.vm.data[this.exp];
		Dep.target = null;
		return value;
	}
}