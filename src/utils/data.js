
import store from "../store";
import { Namespace, Component } from "niem-model";

let { niem } = store.state;

class Data {

  constructor() {
    this.niem = niem;
  }

  get userKeys() {
    return {
      find: async () => {
        return this.niem.userKeys.find();
      }
    }
  }

  get models() {
    return {

      /**
       * @param {Object} [criteria]
       * @param {String} [criteria.userKey]
       * @param {String} [criteria.modelKey]
       * @param {"IEPD"|"model"|"other"} [criteria.style]
       */
      find: async (criteria={}) => {
        return this.niem.models.find(criteria);
      }
    }
  }

  get releases() {
    return {

      get: async ({userKey, modelKey, releaseKey}) => {
        return this.niem.releases.get(userKey, modelKey, releaseKey);
      },

      /**
       * @param {Object} [criteria]
       * @param {String} [criteria.userKey]
       * @param {String} [criteria.modelKey]
       * @param {String} [criteria.releaseKey]
       * @param {String} [criteria.niemReleaseKey]
       * @param {"IEPD"|"model"|"other"} [criteria.style]
       * @param {"draft"|"published""} [criteria.status]
       */
      find: async (criteria={}) => {
        return this.niem.releases.find(criteria);
      }

    }
  }


  get namespaces() {
    return {

      /**
       * Gets the namespace with the given identifier fields.
       */
      get: async ({userKey, modelKey, releaseKey, prefix}) => {
        return this.niem.namespaces.get(userKey, modelKey, releaseKey, prefix);
      },

      /**
       * @param {Object} criteria
       * @param {String} [criteria.userKey]
       * @param {String} [criteria.modelKey]
       * @param {String} [criteria.releaseKey]
       * @param {String} [criteria.niemReleaseKey]
       * @param {String} [criteria.prefix]
       * @param {String} [criteria.uri]
       * @param {Boolean} [criteria.conformanceRequired]
       * @param {"core|domain|auxiliary|code|extension|adapter|external|proxy|utility|csv|built-in|core supplement|domain update"} [criteria.style]
       */
      find: async (criteria={}) => {
        let namespaces = await niem.namespaces.find(criteria);
        return namespaces.sort(Namespace.sortByStyle);
      },

      route: ({userKey, modelKey, releaseKey, prefix}) => {
        return `/${userKey}/${modelKey}/${releaseKey}/namespaces/${prefix}`;
      }

    }
  }


  get localTerms() {
    return {

      /**
       * Gets the namespace with the given identifiers.
       *
       * @param {Object} identifiers
       * @param {String} identifiers.userKey
       * @param {String} identifiers.modelKey
       * @param {String} identifiers.releaseKey
       * @param {String} identifiers.prefix
       * @param {String} identifiers.term
       */
      get: async (identifiers={}) => {
        return this.niem.localTerms.get(identifiers.userKey, identifiers.modelKey, identifiers.releaseKey, identifiers.prefix, identifiers.term);
      },

      /**
       * @param {Object} criteria
       * @param {String} [criteria.userKey]
       * @param {String} [criteria.modelKey]
       * @param {String} [criteria.releaseKey]
       * @param {String} [criteria.niemReleaseKey]
       * @param {String} [criteria.prefix]
       * @param {String} [criteria.term]
       */
      find: async (criteria={}) => {
        return this.niem.localTerms.find(criteria);
      }
    }
  }


