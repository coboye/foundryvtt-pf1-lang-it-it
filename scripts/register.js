import Constants from './constants.js';
import Converters from './converters.js';

Hooks.on('init', () => {
	game.settings.register(Constants.MODULE_NAME, Constants.CONFIG.ENABLE_BABEL, {
		name: 'Abilita la traduzione automatica',
		hint: 'Configura Babele per tradurre automaticamente i compendi con questo modulo',
		scope: 'world',
		config: true,
		default: true,
		type: Boolean,
		onChange: value => {
			if (!!value) {
				BabelRegistration();
			}
			window.location.reload();
		},
	});

	game.settings.register(Constants.MODULE_NAME, Constants.CONFIG.USE_PF2BESTIARIES, {
		name: 'Pathfinder Token Pack: Bestiaries',
		hint: 'Converte immagini e token dei compendi "Pathfinder 1e - Bestiary" utilizzando quelle presenti nel modulo premium "Pathfinder Token Pack: Bestiaries", entrambi in moduli sono richiesti.',
		scope: 'world',
		config: true,
		default: false,
		type: Boolean,
		onChange: value => {
			window.location.reload();
		}
	});
	
	Converters.usePf2eTokensBestiaries = game.settings.get(Constants.MODULE_NAME, Constants.CONFIG.USE_PF2BESTIARIES);

	if (game.settings.get(Constants.MODULE_NAME, Constants.CONFIG.ENABLE_BABEL)) {
		BabelRegistration();
	}
});
Hooks.on("renderSettings", (app, html) => {
	const resetbtn = $(`<button data-action="configure"><i class="fas fa-trash-can"></i>Reset Compendium Cache</button>`);
	// For posterity.
	if (game.user?.isGM || game.user?.can("SETTINGS_MODIFY")) {
		html.find("#settings-game button[data-action]:last-of-type").after(resetbtn);
		resetbtn.click((ev) => {
			game.settings.set("pf1", "compendiumItems", {});
			window.location.reload();
		});
	}
});
function BabelRegistration() {
	if (typeof Babele !== 'undefined') {
		Babele.get().register({
			module: Constants.MODULE_NAME,
			lang: 'it',
			dir: 'compendium',
		});
	}
}