import components from '../index'

const renderComponent = function (h, viewRule, other = {}) {
  return h((components[viewRule.type] || components.default), {
    props: {
      viewRule: viewRule
    },
    ...other
  })
}

export default renderComponent
