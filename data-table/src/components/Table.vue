<template>
  <div class="input-field">
    <input type="text" v-model="query">
  </div>
  <table class="responsive-table striped">
    <thead>
      <tr>
        <th>排名</th>
        <th>分数</th>
        <th>姓名</th>
        <th>服务器</th>
        <th>种族</th>
        <th>职业</th>
        <th>天赋</th>
        <th>赛季战绩</th>
        <th>本周战绩</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row of rows | filterBy query in 'name' | limitBy 10">
        <th>{{ row.ranking }}</th>
        <th>{{ row.rating }}</th>
        <th>{{ row.name }}</th>
        <th>{{ row.realmName }}</th>
        <th>{{ row.raceId }}</th>
        <th>{{ row.classId }}</th>
        <th>{{ row.specId }}</th>
        <th>{{ row.seasonWins }}/{{ row.seasonLosses }}</th>
        <th>{{ row.weeklyWins }}/{{ row.weeklyLosses }}</th>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    }
  },
  props: {
    rows: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped>
</style>