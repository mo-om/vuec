import Vue from 'vue';
import eventBus from './event-bus';
import axiosConfig from './axios-config';
import storageHelper from './storage-helper';
import { appName } from 'configs';

function setTitle(title) {
  title = title ? `${title} - ${appName}` : appName;
  window.document.title = title;
}

function arrayToKeyMap(key,array) {
  var keyMap = {}
  array.forEach(item => {if (item[key]!==undefined) keyMap[item[key]] = item})
  return keyMap
}

function repeat(item,length) {
  let result = [];
  for (let i=0; i<length; i++) result.push(item)
  return result
}


function logout (router) {
  router.push({ name: 'login'});
  storageHelper.removeItem('x-user-token');
  storageHelper.removeItem('x-user-mobile');
}

function auth (to, from, next) {
  if (!to.meta.unauth&&!storageHelper.getItem('x-user-token')) {
    Vue.prototype.$Notice.info({
      desc: '您的会话已过期，请重新登录'
    })
    next({ name: 'login'});
  }
}

const utils = {
  auth,
  repeat,
  logout,
  setTitle,
  eventBus,
  axiosConfig,
  storageHelper,
  arrayToKeyMap,
}

module.exports.default = module.exports = utils
