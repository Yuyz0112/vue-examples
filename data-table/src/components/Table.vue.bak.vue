<template>
  <input
  v-model="query"
  type="text">
  <input
  v-model="page"
  type="number">
  <table class="responsive-table">
    <thead>
      <tr>
        <th
        @click="sort = {key: 'ranking', val: -sort.val}">排名</th>
        <th
        @click="sort = {key: 'rating', val: -sort.val}">分数</th>
        <th>资料</th>
        <th>服务器</th>
        <th
        @click="sort = {key: 'weeklyRate', val: -sort.val}">本周战绩</th>
        <th
        @click="sort = {key: 'seasonRate', val: -sort.val}">赛季战绩</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="player of players
      | filterBy query in 'name' 'realmName'
      | orderBy sort.key sort.val
      | limitBy 20 (page-1)*20"
      :class="player.factionId? 'horde':'alliance'">
        <th>{{ player.ranking }}</th>
        <th>{{ player.rating }}</th>
        <th>
          <span
          class="class"
          :style="{ backgroundImage: 'url(http://7xs8rx.com1.z0.glb.clouddn.com/class.png)',
                    backgroundPosition: player.classIcon }"></span>
          {{ player.name }}
        </th>
        <th>{{ player.realmName }}</th>
        <th>
          <bar
          :win="player.weeklyWins"
          :loss="player.weeklyLosses"></bar>
        </th>
        <th>
          <bar
          :win="player.seasonWins"
          :loss="player.seasonLosses"></bar>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Bar from './Bar'
import { classIdToIcon } from '../assets/utils'

export default {
  components: { Bar },
  data () {
    return {
      limit: 20,
      query: '',
      page: 1,
      sort: {
        key: 'ranking',
        val: 1
      }
    }
  },
  props: {
    rows: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    players () {
      this.rows = this.handleBefore(this.rows)
      return this.rows
    }
  },
  methods: {
    handleBefore (arr) {
      console.log('before handle')
      if (this.rows[0]) {
        arr.forEach((item) => {
          if (item.weeklyWins === 0 && item.weeklyLosses === 0) {
            item.weeklyRate = -1
          } else {
            item.weeklyRate = item.weeklyWins / (item.weeklyWins + item.weeklyLosses)
          }
          if (item.seasonWins === 0 && item.seasonLosses === 0) {
            item.seasonRate = -1
          } else {
            item.seasonRate = item.seasonWins / (item.seasonWins + item.seasonLosses)
          }
          item.classIcon = classIdToIcon(item.classId)
        })
      }
      return arr
    }
  }
}
</script>

<style scoped>
  th {
    font-weight: normal;
  }
  th:last-child, td:last-child {
    padding-right: 1.5rem;
  }
  th:first-child, td:first-child {
    padding-left: 1.5rem;
  }
  .horde {
    background: rgba(255, 205, 210, .4);
  }
  .alliance {
    background: rgba(179, 229, 252, .4);
  }
  .class {
    display: inline-block;
    width: 1.6em;
    height: 1.6em;
    float: left;
    margin-right: 2px;
    background-size: auto 104px;
  }
  @media only screen and (max-width: 992px) {
    th, td {
      border-bottom: 0;
    }
    tbody tr {
      border-right: 1px solid rgba(208, 208, 208, .5);
    }
    table.responsive-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      display: block;
      position: relative;
    }
    table.responsive-table td:empty:before {
      content: '\00a0';
    }
    table.responsive-table th,
    table.responsive-table td {
      margin: 0;
      vertical-align: top;
    }
    table.responsive-table th {
      text-align: left;
    }
    table.responsive-table thead {
      display: block;
      float: left;
    }
    table.responsive-table thead tr {
      display: block;
      padding: 0 10px 0 0;
    }
    table.responsive-table thead tr th::before {
      content: "\00a0";
    }
    table.responsive-table tbody {
      display: block;
      width: auto;
      position: relative;
      overflow-x: auto;
      white-space: nowrap;
    }
    table.responsive-table tbody tr {
      display: inline-block;
      vertical-align: top;
    }
    table.responsive-table th {
      display: block;
      text-align: right;
    }
    table.responsive-table td {
      display: block;
      min-height: 1.25em;
      text-align: left;
    }
    table.responsive-table tr {
      padding: 0 10px;
    }
    table.responsive-table thead {
      border: 0;
      border-right: 1px solid #d0d0d0;
    }
    table.responsive-table.bordered th {
      border-bottom: 0;
      border-left: 0;
    }
    table.responsive-table.bordered td {
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
    }
    table.responsive-table.bordered tr {
      border: 0;
    }
    table.responsive-table.bordered tbody tr {
      border-right: 1px solid #d0d0d0;
    }
  }
</style>