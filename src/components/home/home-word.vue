<template>
  <!--首页 右侧 工作状态-->
  <div class="home-work">
    <div class="ygzw">
      <ul style="width:352px;">
        <li :class="[flag==1?'hover':'']" style="cursor:pointer;" @mouseenter="onmouseover(1)">
          <a href="http://www.fs121.com/zwgk.aspx?c=030101">工作动态</a>
        </li>
        <li :class="[flag==2?'hover':'']" style="cursor:pointer;" @mouseenter="onmouseover(2)">
          <a href="http://www.fs121.com/notes.aspx?c=0307">气象新闻</a>
        </li>
        <li :class="[flag==3?'hover':'']" style="padding-right: 24px;cursor:pointer;" @mouseenter="onmouseover(3)">
          <a href="zwgk.aspx?c=030103">政策法规</a>
        </li>
      </ul>
    </div>
    <!-- 工作动态 -->
    <div class="ygzw_index" v-if="flag == 1">
      <div class="news">
        <ul>
          <li v-for="(item, index) in workArray" :key="item.index">
            <a :href="item.urlage" :title="item.titlename">
              {{item.titlename}}
            </a>
            <span>{{item.datetime}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 气象新闻 -->
    <div class="ygzw_index" v-if="flag == 2">
      <div class="news">
        <ul>
          <li v-for="(item, index) in workArraytoo" :key="item.index">
            <a :href="item.urlage" :title="item.titlename">
              {{item.titlename}}
            </a>
            <span>{{item.datetime}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 政策法规 -->
    <div class="ygzw_index" v-if="flag == 3">
      <div class="news">
        <ul>
          <li v-for="(item, index) in workArraytree" :key="item.index">
            <a :href="item.urlage" :title="item.titlename">
              {{item.titlename}}
            </a>
            <span>{{item.datetime}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      workArray: [
        {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-12',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }, {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-12',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }, {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-12',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }
      ],
      workArraytoo: [
        {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-22',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }, {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-22',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }, {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-22',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }
      ],
      workArraytree: [
        {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-23',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }, {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-23',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }, {
          titlename: '佛山市更新公布30家市级气象灾害防御重点单位',
          datetime: '2018-12-23',
          urlage: 'http://www.fs121.com/zwgkmx.aspx?c=030101&id=138145'
        }
      ],
      flag: 1
    }
  },
  methods: {
    onmouseover(flag) {
      this.flag = flag
    }
  }
}
</script>

<style lang="scss" scoped>
.home-work {
  > .ygzw {
    width: 352px;
    height: 40px;
    border-bottom: #0055c2 solid 3px;
    background: #ededed;
    float: left;
    margin-top:10px;
    > ul {
      float:left;
      line-height:24px;
      > li {
        float: left;
        color: #ccc;
        font-size: 16px;
        font-family: "Microsoft Yahei";
        padding: 0 20px;
        width: 33.33%;
        overflow: hidden;
        text-align: center;
        line-height: 40px;
        > a {
          color: #000;
        }
      }
      :hover {
        background: #0055c2;
        color: #fff;
      }
      > .hover {
        background: #0055c2;
        color: #fff !important;
      }

    }
  }
  > .ygzw_index {
    width: 350px;
    float: left;
    color: #000;
    border: 1px solid #e3e3e3;
    height: 100px;
    overflow: hidden;
    > .news {
      width: 340px;
      padding: 5px;
      > ul {
        > li {
          width: 340px;
          float: left;
          height: 30px;
          line-height: 30px;
          color: #000;
          > a {
            float: left;
            width: 250px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          > span {
            float: right;
          }
        }
      }
    }
  }
}
</style>
