const virtualObserve = () =>
  import ('components/article/weatherInteract/virtualObserve')

const equipmentIntroduce = () =>
  import ('components/article/weatherInteract/equipmentIntroduce')

const share = () =>
  import ('components/article/weatherInteract/share')

const dataAccess = () =>
  import ('components/article/weatherInteract/dataAccess')

const contentPage = () =>
  import ('components/article/common-component/contentPage')

export default [{
  path: '/weatherInteract',
  redirect: '/weatherInteract/virtualObserve'
},{
  path: 'messageBoard',
  redirect: '/sunGovernmentAffairs/communion/'
}, {
  path: '/weatherInteract/virtualObserve',
  name: 'virtualObserve',
  component: virtualObserve
}, {
  path: 'equipmentIntroduce',
  name: 'equipmentIntroduce',
  component: equipmentIntroduce,
  children: [{
    path: '/weatherInteract/equipmentIntroduce/detail',
    redirect: '/weatherInteract/equipmentIntroduce'
  }, {
    path: 'detail/:id',
    name: 'weatherInteract_equipmentIntroduce_detail',
    component: contentPage
  }]
}, {
  path: 'share',
  name: 'share',
  component: share
}, {
  path: 'dataAccess',
  name: 'dataAccess',
  component: dataAccess
}]
