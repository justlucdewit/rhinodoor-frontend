<template functional>
  <img
      src="@/assets/wave.png"
      :alt="`banner-${ props.orientation }`"
      :class="`banner-${ props.orientation }`"
      :style="`
        height: ${ props.amplitude }px;
        position: relative;
        ${ props.orientation === 'top' ? 'margin-bottom: -10px;' : '' }
        ${ props.color ? `background: ${props.color};` : '' }
        top: ${ props.height }px;
      `"
  />
</template>

<script>
export default {
  props: {
    orientation: {
      type: String,
      default: 'top'
    },

    amplitude: {
      type: Number,
      default: 50
    },

    color: {
      type: String,
      default: null
    },

    height : {
      type: Number,
      default: 0
    }
  }
}
</script>
