
export class Walker {
  constructor(private readonly map: string[][]) { }

  walk() {
    if (this.map.length) {
      return {
        path: this.getPath(),
        letters: this.collectLetters(),
      };
    }

    return { error: "Error" };
  }

  private getPath() {
    return '';
  }

  private collectLetters() {
    return '';
  }
}
