<template>
  <div class="interaction-equipment">
    <div v-if="!status" class="list">
      <div
        v-for="(item,index) in equipmentList"
        :key="item.id"
        class="equipment-box"
      >
        <div
          v-if="(index % 2) == 0"
          class="odd"
        >
          <img
            :src="item.img"
            :alt="item.title"
          />
          <div class="content">
            <router-link
              class="title"
              :to="'/weatherInteract/equipmentIntroduce/detail/'+item.id"
            >{{item.title}}</router-link>
            <div class="text">{{item.desc}}</div>
            <div class="bottom">
              <router-link
                class="more"
                :to="'/weatherInteract/equipmentIntroduce/detail/'+item.id"
              >MORE></router-link>
            </div>
          </div>
        </div>
        <div
          v-else
          class="even"
        >
          <div class="content">
            <router-link
              class="title"
              :to="'/weatherInteract/equipmentIntroduce/detail/'+item.id"
            >{{item.title}}</router-link>
            <div class="text">{{item.desc}}</div>
            <div class="bottom">
              <router-link
                class="more"
                :to="'/weatherInteract/equipmentIntroduce/detail/'+item.id"
              >MORE></router-link>
            </div>
          </div>
          <img
            :src="item.img"
            :alt="item.title"
          />
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>

export default {
  mounted() {
    this.setStatus(this.$route)
  },
  beforeRouteUpdate(to, from, next) {
    this.setStatus(to)
    next()
  },
  methods: {
    setStatus(route) {
      this.status = route.name == 'weatherInteract_equipmentIntroduce_detail'
    }
  },
  data() {
    return {
      path: '/weatherInteract/equipmentIntroduce',
      name: '观测场设备介绍',
      status: '',
      equipmentList: [
        {
          title: '闪电定位仪',
          desc: '闪电定位仪是一种监测雷电发生的气象探测仪器，是指利用闪电辐射的声、光、电磁场特性来遥测闪电放电参数的一种自动化探测设备，并把经过预处理的闪电数据实时地通过 通讯系统送到中心数据处理站实时进行交汇处理，可全天候、长期、连续运行并记录雷电发生的时间、位置、强度和极性等指标。闪电定位仪是开展雷暴预报的基础 条件，将对该县的森林防火、防雷减灾、灾害调查和人工增雨等工作有很大的促进作用，能够为该县的经济社会又好又快发展提供有力的保障。',
          img: require('../img/interaction-equipment/201410163867.jpg'),
          id: '闪电定位仪'
        },
        {
          title: '地热测温仪器',
          desc: '地热测温仪器最小的热敏电阻的体积小于1立方毫米。与热电偶温度计相比，电阻温度计不需要参照温度，因此野外应用比较理想。电阻温度计热敏元件的电阻用一个精密的电位 计补偿。另外，要求惠斯顿电桥电路保持低电压，以防止桥路电流使测量元件自热；同时又要求电路有足够的电压，以保证电阻温度计有较高的灵敏度。热敏元件与 电桥之间用长电缆连接时，必须考虑电缆的电阻变化和温度系数，如果电缆的电阻变化超过测量元件的电阻变化，不控制电缆的电阻变化就会降低测温的精度。野外 测温仪器必须适应现场的要求。',
          img: require('../img/interaction-equipment/201410166085.jpg'),
          id: '地热测温仪器'
        }, {
          title: '日照仪',
          desc: '日照仪是现代人对太阳钟的利用。这种仪器能在一年的各个季节里被用来测量日照，即一天的日照时数。日照仪由一个圆柱体、一张感光纸和一个玻璃球组成，感光 纸放在圆柱上，玻璃球放在感光纸上。玻璃球如同一个巨型放大镜，使透过它的太阳光聚集在纸上，随着太阳在空中移动，便在纸上留下了印迹。每天夜里把纸条撤 一换上一张新纸。观察纸上的印迹便能测出日照的时间。',
          img: require('../img/interaction-equipment/201410166391.jpg'),
          id: '日照仪'
        }, {
          title: '百叶箱',
          desc: '百叶箱安置温度、湿度仪器并使其免受太阳直接辐射，而又保持适当通风的白色百叶式木箱。作用是防止太阳对仪器的直接辐射和地面对仪器的反射辐射，保护仪器免受强 风、雨、雪等的影响，并使仪器感应部分有适当的通风，能真实地感应外界空气温度和湿度的变化。如果装在封闭的箱子中，就没有办法准确测量当时外界的温度； 如果露天的话由于太阳直接照射又会造成温差，下雨的话又会对温度计造成损坏。白天，空气对太阳辐射的吸收能力弱于任一种温度感应元件；夜晚，空气的红外辐 射能力又弱于任一种温度感应元件的表面。任何直接暴露在空气中的测温元件，其测量值在白天将系统偏高于气温，夜间则系统偏低。为避免这种辐射误差，必须对 测温元件采取有效的辐射屏蔽措施。',
          img: require('../img/interaction-equipment/201410166395.jpg'),
          id: '百叶箱'
        }, {
          title: '风向风速仪',
          desc: '风向、风速仪用于测量瞬时风速风向，具有自动显示功能。主要由支杆，风标，风杯，风速风向感应器组成，风标的指向即为来风方向，根据风杯的转速来计算出风速。所以也叫风杯式风向风速仪。风速的测试方法　风速测试有平均风速的测试和紊流成分（风的乱流1～150KHz、与变动不同）的测试。测试平均风速的方法有热式、超音波式、叶轮式、风杯式及皮拖管式等。',
          img: require('../img/interaction-equipment/201410163461.jpg'),
          id: '风向风速仪'
        }, {
          title: '能见度仪',
          desc: '能见度仪能够提供标准4-20mA和继电器输出，它们可以连接到任何PC 或计算机系统。电流和继电器的输出范围可根据需要设定。这样很容易满足用户要求。使用数字通讯接口，用户可以了解设备工作情况，如：参数，工作状态等；通过数字通讯接口和调制解调器，可以远程操作和控制设备。即气象学意义上的数值（MOR）是由大气中悬浮的微小颗粒物（烟雾、灰尘、浓雾、雨、雪）散射光线强弱所决定的采用世界气象组织认可的前散射测量原理（42°角的特殊设计），保证了更大的测量范围，从而使检测到的数据更具有代表性。',
          img: require('../img/interaction-equipment/201410163867.jpg'),
          id: '能见度仪'
        }, {
          title: '大气电场仪',
          desc: '大气电场仪主要用于测量大气电场强度，并据此可以预报有无雷电活动。应用领域：雷电预报预警2、技术指标：探测半径10～20Km，电场测量范围-50KV/m到+50KV/m，有线传输或无线GPRS传输，响应时间1秒。 上位机可直观显示电场变化曲线，具有数据显示、存储、查询、回放以及报警、后期数据分析、处理、统计功能；具有报警功能，当电场数据超过报警线时，会发出 声光报警信号。报警线可根据当地的电场平均值作调整。',
          img: require('../img/interaction-equipment/201410165316.jpg'),
          id: '大气电场仪'
        }, {
          title: '雨量筒',
          desc: '量度雨量的仪器，称为雨量筒。雨量筒包括一个铜制的雨筒和一个漏斗，雨量筒藏在泥土中，高出地面30公分，以免雨水从地面反弹入内。量度时把雨水倒在量杯中，以便量度。一个月中每日降雨量加起来便是该月的总雨量。一年中十二个月降雨量加起来便是该年的总雨量。',
          img: require('../img/interaction-equipment/201410163691.jpg'),
          id: '雨量筒'
        }
      ]
    }
  }

}
</script>
<style lang="scss" scoped>
.interaction-equipment {
  width: 100%;
  padding: 28px 34px;
  box-sizing: border-box;
  .list {
    .equipment-box {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px dashed #999999;
      .odd,
      .even {
        width: 100%;
        height: 100%;
        img {
          width: 148px;
          height: 220px;
          display: inline-block;
        }
        .content {
          width: 745px;
          display: inline-block;
          .title {
            height: 24px;
            line-height: 24px;
            display: block;
            font-size: 14px;
            font-weight: 600;
            font-family: "宋体";
          }
          .title:hover {
            text-decoration: underline;
          }
          .text {
            min-height: 172px;
            line-height: 32px;
            font-size: 14px;
            color: #666666;
            font-family: "微软雅黑";
            text-indent: 30px;
          }
          .bottom {
            height: 24px;
            line-height: 24px;
            text-align: right;
            .more {
              font-size: 15px;
              color: #858585;
            }
            .more:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .odd {
        img {
          margin-right: 15px;
        }
      }
      .even {
        .content {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
