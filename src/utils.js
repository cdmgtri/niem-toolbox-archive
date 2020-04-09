
class Utils {

  static getPropertyRoute({userKey, modelKey, releaseKey, prefix, name}) {
    return `/${userKey}/${modelKey}/${releaseKey}/${prefix}/properties/${name}`;
  }

  static getTypeRoute({userKey, modelKey, releaseKey, prefix, name}) {
    return `/${userKey}/${modelKey}/${releaseKey}/${prefix}/types/${name}`;
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

    if (prefix) {
      path += `/${prefix}`;
      breadcrumb.push({text: prefix, to: path});
      activeIndex = 3;
    }

    if (name) {
      path += `/${style}`;
      breadcrumb.push({text: style, to: path});

      path += `/name`;
      breadcrumb.push({text:name, to: path});
      activeIndex = 5;
    }

    // Do not create a link for the currently active page
    delete breadcrumb[activeIndex].to;
    breadcrumb[activeIndex].active = true;

    return breadcrumb;
  }

}

export default Utils;
