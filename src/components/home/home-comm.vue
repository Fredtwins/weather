<template>
  <!--首页 右侧 互动交流-->
  <div class="comm">
    <titleContent :titlearray="titleright"/>
    <div class="level-comm">
      <div class="big-comm">
        <div class="message1">
          <span>昵称: </span>
          <Input v-model="form.nickname" />
        </div>
        <div class="message1">
          <span>qq: </span>
          <Input v-model="form.qq" />
        </div>
        <div class="message1">
          <span>邮箱: </span>
          <Input v-model="form.email" />
        </div>
        <div class="message1">
          <span>手机号码: </span>
          <Input v-model="form.mobile" />
        </div>
        <div class="message1">
          <span>留言: </span>
          <Input v-model="form.content" type="textarea" />
        </div>
        <div class="message1">
          <span>验证码: </span>
          <Input type="text" style="width: 20%" v-model="form.code"/>
          <span class="code-text" @click="createCode" v-html="code"></span>
          <Button type="primary" @click="handup()">提交留言</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titleContent from './titlecontent'
import { ERR_OK } from 'api/config'
import { SubmitSuggestion } from 'api/article'
import { errorNotice, successMessage, errorMessage } from 'common/js/dom'

export default {
  components: {
    titleContent
  },
  data () {
    return {
      titleright: '互动交流',
      form: {
        nickname: '',
        qq: '',
        email: '',
        mobile: '',
        content: '',
        code: ''
      },
      code: ''
    }
  },
  mounted () {
    this.createCode()
  },
  methods: {
    createCode () {
      this.code = ''
      let codeLength = 4
      // 验证码的长度
      let codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ]
      // 所有候选组成验证码的字符，当然也可以用中文的
      for (let i = 0; i < codeLength; i++) {
        let charNum = Math.floor(Math.random() * 52)
        this.code += codeChars[charNum]
      }
    },
    handup () {
      if (this.form.nickname === '') {
        errorMessage('呢称不能为空')
        return
      }
      if (this.form.content === '') {
        errorMessage('留言不能为空')
        return
      }
      if (this.form.code === '') {
        errorMessage('验证码不能为空')
        return
      }
      if (this.form.code.toLowerCase() !== this.code.toLowerCase()) {
        errorMessage('请输入正确的验证码')
        return
      }
      let obj = {
        nickname: this.form.nickname,
        content: this.form.content
      }
      this._submitForm(obj)
    },
    _submitForm (obj) {
      SubmitSuggestion(obj)
        .then(res => {
          if (res.code === ERR_OK) {
            successMessage(res.msg)
            this.$refs['form'].resetFields()
            this.createCode()
          }
        })
        .catch(res => {
          errorNotice(res.msg)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.comm {
  width: 350px;
  color: #000;
  > .level-comm {
    width: 100%;
    border: #e3e3e3 solid 1px;
    overflow: hidden;
    height: 330px;
    > .big-comm {
      > .message1 {
        padding-top: 18px;
        > span {
          width: 80px;
          display: inline-block;
          text-align: right;
          font-size: 13px;
          padding-right: 5px;
        }
        > .ivu-input-wrapper {
          width: 72%;
        }
        > .ivu-input{
          border-radius: 0px;
        }
        > .code-text {
          width: 60px;
          height: 27px;
          font-weight: bold;
          line-height: 27px;
          color: blue;
          border: 1px solid #f0f1f2;
          background-color: #dcdcdc;
          text-align: center;
          letter-spacing: 3px;
          cursor: pointer;
          margin: 0 16px;
        }
        > .ivu-btn-primary {
          background: #16499a;
          border: none;
          border-radius: 0px;
          cursor: pointer;
          color: #FFF;
          line-height: 18px;
          height: 28px;
          font-size: 14px;
          width: 66px;
          padding-left: 6px;
        }
      }
    }
  }
}
</style>

