const hashId = require('../../../src/lib/hashId');

describe('Generate Unique ID', () => {
	it('should generate an unique ID', () => {
		const id = hashId();

		expect(id).toHaveLength(8);
	});
});