  get properties() {
    let self = this;

    return {

      /**
       * Gets the property with the given identifiers.
       * Note: Either the qname or prefix+name is required.
       *
       * @param {Object} identifiers
       * @param {String} identifiers.userKey
       * @param {String} identifiers.modelKey
       * @param {String} identifiers.releaseKey
       * @param {String} [identifiers.qname]
       * @param {String} [identifiers.prefix]
       * @param {String} [identifiers.name]
       */
      get: async (identifiers={}) => {
        let qname = identifiers.qname || identifiers.prefix + ":" + identifiers.name;
        return this.niem.properties.get(identifiers.userKey, identifiers.modelKey, identifiers.releaseKey, qname);
      },

      /**
       * @param {Object} criteria
       * @param {String} [criteria.userKey]
       * @param {String} [criteria.modelKey]
       * @param {String} [criteria.releaseKey]
       * @param {String} [criteria.niemReleaseKey]
       * @param {String} [criteria.qname]
       * @param {String} [criteria.prefix]
       * @param {String} [criteria.name]
       * @param {String} [criteria.groupPrefix]
       * @param {String} [criteria.groupQName]
       * @param {String} [criteria.typeQName]
       * @param {String} [criteria.typePrefix]
       * @param {Boolean} [criteria.isAbstract]
       * @param {Boolean} [criteria.isElement]
       * @param {"element"|"attribute"|"abstract"} [criteria.style]
       */
      find: async (criteria={}) => {
        let properties = await this.niem.properties.find(criteria);
        return properties.sort(Component.sortByCoreQName);
      },

      /**
       * @param {PropertyInstance[]} properties
       * @param {string} field
       * @param {string} input
       * @param {Boolean} searchDefinitions True to also search definition (default=false)
       */
      search: async (properties, field, input="", searchDefinitions=false) => {

        if (!properties) {
          // Search all relevant properties if a subset of properties is not provided
          properties = await self.properties.find(store.getters.defaultSearchCriteria);
        }

        if (input == "") return properties;

        // Split input into search term array on spaces and wildcards (*)
        let searchTerms = input.trim().toLowerCase().replace(/\*/g, " ").split(" ");

        let results = properties.filter( property => {
          if (!property[field]) return false;
          let propertyFieldValue = "" + property[field].toLowerCase();
          if (searchDefinitions == true) propertyFieldValue += " " + property.definition.toLowerCase();
          return searchTerms.every( term => propertyFieldValue.includes(term) );
        });

        console.log("search", results.length, field, input);

        return results;

      },

      route: ({userKey, modelKey, releaseKey, qname}) => {
        return `/${userKey}/${modelKey}/${releaseKey}/properties/${qname}`;
      },

      /**
       * Returns a list of terms compiled from the given property names, broken up by camel casing.
       *
       * @param {PropertyInstance[]} properties
       * @param {String[]} [prefixes=[]] - List of namespace prefixes to filter given properties
       */
      terms: (properties, prefixes=[]) => {

        let filteredProperties = properties;

        if (prefixes.length > 0) {
          // Filter properties by the given prefixes
          filteredProperties = filteredProperties.filter( property => prefixes.includes(property.prefix) );
        }

        /** @type {String[]} */
        let terms = [];

        for (let property of properties) {
          // Add each property term to the terms array
          property.terms.forEach( term => terms.push(term) );
        }

        return terms;

      }

    }
  }


  get types() {
    return {

      /**
       * Gets the type with the given identifiers.
       * Note: Either the qname or prefix+name is required.
       *
       * @param {Object} identifiers
       * @param {String} identifiers.userKey
       * @param {String} identifiers.modelKey
       * @param {String} identifiers.releaseKey
       * @param {String} [identifiers.qname]
       * @param {String} [identifiers.prefix]
       * @param {String} [identifiers.name]
       */
      get: async (identifiers={}) => {
        let qname = identifiers.qname || identifiers.prefix + ":" + identifiers.name;
        return this.niem.types.get(identifiers.userKey, identifiers.modelKey, identifiers.releaseKey, qname);
      },

      /**
       * @param {Object} criteria
       * @param {String} [criteria.userKey]
       * @param {String} [criteria.modelKey]
       * @param {String} [criteria.releaseKey]
       * @param {String} [criteria.niemReleaseKey]
       * @param {String} [criteria.qname]
       * @param {String} [criteria.prefix]
       * @param {String} [criteria.name]
       * @param {String} [criteria.basePrefix]
       * @param {String} [criteria.baseQName]
       * @param {Boolean} [criteria.isComplexContent]
       * @param {Boolean} [criteria.isComplexType]
       * @param {"object"|"adapter"|"association"|"augmentation"|"metadata"|"CSC"|"simple"|"list"|"union"} [criteria.style]
       */
      find: async (criteria={}) => {
        let types = await this.niem.types.find(criteria);
        return types.sort(Component.sortByCoreQName);
      },

      route: ({userKey, modelKey, releaseKey, qname}) => {
        return `/${userKey}/${modelKey}/${releaseKey}/types/${qname}`;
      },

    }
  }


