const onlineWork = () =>
  import ('components/article/disasterReduction/onlineWork')


export default [{
  path: '/disasterReduction',
  redirect: '/disasterReduction/onlineWork'
}, {
  path: 'onlineWork',
  name: 'onlineWork',
  component: onlineWork
}]