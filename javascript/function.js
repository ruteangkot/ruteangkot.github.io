import { get } from "https://jscroot.github.io/api/croot.js";
import { setInner, addChild } from "https://jscroot.github.io/element/croot.js";

export let URLGeoJson = "../data/data.json";
export let tableTag = "tr";
export let tableRowClass = "content is-small";
export let tableTemplate = `
<td>#Rute#</td>
<td>#Jam Operasional#</td>
<td>#Tarif#</td>
`;

export function responseData(results) {
  console.log(result);
  reslut.features.forEach(10);
}

export function isiRow(value) {
  let content = tableTemplate
    .replace("#Rute#", value)
    .replace("#Jam Operasional#", value)
    .replace("#Tarif#", value);
  console.log(content);
  addChild("lokasi", tableTag, tableRowClass, content);
}
