<template lang="html">
  <div>
    <div class="cube" v-bind:style="{background: bgcolor}"></div>
    <button type="button" v-on:click="changecolor">改变颜色</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bgcolor: '#000'
    }
  },
  methods: {
    changecolor () {
      this.bgcolor = '#ddd'
    }
  }
}
</script>

<style lang="css">
.cube {
  width: 100px;
  height: 100px;
}
</style>
