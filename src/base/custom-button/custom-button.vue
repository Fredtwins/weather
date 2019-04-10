<template>
  <Button
    v-if="type === 'text-primary'"
    class="custom-button custom-button-textPrimary"
    :loading="loading"
    :icon="icon"
    :size="size"
    :disabled="disabled"
    @click="buttonClick">
    <slot />
  </Button>
  <Button
    v-else
    class="custom-button"
    :type="type"
    :loading="loading"
    :icon="icon"
    :size="size"
    :disabled="disabled"
    @click="buttonClick">
    <slot />
  </Button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    size: {},
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  $Color-primary: #035cc4;

  .custom-button {
    min-width: 70px;
    padding: 4px 15px 5px;
    border-radius: 0;
    font-size: 16px;
    &.custom-button-textPrimary {
      border-color: $Color-primary;
      color: $Color-primary;
    }
    &.ivu-btn-primary {
      background-color: $Color-primary;
      border-color: $Color-primary;
    }
    &.ivu-btn-error {
      // background-color: $Color-danger;
      // border-color: $Color-danger;
    }
    &[disabled] {
      color: #c5c8ce;
      background-color: #f7f7f7;
      border-color: #dcdee2;
    }
  }
</style>
