<template>
  <div class="empty">
    <div class="sjTitle"></div>
    <div class="w890" style="overflow:inherit">
      <div class="cj_pic">
        <ul class="thumb yahei">
          <li v-for="(item, index) in imgArr" :key="index" @click="scanPic(index, item.path)">
            <a class="group cboxElement">
              <img :data-original="item.path" class="lazy"
                   :src="item.path" :alt="item.alias">
              <span>{{item.createTime}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="clear"></div>
    </div>
    <Modal id="imgModal" v-show="showBigImg">
      <div class="modalTop">
        <img :src="imgUrl"/>
      </div>
      <div class="modalBottom">
        <div class="button">
          <button type="button" id="cboxPrevious" @click="scanPic()"></button>
          <button type="button" id="cboxNext" @click="scanPic()"></button>
          <div id="cboxCurrent">{{pageIndex}} / {{pageTotal}}</div>
        </div>
        <button type="button" id="cboxClose" @click="closeBig()"></button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { getRealScene } from 'api/article'
  import { ERR_OK, httpUrl } from 'api/config'
  import { errorNotice } from 'common/js/dom'

  export default {
    data () {
      return {
        imgArr: [],
        showBigImg: false,
        imgUrl: '',
        pageIndex: 1,
        pageTotal: 1
      }
    },
    mounted () {
      this._getRealScene()
    },
    methods: {
      _getRealScene () {
        getRealScene().then(res => {
          if (res.code === ERR_OK) {
            if (res.data.length > 0) {
              res.data.forEach(item => {
                item.path = `${httpUrl}${item.path}`
              })
            }
            this.imgArr = res.data
            this.pageTotal = this.imgArr.length
          }
        }).catch(res => {
          errorNotice(res.msg)
        })
      },
      scanPic (index, img) {
        console.log(index)
        this.pageIndex = index
        this.imgUrl = img
        this.showBigImg = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .empty {
    width: 100%;
    height: 700px;
    > .sjTitle {
      display: block;
      padding: 14px 0;
      padding-left: 20px;
    }
    > .w890 {
      width: 890px;
      height: auto;
      margin: 0 auto;
      overflow: hidden;
      > .cj_pic {
        width: 900px;
        margin: 0 auto 0;
        > ul {
          list-style: none;
          margin: 0 auto;
          width: 800px;
          font-family: "Microsoft Yahei";
          > li{
            margin: 0;
            padding: 0;
            float: left;
            position: relative;
            width: 45px;
            height: 45px;
            margin-right: 1px;
            display: inline;
            margin-bottom: 1px;
            > a {
              color: #fff;
              text-decoration: none;
              > img{
                display: block;
                margin-left: 0px;
                margin-top: 0px;
                width: 45px;
                height: 45px;
                padding: 0px;
                top: 0px;
                left: 0px;
                overflow: hidden;
              }
              > img:hover{
                margin-left: -5px;
                margin-top: -5px;
                width: 52px;
                height: 52px;
              }
              > span {
                color: white;
                position: relative;
                top: 15px;
                text-align: center;
                width: 45px;
                float: left;
                font-weight: bold;
              }
            }
          }
        }
      }
      > .clear {
        clear: both;
        font-size: 0px;
        line-height: 0px;
        height: 0px;
      }
    }
    > #imgModal{
      width: 915px;
      height: 720px;
      padding: 10px;
      margin: 0 auto;
      > .modalTop{
        > img{
          cursor: pointer;
          width: 886px;
          height: 665px;
          margin: auto;
          border: 0;
          display: block;
        }
      }
      > .modalBottom{
        display: flex;
        justify-content: space-between;
        > .button{
          > #cboxPrevious {
            float: left;
            background: url(./img/controls.png) no-repeat -75px 0;
            width: 25px;
            height: 25px;
            border: none;
          }
          > #cboxNext {
            float: left;
            background: url(./img/controls.png) no-repeat -50px 0;
            width: 25px;
            height: 25px;
            margin: 0 8px;
            border: none;
          }
          > #cboxCurrent {
            float: left;
            color: #949494;
            margin-top: 5px;
          }
        }
        > #cboxClose {
          background: url(./img/controls.png) no-repeat -25px 0;
          width: 25px;
          height: 25px;
          border: none;
        }
      }
    }
  }
</style>
