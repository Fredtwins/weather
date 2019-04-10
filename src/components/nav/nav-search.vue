<template>
  <div class="article-body-top">
    <div class="news-area">
      <ul id="news-list">
        <li
          v-for="item in newsList"
          :key="'news-'+item.id"
        >
          <router-link to="/">{{item.title+'-'+item.id}}</router-link>
        </li>
      </ul>
    </div>
    <div class="search-bar">
      <Form
        ref="searchForm"
        :model="searchForm"
      >
        <div class="search-input">
          <FormItem prop="keyword">
            <Input
              v-model="searchForm.searchValue"
              placeholder="站内搜索"
            />
          </FormItem>
        </div>
        <div class="submit-button">
          <Button
            @click="search"
            icon="ios-search"
            style="width:100%;height:100%;border:0;border-radius:0;color:#ffffff;background:#035cc4;font-size:16px;padding:0;margin:0"
          />
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import myScroll from 'common/js/scroll'

export default {
  mounted () {
    myScroll.upScroll('news-list', '-32px', 3200)
  },
  data () {
    return {
      searchForm: {
        searchValue: ''
      },
      newsList: [{
        title: '新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻',
        id: '0'
      }, {
        title: '新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻',
        id: '1'
      }, {
        title: '新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻',
        id: '2'
      }, {
        title: '新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻',
        id: '3'
      }]
    }
  },
  methods: {
    search () {
      getLocalStorage('searchValue', this.searchForm.searchValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-body-top {
  width: 1200px;
  height: 32px;
  margin: 12px auto;
  .news-area {
    height: 100%;
    float: left;
    overflow: hidden;
    li {
      height: 32px;
      line-height: 32px;
      transition: margin-top 0.8s;
      a {
        font-size: 12px;
        color: #fff;
        font-family: "宋体";
      }
    }
  }
  .search-bar {
    width: 220px;
    height: 100%;
    float: right;
    .search-input {
      width: 168px;
      margin-right: 8px;
      display: inline-block;
      box-sizing: border-box;
    }
    .submit-button {
      width: 40px;
      height: 32px;
      display: inline-block;
    }
  }
}
</style>

