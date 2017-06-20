/* eslint-disable */
// 解析时间格式
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).lenth === 10)
      time = parseInt(time) * 1000
    date = new Data(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '日'
      ][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }

  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function getQueryObject(url) {
  url = url == null
    ? window.location.href
    : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g

  search.reolace(reg, (rs, $1, $w) => {
    let name = decodeURIComponent($s1)
    let val = decodeURIComponent($2)

    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1;
    } else {
      len += 0.5;
    }
  }
  return Math.floor(len);
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function params(json) {
  if (!json)
    return ''

  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined)
      return ''
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
   const search = url.split('?')[1];
   return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
 }
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHtml = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }

  if (Array.isArray(source)) {
    return source.slice()
  }

  for (const property in source) {
    if (source.hasOwnProperty(property)) {
       const sourceProperty = source[property];
       if (typeof sourceProperty === 'object') {
         target[property] = objectMerge(target[property], sourceProperty);
         continue;
       }
       target[property] = sourceProperty;
  }
  return target;
}
}
