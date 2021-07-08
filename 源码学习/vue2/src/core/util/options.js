import config from '../config'
import { warn } from './debug'
import { set } from '../observer/index'
import { unicodeRegExp } from './lang'
import { nativeWatch, hasSymbol } from './env'

import { ASSET_TYPES, LIFECYCLE_HOOKS } from '../../shared/constants'

import {
  extend,
  hasOwn,
  camelize,
  toRawType,
  capitalize,
  isBuiltInTag,
  isPlainObject
} from '../../shared/util'

const strats = config.optionMergeStrategies

if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        `option "${key}" can obly be used during instance` +
          'creation with the `new` keyword'
      )
    }
    return defaultStrat(parent, child)
  }
}
