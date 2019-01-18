const data = require('./data.json');

/**
 * Pokemon's type.
 * @typedef {object} Pokemon
 * @property {number} id - Pokemon's id.
 * @property {string} name - Pokemon's name.
 * @property {Array<string>} typeList - Pokemon's types.
 */

/**
 * Returns pokemon found by its id.
 *
 * @param {number} id - Pokemon's id.
 * @returns {Pokemon|null} - Pokemon if founded, else returns null.
 */
function getPokemonById(id) {
  return data.find(function(pokemon) {
    return pokemon.id === id;
  }) || null;
}

/**
 * Returns pokemon found by its name.
 *
 * @param {string} name - Pokemon's id.
 * @returns {Pokemon|null} - Pokemon if founded, else returns null.
 */
function getPokemonByName(name) {
  return data.find(function(pokemon) {
    return pokemon.name === name;
  }) || null;
}

/**
 * Returns list of pokemons filtered with passed info.
 *
 * @param {object} [filter={}] - Filter descriptor.
 * @param {Array<string>|string|null} [filter.type=null] - Types of pokemons to returns.
 * If type is `null`, skip this filter. If type is string, returns list of pokemons which has this type.
 * If type is an array, returns list of pokemons which has all of types.
 * @returns {Array<Pokemon>} - List of filtered pokemons.
 */
module.exports = function getPokemonList(filter) {
  const filterObject = Object.assign({}, filter || {});

  if (filterObject.type) {
    filterObject.type = Array.isArray(filterObject.type) ? [...filterObject.type] : [filterObject.type]
  } else {
    filterObject.type = null
  }

  return data.filter(function(pokemon) {
    if (!filterObject.type) return true;

    return filterObject.type.every(function(type) {
      return pokemon.typeList.includes(type);
    });
  });
};

module.exports.getPokemonById = getPokemonById;
module.exports.getPokemonByName = getPokemonByName;
