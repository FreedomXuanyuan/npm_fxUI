<template>
  <div
      class="m-switch"
      :class="{
      'switch-loading': loading,
      'switch-small': size === 'small',
      'switch-large': size === 'large',
      'switch-checked': modelValue === checkedValue,
      'switch-disabled': disabled
    }"
      :style="`--ripple-color: ${rippleColor};`"
      @click="disabled || loading ? () => false : onSwitch()"
  >
    <div class="switch-inner">
      <span class="inner-checked">
        <slot name="checked">{{ checked }}</slot>
      </span>
      <span class="inner-unchecked">
        <slot name="unchecked">{{ unchecked }}</slot>
      </span>
    </div>
    <div class="switch-circle" :style="circleStyle">
      <svg v-if="loading" class="circular" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
      <slot name="node" :checked="modelValue"></slot>
    </div>
    <div v-if="!disabled" class="switch-wave" :class="{ 'wave-active': wave }" @animationend="onWaveEnd"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import './style/index.less'
interface Props {
  checked?: string // 选中时的内容 string | slot
  checkedValue?: boolean | string | number // 选中时的值
  unchecked?: string // 未选中时的内容 string | slot
  uncheckedValue?: boolean | string | number // 未选中时的值
  loading?: boolean // 是否加载中
  disabled?: boolean // 是否禁用
  size?: 'small' | 'middle' | 'large' // 开关大小
  rippleColor?: string // 点击时的波纹颜色，当自定义选中颜色时需要设置
  circleStyle?: CSSProperties // 圆点样式
  modelValue?: boolean | string | number // (v-model) 指定当前是否选中
}
const props = withDefaults(defineProps<Props>(), {
  checked: undefined,
  checkedValue: true,
  unchecked: undefined,
  uncheckedValue: false,
  loading: false,
  disabled: false,
  size: 'middle',
  rippleColor: '#1677ff',
  circleStyle: () => ({}),
  modelValue: false
})
const wave = ref(false)
const emit = defineEmits(['update:modelValue', 'change'])
function onSwitch() {
  if (props.modelValue === props.checkedValue) {
    emit('update:modelValue', props.uncheckedValue)
    emit('change', props.uncheckedValue)
  } else {
    emit('update:modelValue', props.checkedValue)
    emit('change', props.checkedValue)
  }
  if (wave.value) {
    wave.value = false
    nextTick(() => {
      wave.value = true
    })
  } else {
    wave.value = true
  }
}
function onWaveEnd() {
  wave.value = false
}
</script>