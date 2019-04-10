<template>
  <div class="list-page">
    <notice-list
      v-if="listType == 'notice'"
      :list="currentList"
      :path="path"
    />
    <public-list
      v-else-if="listType == 'public'"
      :list="currentList"
      :path="path"
    />
    <public-list-carousel
      v-else-if="listType=='public_carousel'"
      :list="currentList"
      :path="path"
      :carousel-list="carouselList"
    />
     <notice-list-img
      v-else-if="listType == 'notice_img'"
      :list="currentList"
      :path="path"
    />
    <list
      v-else
      :list="currentList"
      :path="path"
    />
    <page
      :total="totalNews"
      :size="pageSize"
      :current="currentPage"
      @pageChange="pageChange"
    />
  </div>
</template>
<script>
import list from '../common-component/list'
import noticeList from '../common-component/noticeList'
import noticeListImg from '../common-component/noticeList_img'
import publicList from '../common-component/publicList'
import publicListCarousel from '../common-component/publicList_carousel'
import page from '../common-component/page'
export default {
  props: ['path', 'content-name', 'list-type'],
  components: { list, page, noticeList, publicList, publicListCarousel ,noticeListImg},
  mounted() {
    let page = parseInt(this.$route.params.page)
    this.setPage(page)
    this.getData(page)
  },
  updated() {
    if (this.currentContentName != this.contentName) {
      this.getData(this.currentPage)
    }
  },
  beforeRouteUpdate(to, from, next) {
    let page = parseInt(to.params.page)
    this.setPage(page)
    this.getData(page)
    next()
  },
  data() {
    return {
      currentContentName: '',
      currentPage: 1,
      pageSize: 5,
      totalPage: 3,
      totalNews: 15,
      totalPage: 3,
      currentList: [],
      carouselList: [
        {
          img: require('../img/public_news/20171131400.jpg'),
          path: '/sunGovernmentAffairs/open/news/content/news1',
          title: '省气象局党组书记、局长庄旭东到佛山检查指导汛期气象服务'
        }, {
          img: require('../img/public_news/20171133824.jpg'),
          path: '/sunGovernmentAffairs/open/news/content/news2',
          title: '省气象局副局长赵会强到佛山市气象局调研指导工作'
        }, {
          img: require('../img/public_news/20178257262.jpg'),
          path: '/sunGovernmentAffairs/open/news/content/news3',
          title: '省气象局局长庄旭东调研指导南海区气象工作'
        }, {
          img: require('../img/public_news/20186217351.jpg'),
          path: '/sunGovernmentAffairs/open/news/content/news4',
          title: '佛山开展龙卷等致灾性强对流天气气象灾害应急演练'
        }, {
          img: require('../img/public_news/2018873272.jpg'),
          path: '/sunGovernmentAffairs/open/news/content/news5',
          title: '省局副局长曾琮一行莅临佛山气象局考察指导工作'
        }
      ]
    }
  },
  methods: {
    setPage(page) {
      page > this.totalPage && (page = this.totalPage)
      page < 1 && (page = 1)
      this.currentPage = page
    },
    getData(page) {
      let arr = [1, 2, 3, 4, 5]
      this.currentContentName = this.contentName
      this.currentList = arr.map(item => {
        return {
          title: this.contentName + '第' + page + '页文章' + item + '标题',
          desc: this.contentName + '第' + page + '页文章' + item + '新闻提要',
          id: this.contentName + 'id-' + page + item,
          time: '2019/1/12 9:05:00',
          views: 339,
          img:require('../img/2019143067.jpg')
        }
      })
    },
    pageChange(page) {
      this.$router.push(this.path + '/page/' + page)
    }
  }

}
</script>
<style lang="scss" scoped>
.list-page {
  width: 100%;
  padding: 20px 8px;
  box-sizing: border-box;
}
</style>
