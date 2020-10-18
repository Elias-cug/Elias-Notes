const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

const DOES_NOT_EXIST = -1;

const lesserEquals = function(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

const biggerEquals =function(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

const defaultCompare = function(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

const defaultEquals = function (a, b) {
  return a === b;
}

const defaultToString = function (item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

const swap = function (array, a, b) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}
const reverseCompare = function (compareFn) {
  return (a, b) => compareFn(b, a);
}

const defaultDiff = function(a, b) {
  return Number(a) - Number(b);
}

module.exports = {
  Compare,
  DOES_NOT_EXIST,
  lesserEquals,
  biggerEquals,
  defaultCompare,
  defaultEquals,
  defaultToString,
  swap,
  reverseCompare,
  defaultDiff
}