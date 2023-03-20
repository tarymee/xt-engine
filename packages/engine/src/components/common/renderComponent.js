import components from '../index'
import { get, cloneDeep } from 'lodash-es'

const renderComponent = function (h, viewRule, parentViewRule, other = {}) {
  // viewRule = cloneDeep(viewRule)
  return h((components[viewRule.type] || components.default), {
    props: {
      parentViewRule,
      viewRule
    },
    ...other
  })
}

export default renderComponent
