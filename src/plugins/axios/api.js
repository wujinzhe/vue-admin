// import axios from './index'

let apiList = {}

for (let app in window.apps) {
  apiList = Object.assign(apiList, window.apps[app].apiList)
}
console.log('apiList', apiList)
export default apiList

// export default {
//   getLabelType: data => axios.get('/idc/ac/labelType/query.json', data)
// }
