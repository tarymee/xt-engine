import components from '../index'
// import { get, cloneDeep } from 'lodash-es'

const renderComponent = function (h, viewRule, other = {}) {
  return h((components[viewRule.type] || components.default), {
    props: {
      // key: viewRule.code,
      viewRule
    },
    // style: {
    //   background: `red`
    // },
    // attrs: {
    //   id: `xxxx`
    // },
    ...other
  })
}

export default renderComponent
