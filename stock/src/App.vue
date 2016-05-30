<template>
  <div class="container">
    {{ msg }}
  </div>
</template>

<script>
import stock from './api/stock'

export default {
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  created () {
    stock.get('aapl', (err, val) => {
      console.log(err, val)
    })
  }
}
</script>

<style scoped>
</style>