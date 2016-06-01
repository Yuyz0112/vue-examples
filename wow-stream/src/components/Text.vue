<template>
  <div class="weui_cell">
    <div class="weui_cell_bd weui_cell_primary">
      <textarea class="weui_textarea" placeholder="请输入文本" rows="4"
      v-model="content"></textarea>
      <div class="weui_textarea_counter"><span>{{ length }}</span>/{{ max }}</div>
    </div>
  </div>
  <a class="weui_btn weui_btn_plain_primary"
  @click="upload">确认上传</a>
</template>

<script>
import Wilddog from 'Wilddog'

export default {
  data () {
    return {
      max: 300,
      content: ''
    }
  },
  props: {
    uploading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    length () {
      return this.content.length
    }
  },
  methods: {
    upload () {
      this.uploading = true
      const ref = new Wilddog('https://cast.wilddogio.com/')
      ref.child('voice').push({
        content: this.content,
        timestamp: Wilddog.ServerValue.TIMESTAMP,
        type: 'text'
      })
      this.reset()
    },
    reset () {
      this.content = ''
      setTimeout(() => {
        this.uploading = false
      }, 500)
    }
  }
}
</script>

<style scoped>
  .weui_cell {
    background: #efefef;
  }
  a {
    margin-top: .5rem;
    width: 60%;
  }
</style>
