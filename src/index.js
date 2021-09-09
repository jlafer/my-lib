import {mkBase64Token} from './ajax-util';
import {
  takeSelected, makeMapFirstOfPairFn, filterOnMatchInOtherList, filterOnMatchingKeyInOtherList,
  filterOnMatchingSidInOtherList, filterOnMatchingUniqueNameInOtherList,
  matchAndMapLists, mapAllToPromise
} from './array-util';
import {formatDuration, isoDateToMsec, dtToIsoLocal} from './date-time';
import {varToStr} from './log-debug';
import {
  Sequence, pad, zeroPad2, round, roundToInt, roundToTenth, sumProps, getKeyOfMaxProp
} from './math-util';
import {
  wait, valueIsObject, valueNotObject, valueIsArray, isNotNil, isNotEquals
} from './misc-util';
import {
  verifyAllItemsHaveKey, sumValuesForKey, pickFromAll, kvListToObj, keyedListToObj,
  idValueListToObj, nameValueListToObj, findObjByKeyVal, findObjBySid,
  findObjByFriendlyName, findObjByUniqueName
} from './obj-array-util';
import {
  mapKeysOfObject, mapValuesOfObject, objPropsCnt, objToKeyedList
} from './obj-util';
import {executeShellCmd} from './os-util';
import {
  makePathList, stripReturnAndSplitOnComma, trimLeadingZeroes
} from './string-util';
//import {getSyncToken} from './sync-client';
import {getSyncDocByName} from './sync-server';

export {
  mkBase64Token,
  takeSelected, makeMapFirstOfPairFn, filterOnMatchInOtherList, filterOnMatchingKeyInOtherList,
  filterOnMatchingSidInOtherList, filterOnMatchingUniqueNameInOtherList,
  matchAndMapLists, mapAllToPromise,
  formatDuration, isoDateToMsec, dtToIsoLocal,
  varToStr,
  Sequence, pad, zeroPad2, round, roundToInt, roundToTenth, sumProps, getKeyOfMaxProp,
  wait, valueIsObject, valueNotObject, valueIsArray, isNotNil, isNotEquals,
  verifyAllItemsHaveKey, sumValuesForKey, pickFromAll, kvListToObj, keyedListToObj,
  idValueListToObj, nameValueListToObj, findObjByKeyVal, findObjBySid,
  findObjByFriendlyName, findObjByUniqueName,
  mapKeysOfObject, mapValuesOfObject, objPropsCnt, objToKeyedList,
  executeShellCmd,
  makePathList, stripReturnAndSplitOnComma, trimLeadingZeroes,
  getSyncDocByName
};
