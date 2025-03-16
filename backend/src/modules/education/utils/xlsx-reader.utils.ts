import * as XLSX from 'xlsx';

export class XlsxReader {
  static read(
    path: string,
  ): Record<string, Map<string, Record<string, string | number>>> {
    const rawXlsx = XLSX.readFile(path);
    const entries = Object.entries(rawXlsx.Sheets);

    return entries.reduce((accum, page) => {
      const [name, workSheet] = page;

      return {
        ...accum,
        [name]: new Map(
          Object.keys(workSheet)
            .filter((x) => new RegExp(/^[A-Za-z]+\d+$/).test(x))
            .sort(this.comporator)
            .map((x) => [x, workSheet[x]]),
        ),
      };
    }, {});
  }

  static comporator(a: string, b: string): number {
    const colA = a.match(/[A-Z]+/)[0];
    const rowA = parseInt(a.match(/\d+/)[0]);

    const colB = b.match(/[A-Z]+/)[0];
    const rowB = parseInt(b.match(/\d+/)[0]);

    if (colA < colB) return -1;
    if (colA > colB) return 1;

    return rowA - rowB;
  }
}
