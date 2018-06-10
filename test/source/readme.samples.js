/* global source, describe, it, expect */

const Bitbox = source('bitbox.js');

describe('README examples', () => {
	it('Usage', (next) => {
		const bitbox = new Bitbox();

		//  adding individual values
		expect(bitbox.flag('foo')).to.equal(1);
		expect(bitbox.flag(Infinity)).to.equal(2);
		expect(bitbox.flag(Math.PI)).to.equal(4);
		expect(bitbox.flag('bar')).to.equal(8);

		//  adding multiple values (note that 'foo' and 'bar' were already added)
		expect(bitbox.flag('baz', 'bar', 'foo')).to.equal(25);

		//  value retrieval (note that the order in is always the order in which the values were added)
		expect(bitbox.values(25)).to.equal(['foo', 'bar', 'baz']);
		expect(bitbox.values(2)).to.equal([Infinity]);
		expect(bitbox.values(10)).to.equal([Infinity, 'bar']);

		next();
	});

	describe('API', () => {
		it('flag', (next) => {
			const bitbox = new Bitbox();

			expect(bitbox.flag('foo')).to.equal(1);
			expect(bitbox.flag('bar')).to.equal(2);
			expect(bitbox.flag('baz')).to.equal(4);

			const array = ['foo', 'bar', 'baz'];

			//  the array itself
			expect(bitbox.flag(array)).to.equal(8);
			//  the spread array
			expect(bitbox.flag(...array)).to.equal(7);

			next();
		});

		it('values', (next) => {
			const bitbox = new Bitbox();

			//  quickly flag a couple of values
			bitbox.flag('foo', 'bar', 'baz', 'qux');

			expect(bitbox.values(9)).to.equal(['foo', 'qux']);
			expect(() => bitbox.values(33)).to.throw(/^Failed to obtain all values/);
			expect(bitbox.values(33, false)).to.equal(['foo']);

			next();
		});
	});
});
