
import { NIEMInstance, ModelInstance, ReleaseInstance, NamespaceInstance, LocalTermInstance, PropertyInstance, TypeInstance, SubPropertyInstance, FacetInstance } from "../assets/js/classes";

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
