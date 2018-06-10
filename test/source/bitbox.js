/* global source, describe, it, expect */

const Bitbox = source('bitbox.js');

function foo() { }
function bar() { }
function baz() { }
function qux() { }

describe('Bitbox', () => {
	it('is constructable', (next) => {
		const box = new Bitbox();

		expect(box).to.be.instanceOf(Bitbox);

		next();
	});

	describe('works with various data types', () => {
		/*  eslint-disable array-element-newline, no-magic-numbers*/
		const tests = [
			{
				name: 'strings',
				values: ['foo', 'bar', 'baz', 'qux', 'quux'],
				scenario: [
					{ flag: 3, indices: [0, 1] },
					{ flag: 9, indices: [0, 3] },
					{ flag: 18, indices: [1, 4] },
					{ flag: 29, indices: [0, 2, 3, 4] },
				],
			},
			{
				name: 'numbers',
				values: [0, 123, 1e7, Infinity],
				scenario: [
					{ flag: 3, indices: [0, 1] },
					{ flag: 9, indices: [0, 3] },
					{ flag: 10, indices: [1, 3] },
				],
			},
			{
				name: 'booleans',
				values: [true, false],
				scenario: [
					{ flag: 3, indices: [0, 1] },
					{ flag: 2, indices: [1] },
				],
			},
			{
				name: 'functions',
				values: [foo, bar, baz, qux],
				scenario: [
					{ flag: 3, indices: [0, 1] },
					{ flag: 9, indices: [0, 3] },
					{ flag: 10, indices: [1, 3] },
					{ flag: 11, indices: [0, 1, 3] },
				],
			},
			{
				name: 'objects',
				values: [{ foo }, { bar }, { baz }, { foo }],
				scenario: [
					{ flag: 3, indices: [0, 1] },
					{ flag: 9, indices: [0, 3] },
					{ flag: 10, indices: [1, 3] },
					{ flag: 11, indices: [0, 1, 3] },
				],
			},
			{
				name: 'mixed',
				//  eslint-disable-next-line no-undefined
				values: ['hello', Math.PI, true, null, undefined, foo, { bar }],
				scenario: [
					{ flag: 3, indices: [0, 1] },
					{ flag: 13, indices: [0, 2, 3] },
					{ flag: 30, indices: [1, 2, 3, 4] },
					{ flag: 21, indices: [0, 2, 4] },
					{ flag: 73, indices: [0, 3, 6] },
					{ flag: 101, indices: [0, 2, 5, 6] },
				],
			},
		];
		/*  eslint-enable array-element-newline,no-magic-numbers */

		tests.forEach((test) => {
			it(test.name, (next) => {
				const box = new Bitbox();

				test.values.forEach((value, index) => {
					//  eslint-disable-next-line no-bitwise
					const bit = 1 << index;

					expect(box.flag(value)).to.equal(bit);
					expect(box.flag(value)).to.equal(box.flag(value));
					expect(box.values(bit)).to.equal([test.values[index]]);
				});

				test.scenario.forEach((scenario) => {
					const values = scenario.indices
						//  eslint-disable-next-line max-nested-callbacks
						.reduce((carry, index) => carry.concat(test.values[index]), []);

					expect(box.values(scenario.flag)).to.equal(values);
					expect(box.flag(...values)).to.equal(scenario.flag);
				});

				next();
			});
		});
	});
});
