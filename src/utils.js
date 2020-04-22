
import { Component } from "niem-model";

class Utils {

  static getPropertyRoute({userKey, modelKey, releaseKey, prefix, name}) {
    return `/${userKey}/${modelKey}/${releaseKey}/properties/${prefix}/${name}`;
  }

  static getTypeRoute({userKey, modelKey, releaseKey, prefix, name}) {
    return `/${userKey}/${modelKey}/${releaseKey}/types/${prefix}/${name}`;
  }

  static getNamespaceRoute({userKey, modelKey, releaseKey, prefix}) {
    return `/${userKey}/${modelKey}/${releaseKey}/namespaces/${prefix}`;
  }

  static getBreadcrumb({userKey, modelKey, releaseKey, prefix, name}, style) {
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

    if (prefix && !name) {
      breadcrumb.push({text: "namespaces", to: path});

      path += `/namespaces/${prefix}`;
      breadcrumb.push({text: prefix, to: path});
      activeIndex = 4;
    }

    if (name) {
      breadcrumb.push({text: style, to: `${path}/${style}`});

      breadcrumb.push({text: prefix, to: `${path}/namespaces/${prefix}/${style}`});

      breadcrumb.push({text:name, to: `${path}/${style}/${prefix}/${name}`});
      activeIndex = 5;
    }

    // Do not create a link for the currently active page
    delete breadcrumb[activeIndex].to;
    breadcrumb[activeIndex].active = true;

    return breadcrumb;
  }

  /**
   * @param {Component} component
   * @param {{label: string, link: string}[]} path
   */
  static updatePath(component, path) {

    let link = (component.constructor.name == "Type") ? Utils.getTypeRoute(component) : Utils.getPropertyRoute(component);

    return [
      ...path,
      {
        label: component.qname,
        link
      }
    ];

  }


  /**
   * @param {ComponentInstance} component1
   * @param {ComponentInstance} component2
   */
  static sortComponentsCoreFirst(component1, component2) {

    if (component1.prefix != component2.prefix) {
      if (component1.prefix == "nc") {
        return -1;
      }
    }
    return component1.qname.localeCompare(component2.qname);

}

}

export default Utils;
