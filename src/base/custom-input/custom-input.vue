<template>
  <Input
    class="custom-input"
    :size="size"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    :number="number"
    :rows="rows"
    :search="search"
    :disabled="disabled"
    @input="inputChange"
    @on-enter="inputEnter">
  </Input>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: 'default'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    number: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    search: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inputEnter () {
      this.$emit('on-enter')
    },
    inputChange (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  }
}
</script>

<style lang="scss">
  .custom-input {
    width: 100%;
    .ivu-input {
      height: 37px;
      font-size: 16px;
      border-radius: 0;
      &:hover {
        border: 1px solid #dcdee2;
      }
    }
  }
</style>
