
import { Component, Property } from "niem-model";

let PropertyInstance = new Property();
let ComponentInstance = new Component();

class Utils {

  static getPropertyRoute({userKey, modelKey, releaseKey, prefix, name}) {
    if (!prefix || !name) return "";
    return `/${userKey}/${modelKey}/${releaseKey}/properties/${prefix}:${name}`;
  }

  static getTypeRoute({userKey, modelKey, releaseKey, prefix, name}) {
    if (!prefix || !name) return "";
    return `/${userKey}/${modelKey}/${releaseKey}/types/${prefix}:${name}`;
  }

  static getNamespaceRoute({userKey, modelKey, releaseKey, prefix}) {
    if (!prefix) return "";
    return `/${userKey}/${modelKey}/${releaseKey}/namespaces/${prefix}`;
  }

  /**
   * @param {PropertyInstance[]} properties
   * @param {string} field
   * @param {string} input
   */
  static searchProperties(properties, field, input) {
    if (!input) return properties;
    let regex = input.trim().toLowerCase().replace(/\*/g, ".*").replace(/ /g, ".*");
    return properties.filter( property => property[field].toLowerCase().match(regex))
  }

  /**
   * @param {"Property"|"Type"|"Namespace"} style
   */
  static getBreadcrumb({userKey, modelKey, releaseKey, prefix, qname}, style) {
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

      let group = (style == "Property") ? "properties" : "types";

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
  static updateXPath(currentXPath="", property) {
    if (!property || property.isAbstract == true) return currentXPath;
    if (currentXPath == "") return property.qname;
    return currentXPath + "/" + property.qname;
  }


  /**
   * @param {ComponentInstance} component1
   * @param {ComponentInstance} component2
   */
  static sortComponentsCoreFirst(component1, component2) {

    if (component1.prefix != component2.prefix) {
      return component1.prefix == "nc" ? -1 : 1;
    }
    return component1.qname.localeCompare(component2.qname);

}

}

export default Utils;
