# jlafer-lib

This is a library of helper functions that I find useful.

## Installation
```
npm install --save jlafer-lib
cd jlafer-lib
npm install
```

## Array Functions

### takeSelected
```
takeSelected :: ([a], [index]) -> [a]
```
Returns items from the first array whose positions are found in the second array of index values.
```javascript
const input = [
  {name: 'name', value: 'order_num'},
  {name: 'length', value: 10},
  {name: 'datatype', value: 'string'}
];
takeSelected(input, [0,2])  //=> [{name: 'name', value: 'order_num'}, {name: 'datatype', value: 'string'}]
```
### filterOnMatchInOtherList
```
filterOnMatchInOtherList :: predFn -> [b] -> [a] -> [a]
```

### filterOnMatchingKeyInOtherList
```
filterOnMatchingKeyInOtherList :: string -> [b] -> [a] -> [a]
```

### filterOnMatchingSidInOtherList
```
filterOnMatchingSidInOtherList :: [b] -> [a] -> [a]
```

### matchAndMapLists
```
matchAndMapLists :: (matcherFn, mapperFn) -> ([a] -> [b]) -> [a]
```

## Array-of-Object Functions

### findObjByKeyVal
```
findObjByKeyVal :: string -> string -> [object] -> object
```
This function will return the first object matched by key and value from the object array argument.
```javascript
const scores = [
  {name: 'alice', value: 9},
  {name: 'bob', value: 7},
  {name: 'chuck', value: 8}
];
findObjByKeyVal('name', 'bob', scores); //=> {name: 'bob', value: 7}
```

### findObjBySid
```
findObjBySid :: string -> [object] -> object
```
This function will return the first object with the `sid` value matched by the specified string value from the object array argument. This function is a partial application of `findObjByKeyVal`.

### findObjByFriendlyName
```
findObjByFriendlyName :: string -> [object] -> object
```
This function will return the first object with the `friendlyName` value matched by the specified string value from the object array argument. This function is a partial application of `findObjByKeyVal`.

### findObjByUniqueName
```
findObjByUniqueName :: string -> [object] -> object
```
This function will return the first object with the `uniqueName` value matched by the specified string value from the object array argument. This function is a partial application of `findObjByKeyVal`.

### kvListToObj
```
kvListToObj :: (string, string) -> [object] -> object
```
This function will return an object having properties drawn from the "key-value objects" array supplied. The keys will be taken from the object properties keyed by the first string and the vallues will be taken from the object properties keyed by the second string. It is useful for mapping an array of properties into a dictionary object.
```javascript
const input = [
  {id: 'name', val: 'order_num'},
  {id: 'length', val: 10},
  {id: 'datatype', val: 'string'}
];
const idValListToObj = kvListToObj('id', 'val');
idValListToObj(input)  //=> {name: 'order_num', length: 10, datatype: 'string'}
```
### idValueListToObj
```
idValueListToObj :: [object] -> object
```
```javascript
const input = [
  {id: 'name', value: 'order_num'},
  {id: 'length', value: 10},
  {id: 'datatype', value: 'string'}
];
idValueListToObj(input)  //=> {name: 'order_num', length: 10, datatype: 'string'}
```

### nameValueListToObj
```
nameValueListToObj :: [object] -> object
```

### keyedListToObj
```
keyedListToObj :: (string, [object]) -> object
```
```javascript
const attributes = [
  {name: 'name', value: 'size'},
  {name: 'type', value: 'string'},
  {name: 'descr', value: 'product size'}
];
keyedListToObj('name', attributes)  /* => {
    name: {name: 'name', value: 'size'},
    type: {name: 'type', value: 'string'},
    descr: {name: 'descr', value: 'product size'}});
} */
```

### verifyAllItemsHaveKey
```
verifyAllItemsHaveKey :: (objArr, arrName, key) -> true OR throws Exception
```

