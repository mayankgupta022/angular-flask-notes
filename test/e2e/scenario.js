/*global browser sleep element describe beforeEach it expect */

(function() {
'use strict';

describe('My Application', function() {
	beforeEach(function() {
		browser().navigateTo('/');
		sleep(1);
	});


	it('should automatically redirect to /notesList when location hash/fragment is empty', function() {
		expect(browser().location().url()).toBe("/notesList");
	});

	describe('View 1', function() {
		beforeEach(function() {
			browser().navigateTo('#/notesList');
			sleep(1);
		});

		it('should...', function() {
			//...
		});
	});
});

})();