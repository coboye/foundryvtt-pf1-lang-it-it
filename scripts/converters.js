class Converters {

  usePf2eTokensBestiaries = false;

  constructor(){
       
    Babele.get().registerConverters({
      'learnedAt': (value, translations) => this.learnedAt(value, translations),
      'actions': (value, translations) => this.actions(value, translations),
      'pf2e-tokens-bestiaries-actor': (value, translations) => this.actor(value, translations),
      'pf2e-tokens-bestiaries-token': (value, translations) => this.token(value, translations),
    });
  }
  
  actions(value, translations) {
    if (!!translations) {
      value.forEach((type, i) => {
        const data = translations[i];
        value[i].name = data.name;
        value[i].target.value = data.target;
        value[i].range.value = data.range;
        value[i].duration.value = data.duration;
        value[i].save.description = data.save;
        value[i].spellArea = data.spellArea;
        value[i].spellEffect = data.spellEffect;
        value[i].effectNotes = data.effectNotes;
      });
    }
    return value;
  }

  learnedAt(value, translations) {
    if (!!translations) {
      value = translations;
    }
    return value;
  }
  isString(x) {
    return Object.prototype.toString.call(x) === "[object String]"
  }

  isNumber(x) {
    return Object.prototype.toString.call(x) === "[object Number]"
  }

  actor(value, translations) {
    return this.usePf2eTokensBestiaries ? translations : value;
  }

  token(token, translations) {
    if (this.usePf2eTokensBestiaries) {
      if (this.isString(translations)) {
        token.src = translations;
      } else {
        if (!!translations.img) {
          token.src = translations.img;
        }
        if (this.isNumber(translations.scale)) {
          token.scaleX = translations.scale;
          token.scaleY = translations.scale;
        }
      }
    }
    return token;
  }

}
export default new Converters();
