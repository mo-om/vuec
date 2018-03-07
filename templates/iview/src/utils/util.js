import { appName } from 'configs'

export function setTitle(title) {
  title = title ? `${title} - ${appName}` : appName;
  window.document.title = title;
}

export function guid(prefix) {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  })
  // .toUpperCase();
}

export function arrayToKeyMap(key,array) {
  var keyMap = {}
  array.forEach(item => {if (item[key]!==undefined) keyMap[item[key]] = item})
  return keyMap
}

export function repeat(item,length) {
  let result = [];
  for (let i=0; i<length; i++) result.push(item)
  return result
}
