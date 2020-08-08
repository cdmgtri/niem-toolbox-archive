
import { NIEM, Model, Release, Namespace, LocalTerm, Property, Type, SubProperty, Facet } from "niem-model";

let NIEMInstance = new NIEM();
let ReleaseInstance = new Release();
let NamespaceInstance = new Namespace();
let PropertyInstance = new Property();
let TypeInstance = new Type();
let FacetInstance = new Facet();
let SubPropertyInstance = new SubProperty();

/**
 * @param {NIEMInstance} niem
 */
export async function load(niem, modelJSON) {
  await niem.load(modelJSON);
}

/**
 * @param {ReleaseInstance} release
 */
export async function namespaces(release) {
  return release.namespaces.find();
}

/**
 * @param {ReleaseInstance} release
 */
export async function localTerms(release) {
  return release.localTerms.find();
}

/**
 * @param {ReleaseInstance} release
 */
export async function properties(release) {
  return release.properties.find();
}

/**
 * @param {ReleaseInstance} release
 */
export async function types(release) {
  return release.types.find();
}

/**
 * @param {ReleaseInstance} release
 */
export async function facets(release) {
  return release.facets.find();
}

/**
 * @param {ReleaseInstance} release
 */
export async function subProperties(release) {
  return release.subProperties.find();
}

export async function test(x) {
  await sleep(10);
  return "Worker received new argument " + x;
}

async function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
