
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
export function breadcrumbs(route) {

  let {userKey, modelKey, releaseKey, prefix, qname} = route.params;


  let breadcrumb = [];
  let path = "";
  let activeIndex = -1;

  if (userKey) {
    breadcrumb.push({text: userKey, to: `/`});
    activeIndex = 0;
  }

  if (modelKey) {
    path = `/${userKey}/${modelKey}`;
    breadcrumb.push({text: modelKey, to: path});
    activeIndex = 1;
  }

  if (releaseKey) {
    path += `/${releaseKey}`;
    breadcrumb.push({text: releaseKey, to: path});
    activeIndex = 2;
  }

  if (prefix) {
    breadcrumb.push({text: "namespaces", to: `${path}/namespaces`});

    path += `/namespaces/${prefix}`;
    breadcrumb.push({text: prefix, to: path});
    activeIndex = 4;
  }

  if (qname) {

    let group = (route.path.includes("properties")) ? "properties" : "types";

    breadcrumb.push({text: group, to: `${path}/${group}`});
    breadcrumb.push({text: qname, to: `${path}/${group}/${qname}`});
    activeIndex = 4;
  }

  // Do not create a link for the currently active page
  delete breadcrumb[activeIndex].to;
  breadcrumb[activeIndex].active = true;

  return breadcrumb;

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
