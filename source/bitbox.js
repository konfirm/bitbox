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

	/**
	 *  Get the flags associated with the provided value(s)
	 *
	 *  @param    {*} values
	 *  @returns  int flag
	 *  @memberof Bitbox
	 */
	flag(...values) {
		if (values.length > 1) {
			return values.reduce((carry, value) => carry + this.flag(value), 0);
		}

		const pool = this[poolSymbol];
		const [value] = values;

		if (pool.indexOf(value) < 0) {
			pool.push(value);
		}

		//  eslint-disable-next-line no-bitwise
		return 1 << pool.indexOf(value);
	}

	/**
	 *  Obtain the values associated with the provided flag
	 *
	 *  @param    {*} flag
	 *  @param    {boolean} [verify=true]
	 *  @returns  [*]
	 *  @memberof Bitbox
	 */
	values(flag, verify = true) {
		const pool = this[poolSymbol];
		//  eslint-disable-next-line no-bitwise
		const values = pool.reduce(
			(carry, type, index) =>
				carry.concat(flag & (1 << index) ? type : []),
			[],
		);

		if (!verify || this.flag(...values) === flag) {
			return values;
		}

		throw new Error(`Failed to obtain all values for flag ${flag}`);
	}
}

module.exports = Bitbox;
