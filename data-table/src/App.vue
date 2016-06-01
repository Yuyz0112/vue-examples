<template>
  <div class="container">
    <div class="container">
      {{ msg }}
    </div>
    <v-table
    :rows="rows"></v-table>
  </div>
</template>

<script>
import arena from './api/arena'
import vTable from './components/Table'

export default {
  components: { vTable },
  data () {
    return {
      msg: '',
      region: 'CN',
      laddar: '3v3',
      rows: []
    }
  },
  methods: {
    getLaddar (region, laddar) {
      arena.getLaddar(region, laddar, (err, val) => {
        if (!err) {
          this.rows = val.rows
        }
      })
    }
  },
  created () {
    arena.getDate((err, val) => {
      if (!err) {
        this.msg = val[0].date
      }
    })
    this.getLaddar(this.region, this.laddar)
  }
}
</script>

<style>
  body {
    font-family: "Helvetica Neue","Helvetica","Arial","Microsoft Yahei";
  }
  .clear-fix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .clear-fix {
    *+height:1%;
  }
</style>