class Converters {

  usePf2eTokensBestiaries = false;

  constructor(){
    Babele.get().registerConverters({
      'learnedAt': (value, translations) => this.learnedAt(value, translations),
      'actions': (value, translations) => this.actions(value, translations)
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

}
export default new Converters();
