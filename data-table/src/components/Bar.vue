<template>
  <div class="clear-fix">
    <span
    v-if="!hasGame || win / total > 0"
    :style="{ width: 100 * win / total + '%' }"
    :class="hasGame? '':'no-game'"
    class="win-bar">
      {{ hasGame? (100 * win / total).toFixed(1) + '%':'无场次' }}
    </span>
    <span
    v-if="loss / total > 0"
    :style="{ width: 100 * loss / total + '%' }"
    class="loss-bar">
      {{ win === 0? '0%':'' }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    win: {
      type: Number,
      default: 0
    },
    loss: {
      type: Number,
      default: 0
    }
  },
  computed: {
    total () {
      return this.win + this.loss
    },
    hasGame () {
      if (this.win === 0 && this.loss === 0) {
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
  div {
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden;
  }
  span {
    display: inline-block;
    float: left;
    height: 1.6em;
  }
  .win-bar {
    width: 100%;
    text-align: center;
    background: #69f0ae;
  }
  .no-game {
    background: #fff;
  }
  .loss-bar {
    background: #ff5252;
    text-align: center;
    color: #fff;
  }
</style>