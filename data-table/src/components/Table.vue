<template>
  <input
  v-model="query"
  type="text"
  placeholder="搜索资料及服务器，区分大小写">
  <p>
    <input
    v-model="rating"
    :min="range[0]"
    :max="range[1]"
    type="range">
    {{ rating }}
  </p>
  <select v-model="class">
    <option value="0" disabled selected>请选择职业</option>
    <option
    v-for="(key, val) in classes"
    :value="key">{{ val.name }}</option>
  </select>
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
      v-for="player of players"
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
  <p class="pagination">
    <a class="button" @click="changePage(-1)">上一页</a>
    当前第<input v-model="page" type="text" class="page">页 共{{ total }}页
    <a class="button" @click="changePage(1)">下一页</a>
  </p>
</template>

<script>
import Bar from './Bar'
import { classIdToIcon, classes } from '../assets/utils'

export default {
  components: { Bar },
  data () {
    return {
      limit: 20,
      rating: 0,
      class: 0,
      classes: classes,
      query: '',
      page: 1,
      sort: {
        key: 'ranking',
        val: 1
      },
      total: 0
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
      let arr = []
      this.rows = this.handleBefore(this.rows)
      arr = this.classFilter(this.rows)
      arr = this.queryFilter(arr)
      arr = this.ratingFilter(arr)
      this.sortTable(arr)
      arr = this.paginate(arr)
      arr = this.handleAfter(arr)
      return arr
    },
    range () {
      if (this.rows[0]) {
        return [this.rows[this.rows.length - 1].rating, this.rows[0].rating]
      }
      return [0, 0]
    }
  },
  methods: {
    classFilter (arr) {
      let n = 0
      this.class = parseInt(this.class)
      if (this.class === 0) {
        return arr
      }
      arr = arr.filter((item) => {
        n++
        if (item.classId === this.class) {
          return item
        }
      })
      console.log('filter class, ' + n)
      return arr
    },
    queryFilter (arr) {
      let n = 0
      arr = arr.filter((item) => {
        n++
        if (this.query === '' || item.name.indexOf(this.query) !== -1 || item.realmName.indexOf(this.query) !== -1) {
          return true
        }
      })
      console.log('filter query, ' + n)
      return arr
    },
    ratingFilter (arr) {
      let n = 0
      arr = arr.filter((item) => {
        n++
        if (item.rating >= this.rating) {
          return item
        }
      })
      console.log('filter rating, ' + n)
      return arr
    },
    sortTable (arr) {
      let n = 0
      arr.sort((a, b) => {
        n++
        if (a[this.sort.key] > b[this.sort.key]) {
          return this.sort.val
        } else {
          if (a[this.sort.key] < b[this.sort.key]) {
            return -this.sort.val
          }
        }
      })
      console.log('sort, ' + n)
    },
    paginate (arr) {
      console.log('paginate')
      this.total = Math.ceil(arr.length / this.limit)
      let page = parseInt(this.page - 1)
      if (page < 0) {
        page = 0
      }
      arr = arr.slice(this.limit * page, this.limit * (page + 1))
      return arr
    },
    handleBefore (arr) {
      if (this.rows[0] && this.rows[0].weeklyRate === undefined) {
        console.log('before handle')
        this.rating = this.range[0]
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
        })
      }
      return arr
    },
    handleAfter (arr) {
      let n = 0
      arr.forEach((item) => {
        if (item.classIcon === undefined) {
          n++
          item.classIcon = classIdToIcon(item.classId)
        }
      })
      console.log('handle after, ' + n)
      console.log('********************')
      return arr
    },
    changePage (num) {
      if (num === 1) {
        if (this.page < this.total) {
          this.page++
        } else {
          window.alert('已是最后一页')
        }
      } else {
        if (this.page > 1) {
          this.page--
        } else {
          window.alert('已是第一页')
        }
      }
    }
  }
}
</script>

<style scoped>
  .pagination {
    text-align: center;
  }
  .page {
    width: 4em;
  }
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