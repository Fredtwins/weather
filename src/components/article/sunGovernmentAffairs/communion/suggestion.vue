<template>
  <div class="affairs-communication-suggestion">
    <div class="suggestion-list">
      <div
        v-for="item in currentList"
        :key="'suggestion'+item.id"
        class="suggestion-box"
      >
        <div class="question-box">
          <div class="content">
            <span class="name">{{item.nickname}}：</span>{{item.content}}
          </div>
          <!--<span class="time">{{item.question.time}}</span>-->
        </div>
        <div class="answer-box">
          <div class="content">
            <span class="name">气象新闻发言人回复：</span>{{item.reply}}
          </div>
          <!--<span class="time">{{item.answer.time}}</span>-->
        </div>
      </div>
    </div>
    <page
      :total="totalSuggestion"
      :size="pageSize"
      :current="currentPage"
      @pageChange="pageChange"
    />
    <div class="form-area">
      <Form
        ref="formValidate"
        :model="formValidate"
        label-position="left"
        :rules="ruleValidate"
      >
        <div class="form-row">
          <div class="form-col">
            <label for="name">昵称：</label>
            <div class="input-box">
              <FormItem prop="name">
                <Input v-model="formValidate.name" />
              </FormItem>
            </div>
          </div>
          <div class="form-col">
            <label for="contact">联系方式：</label>
            <div class="input-box">
              <FormItem prop="contact">
                <Input v-model="formValidate.contact" />
              </FormItem>
            </div>
          </div>
        </div>
        <div class="form-content">
          <label for="content">留言：</label>
          <div class="input-box">
            <FormItem prop="content">
              <Input
                type="textarea"
                :rows="5"
                v-model="formValidate.content"
              />
            </FormItem>
          </div>
        </div>
        <div class="form-submit">
          <div class="form-col">
            <label for="code">验证码：</label>
            <div class="input-box">
              <FormItem prop="code">
                <Input v-model="formValidate.code" />
              </FormItem>
            </div>
          </div>
          <!--<img ref="createCode" :src="verifyImg" @click="refreshVerifyCode" />-->
          <input type="button" id="checkCode" class="code" @click="createCode" />
          <button
            class="submit-button"
            @click="_submitForm"
          >提交留言</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>

import page from '../../common-component/page'
import { ERR_OK } from 'api/config'
import { GetSuggestion, SubmitSuggestion } from 'api/tornado'
import { successMessage, errorNotice } from 'common/js/dom'

export default {
  components: { page },
  mounted () {
    this.setPage(this.$route)
    this.createCode()
  },
  beforeRouteUpdate (to, from, next) {
    this.setPage(to)
    next()
  },
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value.toLowerCase() === this.code.toLowerCase()) {
        callback()
      } else {
        callback(('请输入正确的验证码'))
      }
    }
    return {
      totalSuggestion: 1,
      pageSize: 1,
      currentPage: 1,
      currentList: [],
      verifyImg: require('../../img/verify_code.png'),
      formValidate: {
        name: '',
        contact: '',
        content: '',
        code: ''
      },
      code: '',
      ruleValidate: {
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        contact: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' },
          {
            message: '请输入正确的联系方式',
            type: 'number',
            trigger: 'blur',
            transform (value) {
              let result = Number(value)
              return result === isNaN ? false : result
            }
          }
        ],
        content: [
          { required: true, message: '请输入留言' },
          {
            message: '字符长度不能小于10',
            trigger: 'blur',
            transform (value) {
              return value.length < 10 ? false : value
            }
          }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          {
            message: '请输入正确的验证码',
            trigger: 'blur',
            validator: validatePassCheck
          }
        ]
      }
    }
  },
  methods: {
    // 生成验证码
    createCode () {
      let code = ''
      let codeLength = 4
      let checkCode = document.getElementById('checkCode')
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
      for (let i = 0; i < codeLength; i++) {
        let charIndex = Math.floor(Math.random() * 36)
        code += random[charIndex]
      }
      this.code = code
      checkCode.value = this.code
    },
    setPage (route) {
      let page = parseInt(route.params.page)
      this.currentPage = page
      this._getData(page)
    },
    _getData (page) {
      GetSuggestion(page)
        .then(res => {
          if (res.code === ERR_OK) {
            let data = res.page
            this.currentList = data.list
            this.totalSuggestion = data.totalCount
            this.pageSize = data.pageSize
          }
        })
        .catch(res => {
          errorNotice(res.msg)
        })
    },
    pageChange (page) {
      this.$router.push('/sunGovernmentAffairs/communion/suggestion/' + page)
    },
    _submitForm () {
      // 提交表单
      let obj = {
        nickname: this.formValidate.name,
        content: this.formValidate.content
      }
      SubmitSuggestion(obj)
        .then(res => {
          if (res.code === ERR_OK) {
            successMessage(res.msg)
            this.$refs['formValidate'].resetFields()
            this._getData(this.currentPage)
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
.affairs-communication-suggestion {
  width: 100%;
  padding: 20px 0;
  .suggestion-box {
    margin-bottom: 30px;
    display: block;
    font-size: 12px;
    font-family: "宋体";
    border-bottom: 1px dashed #2162a9;
    .time,
    .content {
      display: inline-block;
      vertical-align: top;
      line-height: 25px;
      word-break: break-all;
      .name {
        color: #2162a9;
      }
    }
    .time {
      width: 114px;
      height: 25px;
      text-align: right;
    }
    .question-box {
      margin-bottom: 8px;
      .content {
        width: 810px;
      }
    }
    .answer-box {
      width: 100%;
      margin-bottom: 20px;
      padding: 15px;
      position: relative;
      box-sizing: border-box;
      border: 1px solid #f0f1f2;
      background-color: #f7f8fa;
      .content {
        width: 778px;
      }
    }
    .answer-box:after {
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      top: -6px;
      left: 15px;
      border: solid #f0f1f2;
      border-width: 1px 0 0 1px;
      background-color: #f7f8fa;
      transform: rotate(45deg);
    }
  }
  .form-area {
    padding-top: 30px;
    .form-col {
      margin-right: 20px;
      display: inline-block;
    }
    label {
      height: 36px;
      line-height: 36px;
      display: inline-block;
      font-size: 12px;
      font-family: "宋体";
    }
    .input-box {
      width: 350px;
      display: inline-block;
    }

    .form-content {
      display: inline-block;
      .input-box {
        width: 785px;
      }
    }
    .form-submit {
      .input-box {
        width: 110px;
      }
      img {
        height: 22px;
        margin-top: 5px;
        display: inline-block;
        cursor: pointer;
      }
      .code{
        width: 80px;
        line-height: 26px;
        font-size: 13.333px;
      }
      .submit-button {
        width: 66px;
        height: 32px;
        line-height: 32px;
        display: inline-block;
        margin-left: 20px;
        border-radius: 0;
        border: 0;
        padding: 0;
        background-color: #16499a;
        font-size: 13.333px;
        font-family: "宋体";
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
