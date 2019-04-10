<template>
  <Select
    class="custom-select"
    transfer-class-name="custom-select-dropdown"
    :value="value"
    :placeholder="placeholder"
    :multiple="multiple"
    :clearable="clearable"
    :transfer="transfer"
    :disabled="disabled"
    :filterable="filterable"
    @on-open-change="selectOpen"
    @on-change="selectChange">
    <slot v-if="isCustomOption" />

    <template v-else>
      <Option
        v-for="item in optionList"
        v-if="item[valKey]"
        :value="item[valKey]"
        :key="item[valKey]">{{ item[labelKey] }}</Option>
    </template>
  </Select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array]
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    transfer: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    optionList: {
      type: Array,
      default: () => []
    },
    valKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    isCustomOption: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectChange (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    selectOpen (bol) {
      if (bol) {
        this.$emit('selectOpen')
      } else {
        this.$emit('selectClose')
      }
    }
  }
}
</script>

<style lang="scss">
  .custom-select {
    width: 100%;
    .ivu-select-selection {
      height: 37px;
      border-radius: 0;
      background-color: #035cc4;
      color: white;
      border: none;
      .ivu-select-placeholder,
      .ivu-select-selected-value {
        height: 37px;
        line-height: 37px;
        font-size: 16px;
        font-family: "Microsoft Yahei";
        font-weight: 700;
      }
    }
  }
  .custom-select-dropdown {
    border-radius: 0;
    background-color: #2062b2;
    z-index: 2000;
    .ivu-select-not-found {
      color: white;
    }
    .ivu-select-item {
      transition: all .2s;
      color: white;
      &:hover,
      &.ivu-select-item-selected {
        color: #2062b2;
        background-color: #f3f3f3;
      }
    }
  }
  .ivu-select-arrow {
    color: white;
    font-size: 20px;
    margin-top: -10px;
  }
</style>
