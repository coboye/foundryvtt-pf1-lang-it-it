
Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {
		
		Babele.get().register({
			module: 'foundryvtt-pf1-lang-it-it',
			lang: 'it',
			dir: 'compendium'
		});
	}
});