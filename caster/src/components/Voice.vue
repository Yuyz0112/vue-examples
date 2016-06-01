<template>
  <div id="countdown"
  :style="{width: width + '%'}">{{ counter }}</div>
  <a class="weui_btn weui_btn_plain_primary"
  @click="change">{{ recording? '点击结束':'点击开始' }}</a>
</template>

<script>
import wx from 'wx'
import Wilddog from 'Wilddog'

export default {
  data () {
    return {
      counter: 60,
      recording: false,
      voice: {
        localId: '',
        serverId: ''
      },
      startAt: 0,
      endAt: 0
    }
  },
  computed: {
    width () {
      return 80 * this.counter / 60
    },
    length () {
      return (this.endAt - this.startAt) / 1000
    }
  },
  methods: {
    change () {
      this.recording = !this.recording
      if (this.recording) {
        this.start()
      } else {
        this.end()
      }
    },
    start () {
      const d = new Date()
      this.startAt = d.getTime()
      this.record()
      const t = setInterval(() => {
        this.counter--
        if (this.counter === 2 || !this.recording) {
          window.clearInterval(t)
          this.end()
        }
      }, 1000)
    },
    end () {
      this.reset()
      const d = new Date()
      this.endAt = d.getTime()
      wx.stopRecord({
        success: (res) => {
          this.voice.localId = res.localId
          this.upload()
        }
      })
    },
    reset () {
      this.counter = 60
      this.recording = false
    },
    record () {
      wx.startRecord({
        cancel: () => {
          window.alert('您已拒绝授权录音')
        }
      })
    },
    upload () {
      this.uploading = true
      wx.uploadVoice({
        localId: this.voice.localId,
        success: (res) => {
          this.uploading = false
          this.voice.serverId = res.serverId
          const ref = new Wilddog('https://cast.wilddogio.com/')
          ref.child('voice').push({
            serverId: this.voice.serverId,
            length: parseInt(this.length),
            timestamp: Wilddog.ServerValue.TIMESTAMP,
            type: 'voice'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  #countdown {
    margin-top: 1rem;
  }
  a {
    margin-top: .5rem;
    width: 60%;
  }
</style>
