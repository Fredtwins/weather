<template>
  <div class="article-header-nav">
    <div class="inside">
      <a
        class="logo"
        href="/"
      >
        <img src="./img/logo.png">
      </a>
      <div class="nav-area">
        <div class="top">
          <router-link
            class="button"
            to="/"
          >网站首页</router-link>
          <span class="button">收藏本站</span>
          <span class="button">收藏本站</span>
          <span class="button">设为首页</span>
          <router-link
            class="button"
            to="/order"
          >English</router-link>
          <router-link
            class="button"
            to="/order"
          >无障碍版</router-link>
          <router-link
            class="button"
            to="/order"
          >手机版</router-link>
          <router-link
            class="button last"
            to="/ContentIndexnav"
          >导航版</router-link>
        </div>
        <div class="bottom">
          <div
            v-for="(item,index) in navList"
            :key="'/'+item.alias"
            class="nav-box"
          >
            <router-link
              v-if="item.type==2"
              :class="['button', {'first':index == 0}, {'current':item.alias == current}]"
              :to="'/'+item.alias"
            >{{item.name}}</router-link>
            <span
              v-else-if="item.type==1"
              :class="['button', {'first':index == 0}, {'current':item.alias == current}]"
            >{{item.name}}</span>
            <!-- <ul
              class="children-list"
              v-if="item.children && item.children.length>0"
            >
              <li
                v-for="childItem in item.children"
                :key="'child-'+childItem.jumpUrl"
              >
                <router-link
                  v-if="childItem.jumpType ==2"
                  class="children-link"
                  :to="childItem.jumpUrl"
                >{{childItem.name}}</router-link>
                <a v-else-if="childItem.jumpType === 6" :href="childItem.jumpUrl" target="_blank" class="children-link">{{childItem.name}}</a>
              </li>
            </ul> -->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['navList', 'current']
}
</script>

<style lang="scss" scoped>
.article-header-nav {
  width: 100%;
  height: 88px;
  background-color: #2162a9;
  .inside {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    .logo {
      width: 278px;
      height: 60px;
      margin: 9px 22px 0 0;
      float: left;
      display: block;
      img {
        width: 278px;
        height: 60px;
      }
    }
    .nav-area {
      width: 900px;
      height: 100%;
      padding-top: 9px;
      box-sizing: border-box;
      float: left;
      .top {
        height: 18px;
        line-height: 18px;
        margin-bottom: 20px;
        text-align: right;
        .button {
          padding: 0 5px;
          font-size: 12px;
          color: #ffffff;
          cursor: pointer;
          border-right: 1px solid #ffffff;
        }
        .button.last {
          border-width: 0;
        }
        .button:hover {
          text-decoration: underline;
        }
      }
      .bottom {
        text-align: right;
        .nav-box {
          margin-left: 25px;
          display: inline-block;
          position: relative;
          .button {
            height: 40px;
            padding-bottom: 19px;
            display: block;
            font-size: 15px;
            color: #ffffff;
            border-bottom: 2px solid transparent;
          }
          .first {
            margin-left: 0;
          }
          .current,
          .button:hover {
            border-bottom: 2px solid #ffffff;
          }
          .current:after,
          .button:hover:after {
            width: 0;
            margin: 12px auto 0;
            display: block;
            position: relative;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #ffffff;
            content: "";
          }
          .children-list {
            width: 140px;
            position: absolute;
            top: 40px;
            background-color: #f1f1f1;
            z-index: 99;
            display: none;
            li {
              width: 100%;
              .children-link {
                width: 100%;
                height: 36px;
                line-height: 36px;
                display: block;
                font-size: 15px;
                color: #666666;
                text-align: left;
                text-indent: 14px;
              }
              .children-link:hover {
                color: #ffffff;
                background-color: #035cc4;
              }
            }
          }
        }
        .nav-box:hover {
          .children-list {
            display: block;
          }
        }
      }
    }
  }
}
</style>
