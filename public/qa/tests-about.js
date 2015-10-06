suite('"About" Page Tests', function(){
	// this test checks to see if there is an object in the link array that says /contact
	test('page should contain link to contact page', function(){
		assert($('a[href="/contact"]').length);
	});
});