/* global source, describe, it, expect */

describe('Contains the Main module', () => {
	const Main = source('main');

	it('has the expected name', (next) => {
		expect(Main.name).to.equal('flagpool');
		expect(Main.name.startsWith('%PROJECT')).to.be.false();
		expect(Main.name.endsWith('NAME%')).to.be.false();

		next();
	});
});
