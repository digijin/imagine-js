describe('Polyfills', function(){
	it('requestAnimationFrame', function(){
		expect(window.requestAnimationFrame).toBeDefined();
	});

	it('console.log', function(){
		expect(console.log).toBeDefined();
	});
});
