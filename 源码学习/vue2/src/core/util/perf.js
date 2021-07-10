import { inBrowser } from './env'

export let mark
export let measure

/**
 * performace.mark()
 * 通过一个给定的名称，将该名称（作为键）和对应的DOMHighResTimeStamp（作为值）保存在一个哈希结构里。
 * 该键值对表示了从某一时刻（译者注：某一时刻通常是 navigationStart 事件发生时刻）
 * 到记录时刻间隔的毫秒数。（译者注：该方法一般用来多次记录时间，用于求得各记录间的时间差）
 */

/**
 * performace.measure()
 */
if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
    }
  }
}
