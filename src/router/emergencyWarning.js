const FoShan = () =>
  import ('components/article/emergencyWarning/FoShan/index')

const province = () =>
  import ('components/article/emergencyWarning/province')

const signalMeaning = () =>
  import ('components/article/emergencyWarning/signalMeaning/index')

const signalMeaningList = () =>
  import ('components/article/emergencyWarning/signalMeaning/list')

const geologicHazard = () =>
  import ('components/article/emergencyWarning/geologicHazard')

export default [{
  path: '/emergencyWarning',
  redirect: '/emergencyWarning/FoShan'
}, {
  path: 'FoShan',
  name: 'FoShan',
  component: FoShan
}, {
  path: 'province',
  name: 'province',
  component: province
}, {
  path: 'signalMeaning',
  name: 'signalMeaning',
  component: signalMeaning,
  children: [{
    path: '/emergencyWarning/signalMeaning',
    redirect: '/emergencyWarning/signalMeaning/typhoon'
  }, {
    path: 'typhoon',
    name: 'typhoon',
    component: signalMeaningList
  }, {
    path: 'rainstorm',
    name: 'rainstorm',
    component: signalMeaningList
  }, {
    path: 'heatwave',
    name: 'heatwave',
    component: signalMeaningList
  }, {
    path: 'cold',
    name: 'cold',
    component: signalMeaningList
  }, {
    path: 'heavyfog',
    name: 'heavyfog',
    component: signalMeaningList
  }, {
    path: 'haze',
    name: 'haze',
    component: signalMeaningList
  }, {
    path: 'thundergust',
    name: 'thundergust',
    component: signalMeaningList
  }, {
    path: 'roadicing',
    name: 'roadicing',
    component: signalMeaningList
  }, {
    path: 'hail',
    name: 'hail',
    component: signalMeaningList
  }, {
    path: 'wildfire',
    name: 'wildfire',
    component: signalMeaningList
  }]
},
{
  path: 'geologicHazard',
  name: 'geologicHazard',
  component: geologicHazard
}]
