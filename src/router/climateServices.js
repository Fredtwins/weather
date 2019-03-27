const FoShan = () =>
  import ('components/article/climateServices/FoShan')
const ecology = () =>
  import ('components/article/climateServices/ecology')
const archiveBulletin = () =>
  import ('components/article/climateServices/archiveBulletin')

const listPage = () =>
  import ('components/article/common-component/listPage')

const contentPage = () =>
  import ('components/article/common-component/contentPage')

export default [{
  path: '/climateServices',
  redirect: '/climateServices/FoShan'
}, {
  path: 'FoShan',
  name: 'FoShan',
  component: FoShan
}, {
  path: 'ecology',
  name: 'ecology',
  component: ecology
}, {
  path: 'archiveBulletin',
  name: 'archiveBulletin',
  component: archiveBulletin,
  children: [{
    path: '/climateServices/archiveBulletin',
    redirect: '/climateServices/archiveBulletin/page/1'
  }, {
    path: 'page/:page',
    name: 'climateServices_archiveBulletin_page',
    component: listPage,
    children: [{
      path: '/climateServices/archiveBulletin/page',
      redirect: '/climateServices/archiveBulletin/page/1'
    }]
  }, {
    path: 'content/:id',
    name: 'climateServices_archiveBulletin_content',
    component: contentPage,
    children: [{
      path: '/climateServices/archiveBulletin/content',
      redirect: '/climateServices/archiveBulletin/page/1'
    }]
  }]
}]