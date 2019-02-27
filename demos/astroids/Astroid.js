class Astroid extends Dna.Component {
  constructor(astroidPrefab) {
    super();

    this.astroidPrefab = astroidPrefab;
  }

  onDestroy() {
    this.astroidPrefab.destroyAstroid();
  }
}

export { Astroid };
