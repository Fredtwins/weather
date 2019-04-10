<template>
  <div class="interaction-share">
    <div class="plugin-list">
      <div class="title">天气插件</div>
      <div
        v-for="(item,index) in pluginList"
        :key="'plugin-'+index"
        class="plugin-box"
      >
        <div class="name">【{{item.name}}】</div>
        <div class="current">
          <div class="inside">
            <iframe
              v-once
              :src="item.current"
              :width="item.width"
              :height="item.height"
              marginwidth="0"
              marginheight="0"
              hspace="0"
              vspace="0"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
        <div class="setting">
          <div class="inside">
            <form @submit.prevent="setIframe(index)">
              <div class="form-item">
                <label for="width">宽度</label>
                <input
                  type="text"
                  name="width"
                  v-model="item.width"
                />
                <span>像素</span>
              </div>
              <div class="form-item">
                <label for="height">高度</label>
                <input
                  type="text"
                  name="height"
                  v-model="item.height"
                />
                <span>像素</span>
              </div>
              <div
                v-if="item.area.length>2"
                class="form-item"
              >
                <label for="area">地区</label>
                <select
                  name="area"
                  v-model="item.areaIndex"
                  @change="setArea(index)"
                >
                  <option
                    v-for="(city,cityIndex) in item.area"
                    :key="index+'-'+cityIndex"
                    :value="cityIndex"
                  >{{city.name}}</option>
                </select>
              </div>
              <div class="form-item">
                <button class="submit">定制</button>
              </div>
            </form>
          </div>
        </div>
        <div class="content">
          <div class="inside">
            <textarea
              readonly="true"
              class="code-area"
              :id="'code-area'+index"
              v-model="item.iframe"
              @mouseover="chooseCode(index)"
              @focus="chooseCode(index)"
            />
            <div class="create-area">
              <span class="text">根据您的需求, 点击定制, 生成代码</span>
              <div class="button" @click="copyCode(index)">
                <img src="/images/plugBtn.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  mounted() {
    this.pluginList.forEach((item, index) => {
      this.setIframe(index)
    })
  },
  data() {
    return {
      pluginList: [{
        name: '短时天气预报插件 .......样式1',
        width: 500,
        height: 30,
        current: '/plugin/GDFSForecastPlugin1.html',
        areaIndex: 0,
        iframe: '',
        area: [
          {
            name: '佛山',
            tpl: 'GDFSForecastPlugin1'
          }, {
            name: '禅城',
            tpl: 'BFFOForecastPlugin1'
          }, {
            name: '南海',
            tpl: 'GDNHForecastPlugin1'
          }, {
            name: '三水',
            tpl: 'GDSSForecastPlugin1'
          }, {
            name: '顺德',
            tpl: 'GDSDForecastPlugin1'
          }, {
            name: '高明',
            tpl: 'GDGMForecastPlugin1'
          }
        ]
      }, {
        name: '短时天气预报插件 .......样式2',
        width: 500,
        height: 180,
        current: 'plugin/BFFOForecastPlugin2.html',
        areaIndex: 0,
        iframe: '',
        area: [
          {
            name: '禅城',
            tpl: 'BFFOForecastPlugin2'
          }, {
            name: '南海',
            tpl: 'GDNHForecastPlugin2'
          }, {
            name: '三水',
            tpl: 'GDSSForecastPlugin2'
          }, {
            name: '顺德',
            tpl: 'GDSDForecastPlugin2'
          }, {
            name: '高明',
            tpl: 'GDGMForecastPlugin2'
          }
        ]
      }, {
        name: '短期天气预报插件 .......样式1',
        width: 500,
        height: 30,
        current: 'plugin/BFFOForecastSevenPlugin1.html',
        areaIndex: 0,
        iframe: '',
        area: [
          {
            name: '禅城',
            tpl: 'BFFOForecastSevenPlugin1'
          }, {
            name: '南海',
            tpl: 'GDNHForecastSevenPlugin1'
          }, {
            name: '三水',
            tpl: 'GDSSForecastSevenPlugin1'
          }, {
            name: '顺德',
            tpl: 'GDSDForecastSevenPlugin1'
          }, {
            name: '高明',
            tpl: 'GDGMForecastSevenPlugin1'
          }
        ]
      }, {
        name: '三天天气预报插件',
        width: 500,
        height: 30,
        current: 'plugin/BFFOForecastThreePlugin1.html',
        areaIndex: 0,
        iframe: '',
        area: [
          {
            name: '禅城',
            tpl: 'BFFOForecastThreePlugin1'
          }, {
            name: '南海',
            tpl: 'GDNHForecastThreePlugin1'
          }, {
            name: '三水',
            tpl: 'GDSSForecastThreePlugin1'
          }, {
            name: '顺德',
            tpl: 'GDSDForecastThreePlugin1'
          }, {
            name: '高明',
            tpl: 'GDGMForecastThreePlugin1'
          }
        ]
      }, {
        name: '一天天气预报插件',
        width: 500,
        height: 30,
        current: 'plugin/ForecastBFFOOnePlugin.html',
        areaIndex: 0,
        iframe: '',
        area: [
          {
            name: '禅城',
            tpl: 'ForecastBFFOOnePlugin'
          }
        ]
      }, {
        name: '短期天气预报插件 .......样式2',
        width: 400,
        height: 200,
        current: 'plugin/BFFOForecastSevenPlugin2.html',
        areaIndex: 0,
        iframe: '',
        area: [
          {
            name: '禅城',
            tpl: 'BFFOForecastSevenPlugin2'
          }, {
            name: '南海',
            tpl: 'GDNHForecastSevenPlugin2'
          }, {
            name: '三水',
            tpl: 'GDSSForecastSevenPlugin2'
          }, {
            name: '顺德',
            tpl: 'GDSDForecastSevenPlugin2'
          }, {
            name: '高明',
            tpl: 'GDGMForecastSevenPlugin2'
          }
        ]
      },{
        name: '天气预警插件 .......样式1',
        width: 500,
        height: 30,
        current: 'plugin/warningPlugin1.html',
        areaIndex: 0,
        iframe: '',
        area: [
          {
            name: '佛山',
            tpl: 'warningPlugin1'
          }
        ]
      },{
        name: '天气预警插件 .......样式2',
        width: 400,
        height: 100,
        current: 'plugin/warningPlugin2.html',
        areaIndex: 0,
        iframe: '',
        area: [
          {
            name: '佛山',
            tpl: 'warningPlugin2'
          }
        ]
      }]
    }
  },
  methods: {
    setArea(index) {
      let target = this.pluginList[index]
      this.pluginList[index].current = '/plugin/' + target.area[target.areaIndex].tpl + '.html'
    },
    setIframe(index) {
      let target = this.pluginList[index]
      this.pluginList[index].iframe = '<iframe src="' +
        window.location.host +
        target.current +
        '" width="' +
        target.width +
        '" height="' +
        target.height +
        '" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
    },
    chooseCode(index) {
      let target = document.getElementById('code-area' + index)
      target.select()
    },
    copyCode(index) {
      if (document.execCommand) {
        let target = document.getElementById('code-area' + index)
        target.select()
        document.execCommand('Copy')
        alert('复制成功!')
      } else {
        alert('该浏览器下不支持剪贴板,请用鼠标复制')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.interaction-share {
  width: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
  .plugin-list {
    .title {
      height: 44px;
      line-height: 44px;
      font-size: 18px;
      color: #2071cf;
    }
    .plugin-box {
      padding: 5px 26px;
      margin-bottom: 19px;
      box-sizing: border-box;
      background: #f8f8f8;
      border: 1px #f0f0f0 solid;
      .name {
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        color: #535353;
      }
      .current,
      .setting,
      .content {
        width: 100%;
        padding: 2px;
        border: 1px #fff solid;
        box-sizing: border-box;
        .inside {
          padding: 5px;
          box-sizing: border-box;
          background-color: #ffffff;
          .form {
            width: 100%;
            display: block;
          }
          .form-item {
            margin-left: 15px;
            display: inline-block;
            label,
            input,
            select,
            span {
              height: 18px;
              line-height: 18px;
              margin: 0;
              padding: 0;
              display: inline-block;
              vertical-align: middle;
              font-size: 12px;
            }
            input,
            select {
              width: 40px;
              height: 20px;
              border: 1px #d9d9d9 solid;
              background: #72b5f1;
              color: #fff;
              text-align: center;
              box-sizing: border-box;
            }
            select {
              width: 50px;
              position: relative;
              option {
                width: 100%;
                height: 24px;
                line-height: 24px;
                background-color: #ffffff;
                color: #7c7c7c;
                font-size: 14px;
                text-align: center;
              }
            }
            .submit {
              width: 52px;
              height: 26px;
              line-height: 26px;
              margin-left: 20px;
              text-align: center;
              color: #ffffff;
              background-color: #72b5f1;
              border: 0;
              cursor: pointer;
            }
          }
        }
      }
      .content {
        .inside {
          .code-area,
          .create-area {
            display: inline-block;
            vertical-align: middle;
          }
          .code-area {
            width: 464px;
            line-height: 20px;
            min-height: 80px;
            margin-right: 20px;
            padding: 10px;
            box-sizing: border-box;
            background-color: #f8f8f8;
            font-size: 14px;
            border: 0;
          }
          .create-area {
            width: 370px;
            text-align: right;
            .text {
              height: 40px;
              line-height: 40px;
              margin-right: 10px;
              display: inline-block;
              vertical-align: middle;
              font-size: 14px;
              font-family: "宋体";
            }
            .button {
              width: 130px;
              height: 40px;
              display: inline-block;
              cursor: pointer;
              vertical-align: middle;
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
