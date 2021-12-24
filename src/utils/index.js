
import Data from "./data";
import { NIEM, Model, Release, Namespace, LocalTerm, Component, Property, Type, Facet, SubProperty } from "niem-model";

export let data = new Data();


// For CommonJS intellisense (JSDoc sees the actual model objects as "typeof" the model objects)
export let NIEMInstance = new NIEM();
export let ModelInstance = new Model();
export let ReleaseInstance = new Release();
export let NamespaceInstance = new Namespace();
export let LocalTermInstance = new LocalTerm();
export let ComponentInstance = new Component();
export let PropertyInstance = new Property();
export let TypeInstance = new Type();
export let FacetInstance = new Facet();
export let SubPropertyInstance = new SubProperty();



/**
 * @param {{params: Object, path: string}} route
 */
export function getBreadcrumbs(route) {

  let crumbs = [];
  let currentIndex = 0;
  let currentPath = "";
  let segments = route.path.replace(/^\//, "").replace(/\/$/, "").split("/");

  crumbs.push( { text: "Home", to: "/" });

  segments.forEach( segment => {
    currentPath += "/" + segment;
    currentIndex = currentIndex + 1;

    /** @type {{text: string, to?: string, active?: boolean}} */
    let crumb = { text: segment };

    if (currentIndex < segments.length) {
      crumb.to = currentPath;
    }
    else {
      crumb.active = true;
    }

    crumbs.push(crumb);
  });

  return crumbs;

}

/**
 * Adds the property qname to the current xpath if the property is not abstract.
 * @param {String} currentXPath
 * @param {PropertyInstance} property
 */
export function updateXPath(currentXPath="", property) {
  if (!property || property.isAbstract == true) return currentXPath;
  if (currentXPath == "") return property.qname;
  return currentXPath + "/" + property.qname;
}


export function getReleaseLink(userKey, modelKey, releaseKey) {
  return `/sources/${userKey}/${modelKey}/${releaseKey}/`;
}
