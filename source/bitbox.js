const storage = new WeakMap();
const poolSymbol = Symbol('pool');

/**
 *  Associate bitwise comparable numbers to any kind of variable
 *
 *  @class Bitbox
 */
class Bitbox {
	/**
	 *  Obtain the pool of stored associations, create one if needed
	 *
	 *  @readonly
	 *  @memberof Bitbox
	 */
	get [poolSymbol]() {
		if (!storage.has(this)) {
			storage.set(this, []);
		}

		return storage.get(this);
	}

	value(...flags) {
		if (flags.length > 1) {
			return flags.reduce((carry, flag) => carry + this.value(flag), 0);
		}

		const pool = this[poolSymbol];
		const [flag] = flags;

		if (pool.indexOf(flag) < 0) {
			pool.push(flag);
		}

		//  eslint-disable-next-line no-bitwise
		return 1 << pool.indexOf(flag);
	}

	flags(bit) {
		const pool = this[poolSymbol];

		//  eslint-disable-next-line no-bitwise
		return pool.reduce(
			(carry, type, index) =>
				carry.concat(bit & (1 << index) ? type : []),
			[],
		);
	}
}

module.exports = Bitbox;
