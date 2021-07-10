const R = require('ramda');

function getKSubsets(k, set) {
  //console.log(`getKSubsets: called with k=${k} for:`, set);
  if (k == 0)
    return [];
  if (set.length == k)
    return [set];

  const [first, tailSet] = R.splitAt(1, set);

  const tailKSubsets = getKSubsets(k, tailSet); 
  const kLessOneSets = getKSubsets(k-1, tailSet);
  const kSubsetsWithFirst = (kLessOneSets.length > 0)
    ? kLessOneSets.map(R.concat(first))
    : [first];
  return R.concat(kSubsetsWithFirst, tailKSubsets);
}

const getKSubsetIndexes = R.curry((n, k) => {
  //console.log(`getKSubsetIndexes: called with n=${n} and k=${k}`);
  const inArr = R.range(0, n);
  //console.log(`getKSubsetIndexes: inArr:`, inArr);
  //return 'stopped';
  return getKSubsets(k, inArr);
});

//TODO see if 1) it can return a value and 2) the generalization can be re-used
const visitNodesForKSets = (data, ksets, callback) => {
  const kset = R.head(ksets);   // k-set for current skills level
  const lesserSkillKSets = R.tail(ksets);
  kset.forEach(mbrIdx => {
    if (lesserSkillKSets.length > 0) {
      const dataForKSetMbr = data[mbrIdx].children;
      visitNodesForKSets(dataForKSetMbr, lesserSkillKSets, callback);
    }
    else {
      callback(data[mbrIdx]);
    }
  })
};

const getFirstValWithEnclosingCeiling = R.curry((testDecimal, valueObj) =>
  (valueObj.ceiling >= testDecimal)
);

function getRandomEnumMbr(random, arrValueObjs) {
  const rndDec = random.random();
  return arrValueObjs.find(getFirstValWithEnclosingCeiling(rndDec));
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// use Box-Muller transform to create normal variates, u0 and v, from uniform variates 
const randomNormals = (random) => {
  let u1 = 0, u2 = 0;
  // convert [0,1) to (0,1)
  while (u1 === 0) u1 = random.random();
  while (u2 === 0) u2 = random.random();
  const R = Math.sqrt(-2.0 * Math.log(u1));
  const Θ = 2.0 * Math.PI * u2;
  return [R * Math.cos(Θ), R * Math.sin(Θ)];
};

const randomSkewNormal = (random, mean, stddev, skew = 0) => {
  const [u0, v] = randomNormals(random); 
  if (skew === 0)
      return mean + stddev * u0;
  const correlation = skew / Math.sqrt(1 + skew * skew);
  const u1 = correlation * u0 + Math.sqrt(1 - correlation * correlation) * v;
  const z = u0 >= 0 ? u1 : -u1;
  return mean + stddev * z;
};

const randomizeBaseValue = (random, behaviorName, behavior) => {
  const {curve, min, max, mean, lambda, stddev, skew} = behavior;
  switch (curve) {
    case 'exponential':
      return random.exponential(lambda);
    case 'uniform':
      return random.uniform(min, max);
    case 'normal':
      return random.normal(mean, stddev);
    case 'skew-normal':
      return randomSkewNormal(random, mean, stddev, skew)
    default:
      throw new Error(`invalid curve ${curve} for ${behaviorName} in multipliers.json`)
  }
};

const accumEnumMutipliers = R.curry((ixn, accum, modifier) => {
  const dimName = modifier.source;
  const dimValue = ixn[dimName];
  return accum * modifier.modmap[dimValue].multiplier;
});

function randomizeBehavior(random, initData, behaviorName, ixn) {
  const behavior = initData.mults[behaviorName];
  const randomBaseValue = randomizeBaseValue(random, behaviorName, behavior) 
  const enumMultiplier = R.pipe(
    R.filter(R.whereEq({type: 'enum'})),
    R.reduce(accumEnumMutipliers(ixn), 1.0)
  )(behavior.modifiers);
  return randomBaseValue * enumMultiplier;
}

function randPolar(mean, variance, min, max) {
  let x, y, q, p, rand;
  do {
    do {
        x = Math.random();
        y = Math.random();
        q = Math.pow((2 * x - 1), 2) + Math.pow((2 * y - 1), 2);
    }
    while (q > 1);

    p = Math.sqrt((-2 * Math.log(q))/q);
    y = ((2 * y - 1) * p);
    x = ((2 * x - 1) * p);
    rand = y * mean + variance;
  }
  while (rand > max || rand < min);

  return rand;
};

module.exports = {
  getKSubsets,
  getKSubsetIndexes,
  visitNodesForKSets,
  getRandomEnumMbr,
  getRandomInRange,
  randPolar,
  randomNormals,
  randomSkewNormal,
  randomizeBehavior
};