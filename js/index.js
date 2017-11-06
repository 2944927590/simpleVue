class SimpleVue {
	constructor(options) {

		this.data = options.data;
		this.methods = options.methods;

		// 数据劫持
		Object.keys(this.data).forEach((key) => {
			this.proxyKeys(key);
		});

		// 数据观察 - 搜集依赖
		new Observer(this.data);

		// 编译模板 - 添加订阅者
		new Compile(options.el, this);

		// 所有事情处理好后执行 mounted 函数
		options.mounted.call(this);
	}

	proxyKeys (key) {
		Object.defineProperty(this, key, {
			enumerable: false,
			configurable: true,
			get() {
				return this.data[key];
			},
			set(newVal) {
				this.data[key] = newVal;
			}
		});
	}
}
