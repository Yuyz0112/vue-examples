<template>
  <div class="center">
    <p class="timestamp">{{ hour }}:{{ minute }}</p>
  </div>
  <!--voice template-->
  <p class="voice" v-if="message.type === 'voice'">
    <span class="avator">
      <img src="http://lab.myriptide.com/wow/avator.jpg">
    </span>
    <span class="rect" @click="download">
      <span class="spinner" v-show="listen === message.key">
        <i class="bounce1"></i>
        <i class="bounce2"></i>
        <i class="bounce3"></i>
      </span>
    </span>
    <span class="number">{{ message.length }}''</span>
    <span v-if="!checked" class="checked"></span>
  </p>
  <!--text template-->
  <p class="text clearfix" v-if="message.type === 'text'">
    <span class="avator">
      <img src="http://lab.myriptide.com/wow/avator.jpg">
    </span>
    <span class="text-rect">
      {{ message.content }}
    </span>
  </p>
  <!--image template-->
  <p class="image clearfix" v-if="message.type === 'image'">
    <span class="avator">
      <img src="http://lab.myriptide.com/wow/avator.jpg">
    </span>
    <span class="image-rect">
      <img src="https://d13yacurqjgara.cloudfront.net/users/60166/screenshots/2661808/eagle.jpg">
    </span>
  </p>
</template>

<script>
import wx from 'wx'

export default {
  data () {
    return {
      localId: ''
    }
  },
  props: {
    message: {
      type: Object,
      default () {
        return {}
      }
    },
    listen: {
      type: String,
      default: ''
    },
    keys: {
      type: Array,
      default: []
    }
  },
  computed: {
    checked () {
      if (this.keys.indexOf(this.message.key) === -1) {
        return false
      }
      return true
    },
    hour () {
      const date = new Date(this.message.timestamp)
      return date.getHours()
    },
    minute () {
      const date = new Date(this.message.timestamp)
      return date.getMinutes()
    }
  },
  methods: {
    download () {
      this.listen = ''
      if (this.keys.indexOf(this.message.key) === -1) {
        this.keys.push(this.message.key)
      }
      wx.downloadVoice({
        serverId: this.message.serverId,
        success: (res) => {
          this.localId = res.localId
          this.listenVoice()
        }
      })
    },
    listenVoice () {
      this.listen = this.message.key
      wx.playVoice({
        localId: this.localId
      })
      wx.onVoicePlayEnd({
        complete: (res) => {
          this.listen = ''
        }
      })
    }
  },
  ready () {
    if (this.message.type === 'image') {
      wx.ready(() => {
        wx.downloadImage({
          serverId: this.message.serverId,
          success: (res) => {
            this.localId = res.localId
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.timestamp {
  display: inline-block;
  background: #b6b6b6;
  border-radius: 5px;
  padding: .25rem .75rem;
  margin-bottom: .25rem;
  color: #fff;
}
.voice {
  height: 2.5rem;
  margin-bottom: 1.25rem;
}
.voice, .text, .image{
  margin-top: .25rem;
}
.voice > span, .text > span, .image > span {
  display: inline-block;
  height: 2.5rem;
}
.avator {
  width: 2.5rem;
}
.voice .avator {
  float: left;
}
.avator > img {
  width: auto;
  height: 100%;
}
.rect {
  width: 7rem;
  border-radius: 5px;
  margin-left: .5rem;
  background: url('../assets/speak.png') #fff left center no-repeat;
  background-size: 20%;
  cursor: pointer;
  position: relative;
}
.rect .spinner {
  position: absolute;
  right: 0;
  top: .5rem;
}
.number {
  color: #888;
}
.checked {
  background: #f44336;
  width: .5rem;
  height: .5rem !important;
  border-radius: 50%;
}
.text .avator, .image .avator {
  float: left;
}
.text-rect {
  border-radius: 5px;
  background: #fff;
  line-height: 2.5rem;
  padding: 0 .75rem;
  float: left;
  margin-left: .5rem;
  height: auto !important;
  margin-bottom: 1.25rem;
  max-width: calc(100% - 4.5rem);
}
.image-rect {
  border-radius: 5px;
  float: left;
  margin-left: .5rem;
  background: #fff;
  padding: .25rem;
  height: auto !important;
  margin-bottom: 1.25rem;
}
.image-rect img{
  max-width: 10rem;
}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
.clearfix{*+height:1%;}
</style>
