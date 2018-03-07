<!--

@usage

base case
<confirm-button
  @confirm="confirm"
  @cancel="cancel"
>
  confirm-button
</confirm-button>

advanced case
<confirm-button
  icon="chevron-left"
  type="primary"
  size="large"
  shape="circle"
  popup-placement="left"
  confirm-icon="ios-search"
  cancel-icon="ios-search"
  :loading="loading"
  @confirm="confirm"
  @cancel="cancel"
>
  <span v-if="loading">Loading...</span>
  <span v-else>Click me!</span>
</confirm-button>

@todo...
append body

-->

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="confirmButtonClasses"
    @click.stop="toogleConfirmPopup"
  >
    <span>
      <Icon v-if="loading" type="load-c" :class="{'ivu-load-loop': loading}" />
      <Icon v-if="!loading&&icon" :type="icon" />
      <slot></slot>
    </span>
    <div :class="confirmPopupClasses">
      <div class="popup-title">{{popupTitle}}</div>
      <Button class="confirm-button" type="error" @click.stop="confirm">
        <Icon v-if="confirmIcon" :type="confirmIcon" />
        {{confirmText}}
      </Button>
      <Button class="cancel-button" type="success" @click.stop="cancel">
        <Icon v-if="cancelIcon" :type="cancelIcon" />
        {{cancelText}}
      </Button>
    </div>
  </button>
</template>

<script>
  import defs from './default-config';
  const ivuBtnPrefix = 'ivu-btn-';
  export default {
    name: 'ConfirmButton',
    data () {
      return {
        popupShown: false
      }
    },
    created () {
      this.bindEvents()
    },
    destroyed () {
      this.unBindEvents()
    },
    components: {

    },
    computed: {
      confirmButtonClasses () {
        const { loading, long, type, size, shape } = this;
        return [
          'ivu-btn',
          `${ivuBtnPrefix}${type}`,
          `${ivuBtnPrefix}${size}`,
          `${ivuBtnPrefix}${shape}`,
          {
            [`${ivuBtnPrefix}long`]: long,
            [`${ivuBtnPrefix}loading`]: loading,
            ['confirm-popup-wrap']: true,
          }
        ]
      },
      confirmPopupClasses () {
        const { popupShown, popupPlacement } = this
        return [
          'confirm-popup',
          `${popupPlacement}`,
          {
            ['shown']: popupShown,
          }
        ]
      }
    },
    props: {
      long: {
        type: Boolean
      },
      icon: {
        type: String
      },
      type: {
        type: String
      },
      size: {
        type: String
      },
      shape: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      confirmIcon: {
        type: String
      },
      cancelIcon: {
        type: String
      },
      confirmText: {
        type: String,
        default: defs.confirmText
      },
      cancelText: {
        type: String,
        default: defs.cancelText
      },
      popupTitle: {
        type: String,
        default: defs.popupTitle
      },
      popupPlacement: {
        type: String,
        default: defs.popupPlacement
      },
    },
    methods: {
      bindEvents () {
        document.addEventListener('click', this.hideConfirmPopup, false);
      },
      unBindEvents () {
        document.removeEventListener('click', this.hideConfirmPopup);
      },
      confirm () {
        this.hideConfirmPopup()
        this.$emit('confirm')
      },
      cancel () {
        this.hideConfirmPopup()
        this.$emit('cancel')
      },
      showConfirmPopup () {
        this.popupShown = true
      },
      hideConfirmPopup () {
        this.popupShown = false;
      },
      toogleConfirmPopup () {
        this.popupShown
          ? this.hideConfirmPopup()
          : this.showConfirmPopup()
      }
    }
  }
</script>
