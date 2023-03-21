
// import xtButton from './button'
export default {
  // button: () => import('./button'),
  // button: require('./button').default,
  // button: xtButton,
  // 引用ref="XX"的组件不能采用懒加载的形式引入
  // https://blog.csdn.net/qq_36016136/article/details/107398528
  default: require('./default').default,
  page: require('./page').default,
  layout: require('./layout').default,
  popview: require('./popview').default,
  text: require('./text').default,
  button: require('./button').default,
  link: require('./link').default,
  progress: require('./progress').default,
  textinput: require('./textinput').default,
  table: require('./table').default,
  filter: require('./filter').default,
  tags: require('./tags').default,
  date: require('./date').default,
  select: require('./select').default,
  // dropdownbox: require('./select').default,
  tree: require('./tree').default,
  attachment: require('./attachment').default,
  radio: require('./radio').default,
  checkbox: require('./checkbox').default,
  cascade: require('./cascade').default,
  tabboard: require('./tabboard').default,
  list: require('./list').default,
  image: require('./image').default,
  baseMixin: require('./common/baseMixin').default,
  baseInputMixin: require('./common/baseInputMixin').default
}