  get subProperties() {
    return {

      /**
       * Gets the type with the given identifiers.
       * Note: Either the qname or prefix+name is required.
       *
       * @param {Object} identifiers
       * @param {String} identifiers.userKey
       * @param {String} identifiers.modelKey
       * @param {String} identifiers.releaseKey
       * @param {String} [identifiers.typeQName]
       * @param {String} [identifiers.typePrefix]
       * @param {String} [identifiers.typeName]
       * @param {String} [identifiers.propertyQName]
       * @param {String} [identifiers.propertyPrefix]
       * @param {String} [identifiers.propertyName]
       */
      get: async (identifiers={}) => {
        let typeQName = identifiers.typeQName || identifiers.typePrefix + ":" + identifiers.typeName;
        let propertyQName = identifiers.propertyQName || identifiers.propertyPrefix + ":" + identifiers.propertyName;
        return this.niem.subProperties.get(identifiers.userKey, identifiers.modelKey, identifiers.releaseKey, typeQName, propertyQName);
      },

      /**
       * @param {Object} criteria
       * @param {String} [criteria.userKey]
       * @param {String} [criteria.modelKey]
       * @param {String} [criteria.releaseKey]
       * @param {String} [criteria.niemReleaseKey]
       * @param {String} [criteria.typePrefix]
       * @param {String} [criteria.typeQName]
       * @param {String} [criteria.typeName]
       * @param {String} [criteria.propertyPrefix]
       * @param {String} [criteria.propertyQName]
       * @param {String} [criteria.propertyName]
       * @param {String} [criteria.min]
       * @param {String} [criteria.max]
       */
      find: async (criteria={}) => {
        return this.niem.subProperties.find(criteria);
      }

    }
  }


  get facets() {
    return {

      /**
       * Gets the type with the given identifiers.
       * Note: Either the qname or prefix+name is required.
       *
       * @param {Object} identifiers
       * @param {String} identifiers.userKey
       * @param {String} identifiers.modelKey
       * @param {String} identifiers.releaseKey
       * @param {String} [identifiers.qname]
       * @param {String} [identifiers.prefix]
       * @param {String} [identifiers.name]
       * @param {String} identifiers.value
       * @param {String} [identifiers.style]
       * @param {String} [identifiers.definition]
       */
      get: async (identifiers={}) => {
        let typeQName = identifiers.typeQName || identifiers.typePrefix + ":" + identifiers.typeName;

        return this.niem.facets.get(identifiers.userKey, identifiers.modelKey, identifiers.releaseKey, typeQName, identifiers.value, identifiers.style, identifiers.definition);
      },

      /**
       * @param {Object} criteria
       * @param {String} [criteria.userKey]
       * @param {String} [criteria.modelKey]
       * @param {String} [criteria.releaseKey]
       * @param {String} [criteria.niemReleaseKey]
       * @param {String} [criteria.typeQName]
       * @param {String} [criteria.typePrefix]
       * @param {String} [criteria.typeName]
       * @param {String} [criteria.definition]
       * @param {String} [criteria.value]
       * @param {String} [criteria.style]
       * @param {Boolean} [criteria.isCode]
       * @param {Boolean} [criteria.isComplexContent]
       * @param {Boolean} [criteria.isComplexType]
       * @param {"object"|"adapter"|"association"|"augmentation"|"metadata"|"CSC"|"simple"|"list"|"union"} [criteria.style]
       */
      find: async (criteria={}) => {
        return this.niem.facets.find(criteria);
      }

    }
  }

}

export default Data;

import { PropertyInstance } from "./index";
