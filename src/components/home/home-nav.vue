<template>
  <div class="m-nav">
    <ul class="nav clear">
      <li
        v-for="item in navList"
        :key="'/'+item.alias"
        class="list"
      >
        <router-link
          v-if="item.type==2"
          class="nav-button"
          :to="'/'+item.alias"
        >{{item.name}}</router-link>
        <span
          v-else-if="item.type==1"
          class="nav-button"
        >
          {{item.name}}
        </span>
        <dl v-if="item.children && item.children.length>0">
          <dd
            v-for="child in item.children"
            :key="child.jumpUrl"
          >
            <router-link
              v-if="child.jumpType==2"
              class="nav-button"
              :to="child.jumpUrl"
            >{{child.name}}</router-link>
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    navList() {
      return this.$store.state.initData.catalog
    }
  }
}
</script>

<style lang="scss" scoped>
.m-nav {
  margin: 0;
  padding: 0;
  z-index: 999;
  > .nav {
    width: 100%;
    list-style: none;
    height: 40px;
    display: block;
    content: "";
    clear: both;
    // float: right;
    > li {
      font-size: 14px;
      border-right: 0.1px solid #377ad1;
      float: left;
      width: 11.111%;
      height: 45px;
      line-height: 45px;
      background: #0055c2;
      border-bottom: 3px #377ad1 solid;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;

      > a,
      > .nav-button {
        width: 100%;
        height: 100%;
        display: block;
        color: #ffffff;
        &:hover {
          background-color: #6495ed;
        }
      }
      &.list:hover {
        border: 1px solid #e5e5e5;
        border-top: none;
        background-color: #6495ed;
        color: #fff;
        > dl {
          display: block;
        }
      }
      dl {
        background: #f1f1f1;
        display: none;
        position: relative;
        z-index: 999;

        dd {
          line-height: 35px;
          a {
            width: 100%;
            height: 100%;
            display: block;
          }
          a:hover {
            color: #fff;
          }
          &:hover {
            background-color: #0000cd;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
