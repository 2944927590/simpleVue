class Observer {
	constructor(data) {
		this.data = data;
		this.walk();
	}

	walk() {
		Object.keys(this.data).forEach(key => {
			this.defineReactive(this.data, key, this.data[key]);
		});
	}

	defineReactive(data, key, value) {
		const dep = new Dep();

		if ( value && typeof value === 'object' ) {
			new Observer(value);
		}

		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get() {
				if (Dep.target) {
					dep.addSub(Dep.target);
				}
				return value;
			},
			set(newVal) {
				if (newVal === value) {
					return false;
				}
				value = newVal;
				dep.notify();
			}
		});
	}
}