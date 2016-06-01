<template>
  <div @click="select" class="weui_uploader_input_wrp" v-if="image.localId === ''">
  </div>
  <img :src="image.localId" v-else>
  <a class="weui_btn weui_btn_plain_primary"
  @click="upload">确认上传</a>
</template>

<script>
import wx from 'wx'
import Wilddog from 'Wilddog'

export default {
  data () {
    return {
      image: {
        localId: '',
        serverId: ''
      }
    }
  },
  computed: {
    length () {
      return this.content.length
    }
  },
  methods: {
    select () {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          this.image.localId = res.localIds[0]
        }
      })
    },
    upload () {
      wx.uploadImage({
        localId: this.image.localId,
        success: (res) => {
          this.image.serverId = res.serverId
          const ref = new Wilddog('https://cast.wilddogio.com/')
          ref.child('voice').push({
            serverId: this.image.serverId,
            timestamp: Wilddog.ServerValue.TIMESTAMP,
            type: 'image'
          })
          this.reset()
        }
      })
    },
    reset () {
      this.image.localId = ''
    }
  }
}
</script>

<style scoped>
  .weui_uploader_input_wrp {
    display: block;
    margin: 0 auto;
    float: none;
  }
  a {
    margin: 0 auto;
    margin-top: .5rem;
    width: 60%;
  }
  img {
    width: 77px;
    height: 77px;
    border: 1px solid #d9d9d9;
    margin: 0 auto;
    display: block;
  }
</style>
