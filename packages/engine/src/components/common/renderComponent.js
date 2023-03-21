import components from '../index'
// import { get, cloneDeep } from 'lodash-es'

const renderComponent = function (h, viewRule, other = {}) {
  return h((components[viewRule.type] || components.default), {
    props: {
      viewRule
    },
    ...other
  })
}

export default renderComponent
