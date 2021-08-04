
// import xtButton from './button'
export default {
  // button: () => import('./button'),
  // button: require('./button').default,
  // button: xtButton,
  // 引用ref="XX"的组件不能采用懒加载的形式引入
  // https://blog.csdn.net/qq_36016136/article/details/107398528
  layout: require('./layout').default,
  text: require('./text').default,
  link: require('./link').default,
  popview: require('./popview').default,
  button: require('./button').default,
  textinput: require('./textinput').default,
  table: require('./table').default,
  filter: require('./filter').default,
  tags: require('./tags').default,
  date: require('./date').default,
  select: require('./select').default,
  tree: require('./tree').default,
  cascade: require('./cascade').default,
  page: require('./page').default,
  default: require('./default').default,
}
