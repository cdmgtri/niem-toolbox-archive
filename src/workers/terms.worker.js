
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
  "Integer",
  "ID",
  "Indicator",
  "List",
  "Name",
  "Number",
  "Numeric",
  "Other",
  "Point",
  "Range",
  "Representation",
  "Quantity",
  "Text",
  "Time",
  "Value"
];


/**
 * Returns an object with property terms as keys and term counts as values.
 *
 * @example { Person: 10, Location 8 }
 *
 * @param {String[]} terms
 * @param {Object} [options]
 * @param {Number} [options.maxTerms] - Maximum number of terms to return (default=undefined)
 * @param {Boolean} [options.dropRepTerms] - True to drop common NIEM representation terms (default=false)
 * @param {String[]} [options.prefixes=[]] - List of namespace prefixes to filter given properties
 */
export async function getTermCounts(terms, options={dropRepTerms: false, maxTerms: undefined, prefixes: []}) {

  let uniqueTerms = new Set(terms);

  if (options.dropRepTerms == true) {
    // Remove common NIEM representation terms from the results
    commonRepresentationTerms.forEach( repTerm => uniqueTerms.delete(repTerm) );
  }

  /** @type {Object.<string, number} */
  let termCounts = {};

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
 * @param {Object.<string, number>} termCounts
 * @param {Object} [options]
 * @param {Number} [options.maxTerms] - Maximum number of terms to return (default=75)
 * @param {Boolean} [options.dropRepTerms] - True to drop common NIEM representation terms (default=true)
 * @param {String[]} [options.prefixes=[]] - List of namespace prefixes to filter given properties
 */
export async function getCloudWords(termCounts) {

  /** @type {[string, number][]} */
  let words = [];

  // Translate the counts object into an array of arrays: [["term1", 2], ["term2", 5], ...]
  Object.keys(termCounts).forEach( term => words.push([term, termCounts[term]]) );

  return words;

}

/**
 * @param {Object.<string, number>} termCounts
 */
export async function getWeightRanges(termCounts) {
  let counts = Object.values(termCounts).sort( (a, b) => a - b );
  let thirdLength = Math.round(counts.length / 3);

  return {
    topThird: counts[2 * thirdLength],
    bottomThird: counts[thirdLength]
  }
}
