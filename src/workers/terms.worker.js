
import { PropertyInstance } from "../assets/js/classes";

let commonRepresentationTerms = [
  "Abstract",
  "Amount",
  "Association",
  "Augmentation",
  "Category",
  "Code",
  "Date",
  "DateTime",
  "Description",
  "Details",
  "Duration",
  "Identification",
  "Information",
  "ID",
  "Indicator",
  "List",
  "Name",
  "Numeric",
  "Other",
  "Point",
  "Representation",
  "Quantity",
  "Text",
  "Time",
  "Value"
];

/**
 * Returns a list of terms compiled from the given property names, broken up by camel casing.
 *
 * @example ["Person", "Location", "Given", "Person", "Person", "Name"]
 *
 * @param {PropertyInstance[]} properties
 * @param {Object} [options]
 * @param {Boolean} [options.dropRepTerms] - True to drop common NIEM representation terms (default=false)
 * @param {String[]} [options.prefixes=[]] - List of namespace prefixes to filter given properties
 */
export async function getTerms(properties, options={dropRepTerms: false, prefixes: []}) {

  let filteredProperties = properties;

  if (options.prefixes.length > 0) {
    // Filter properties by the given prefixes
    filteredProperties = filteredProperties.filter( property => options.prefixes.includes(property.prefix) );
  }

  /** @type {String[]} */
  let terms = [];

  for (let property of properties) {
    // Add each property term to the terms array
    property.terms.forEach( term => terms.push(term) );
  }

  if (options.dropRepTerms == true) {
    // Remove common NIEM representation terms from the results
    terms = terms.filter( term => !commonRepresentationTerms.includes(term) );
  }

  return terms;

}

/**
 * Returns an object with property terms as keys and term counts as values.
 *
 * @example { Person: 10, Location 8 }
 *
 * @param {PropertyInstance[]} properties - List of properties to grab terms from
 * @param {Object} [options]
 * @param {Number} [options.maxTerms] - Maximum number of terms to return (default=undefined)
 * @param {Boolean} [options.dropRepTerms] - True to drop common NIEM representation terms (default=false)
 * @param {String[]} [options.prefixes=[]] - List of namespace prefixes to filter given properties
 */
export async function getTermCounts(properties, options={dropRepTerms: false, maxTerms: undefined, prefixes: []}) {

  /** @type {Object.<string, number} */
  let termCounts = {};

  let terms = await getTerms(properties, options);
  let uniqueTerms = new Set(terms);

  // Count each time a term is used in a property name
  for (let uniqueTerm of uniqueTerms) {
    termCounts[uniqueTerm] = terms.filter( term => term == uniqueTerm ).length;
  }

  // Sort numeric array of term counts in descending order
  let counts = Object.keys(termCounts).map( term => termCounts[term] ).sort( (a, b) => b - a );

  // Find the minimum count value corresponding to the expected number of terms, barring single-use terms
  let minCount = (options.maxTerms && counts.length > options.maxTerms) ? counts[options.maxTerms] : 2;

  /** @type {Object.<string, number} */
  let results = {};

  for (let term in termCounts) {
    let count = termCounts[term];
    if (count >= minCount) results[term] = count;
  }

  return results;

}

/**
 * Gets terms and term counts from the given properties into an array of arrays
 *
 * @example [["Person", 10], ["Location", 6], ["Organization", 8]]
 *
 * @param {PropertyInstance[]} properties - List of properties to grab terms from
 * @param {Object} [options]
 * @param {Number} [options.maxTerms] - Maximum number of terms to return (default=75)
 * @param {Boolean} [options.dropRepTerms] - True to drop common NIEM representation terms (default=true)
 * @param {String[]} [options.prefixes=[]] - List of namespace prefixes to filter given properties
 */
export async function getCloudWords(properties, options={dropRepTerms: true, maxTerms: 75, prefixes: []}) {

  /** @type {[string, number][]} */
  let words = [];

  let termCounts = await getTermCounts(properties, options);

  // Translate the counts object into an array of arrays: [["term1", 2], ["term2", 5], ...]
  Object.keys(termCounts).forEach( term => words.push([term, termCounts[term]]) );

  return words;

}