### sumValuesForKey
```
sumValuesForKey :: string -> [obj] -> float
```
```javascript
const scores = [
  {name: 'alice', value: 9},
  {name: 'bob', value: 7},
  {name: 'chuck', value: 8}
];
sumValuesForKey('value', scores)) //=> 24
```

### pickFromAll
```
pickFromAll :: (keys, list) -> obj
```
```javascript
const testArrayObjs = [
  {sid: 1, uniqueName: 'A1', category: 'A'},
  {sid: 2, uniqueName: 'A2', category: 'B'}
]
pickFromAll(['sid', 'category'], testArrayObjs)) //=> [{sid: 1, category: 'A'}, {sid: 2, category: 'B'}]
```

## Object Functions

### objPropsCnt
```
objPropsCnt :: object -> integer
```
This function returns a count of properties in the object argument.
```javascript
  const strings = {
    header: 'My Header',
    body: 'My Body',
    footer: 'My Footer'
  };
  objPropsCnt(strings) //=> 3
```

### mapKeysOfObject
```
mapKeysOfObject :: mapFirstOfPairFn -> object -> object
```
This HOF takes a mapper and will create a function that will transform all keys of an object. The supplied mapper function must transform the first element of a pair array. Such a mapper can be made with the `makeMapFirstOfPairFn` HOF.
```javascript
  const strings = {
    header: 'My Header',
    body: 'My Body',
    footer: 'My Footer'
  };
  const mapFirstToUpper = makeMapFirstOfPairFn(R.toUpper);
  const mapKeysToUpper = mapKeysOfObject(mapFirstToUpper);
  mapKeysToUpper(strings) //=> {HEADER: 'My Header', BODY: 'My Body', FOOTER: 'My Footer'}
```

### mapValuesOfObject
```
mapValuesOfObject :: mapFirstOfPairFn -> object -> object
```
This HOF takes a mapper and will create a function that transforms all property values of an object. The supplied mapper function must transform a single value.
```javascript
  const strings = {
    header: 'My Header',
    body: 'My Body',
    footer: 'My Footer'
  };
  const mapValuesToUpper = mapValuesOfObject(R.toUpper);
  mapValuesToUpper(strings) //=> {header: 'MY HEADER', body: 'MY BODY', footer: 'MY FOOTER'}
```

### nameValueListToObj
```
nameValueListToObj :: [object] -> object
```
Given an array of "key-value objects", each of which contains `name` and `value` properties, this function will return an object having the `name` values as keys, with associated values taken from the corresponding input `value` values. This is just `kvListToObj('name', 'value')`.
```javascript
const input = [
  {name: 'name', value: 'order_num'},
  {name: 'length', value: 10},
  {name: 'datatype', value: 'string'}
];
nameValueListToObj(input)  //=> {name: 'order_num', length: 10, datatype: 'string'}
```

## Miscellaneous Functions

### isNotNil
```
isNotNil :: a -> boolean
```
```javascript
isNotNil(42) //=> true
isNotNil({}) //=> true
isNotNil([]) //=> true
isNotNil(null) //=> false
```

### isNotEquals
```
isNotEquals :: a -> b -> boolean
```
```javascript
isNotEquals(42, 43) //=> true
isNotEquals(42, null) //=> true
isNotEquals(42, 21*2) //=> false
isNotEquals('foobar', 'foo'+'bar') //=> false
```

### valueIsObject
```
valueIsObject :: a -> boolean
```
```javascript
valueIsObject({foo: 'bar'})  //=> true
valueIsObject(42)  //=> false
valueIsObject([42, 43])  //=> false
```

### valueNotObject
```
valueNotObject :: a -> boolean
```
```javascript
valueNotObject(42)  //=> true
valueNotObject([42, 43])  //=> true
valueNotObject({foo: 'bar'})  //=> false
```
### valueIsArray
```
valueIsArray :: a -> boolean
```
```javascript
valueIsArray([])  //=> true
valueIsArray([1, 2, 3])  //=> true
valueIsArray({foo: 'bar'})  //=> false
```

### wait
```
wait :: ms -> any -> Promise
```
```javascript
const identityP = (arg) => Promise.resolve(arg);

identityP('foo')
  .then(wait(500))
  .then(data => data.toUpper()); //=> Promise('FOO') resolves after 500 mSec
```

## Date-Time Functions

### formatDuration
```
formatDuration :: object -> string
```
```javascript
const aDuration = {months: 0, days: 1, hours: 5, minutes: 32, seconds: 17};
formatDuration(aDuration)) //=> '1d 5h 32:17'
```
### isoDateToMsec
```
isoDateToMsec :: isoString -> integer
```
```javascript
  const date1 = new Date(Date.UTC(1970, 0, 1, 0, 0, 0));
  isoDateToMsec(date1.toISOString()) //=> 0
  const date2 = new Date('December 17, 1990 00:00:00');
  isoDateToMsec(date2) //=> 661420800000
```

### dtToIsoLocal
```
dtToIsoLocal :: [Date || isoString] -> isoString
```
```javascript
  const date1 = new Date('December 17, 2018 00:00:00');
  dtToIsoLocal(date1) //=> '2018-12-17T00:00:00-08:00'
```

## Filesystem Functions

### checkDirExists
```
checkDirExists :: (path) -> Promise(boolean)
```
### copyTextFile
```
copyTextFile :: (indir, outdir, filename) -> void
```
## Log-Debug Functions

### varToStr
```
varToStr :: any -> string
```
## Math Functions

### sumProps
```
sumProps :: object -> number
```
```javascript
const quarterSales = {q1: 100, q2: 90, q3: 120, q4: 130};
sumProps(quarterSales);  //=> 440
const noSales = {};
sumProps(noSales);  //=> 0
```

### getKeyOfMaxProp
```
getKeyOfMaxProp :: object -> string
```
```javascript
const quarterSales = {q1: 100, q2: 90, q3: 120, q4: 130};
getKeyOfMaxProp(quarterSales);  //=> 130
const noSales = {};
getKeyOfMaxProp(noSales);  //=> ''
```
### pad
```
pad :: (n, width, z) -> string
```
```javascript
const singleDigit = 5;
pad(singleDigit, 3);  //=> '005'
pad(singleDigit, 5, '.');  //=> '....5'
```

### zeroPad2
```
zeroPad2 :: number -> string
```
```javascript
zeroPad2(3);  //=> '03'
zeroPad2(42);  //=> '42'
zeroPad2(0);  //=> '00'
```

### round
```
round :: (precision, float) -> string
```
```javascript
const singleDigit = 5;
round(0, 342.5378);  //=> 343
round(2, 342.5378);  //=> 342.54
```

### Sequence
```
Sequence.getNextValue :: () -> number
Sequence.getCrrentValue :: () -> number
```
## Common Helper Functions

### makeMapFirstOfPairFn
```
makeMapFirstOfPairFn :: mapFn -> pair -> pair
```
This HOF takes a mapper and will create a function that, given a pair (i.e., an array of length two), will transform the first element of the pair. It is useful for mapping an array of pairs - often one created from an object's keys and values. See `mapKeysOfObject` for an example of this usage.
```javascript
  const strings = ['hdr', 'My Heading'];
  const mapFirstToUpper = makeMapFirstOfPairFn(R.toUpper);
  mapFirstToUpper(strings)  //=> ['HDR', 'My Heading']
```

## String Functions

### makePathList
```
makePathList :: string -> [string]
```
```javascript
const path = 'worker.attributes.routing';
makePathList(path)) //=> ['worker', 'attributes', 'routing']
```

### stripReturnAndSplitOnComma
```
stripReturnAndSplitOnComma :: string -> string
```
This function is useful for selecting the field names from the header line of a CSV file.
```javascript
  stripReturnAndSplitOnComma('a,b,c,d,e\n')  //=> ['a','b','c','d','e']
```

### trimLeadingZeroes
```
trimLeadingZeroes :: string -> string
```
```javascript
trimLeadingZeroes('0042)) //=> '42'
```
