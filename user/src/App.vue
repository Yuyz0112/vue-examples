<template>
  <div id="app">
    <div class="page" id="user">
      <div class="page-title">直播观众页面</div>
      <div id="playground">
        <div class="room">
          <message
          :message="message"
          :listen.sync="listen"
          :keys.sync="keys"
          v-for="message of list"></message>
        </div>
      </div>
      <div class="console"><span>{{ msg }}</span></div>
    </div>
  </div>
</template>

<script>
import store from 'store'
import sdk from './api/sdk'
import Wilddog from 'Wilddog'
import Message from './components/Message'

export default {
  components: {
    Message
  },
  data () {
    return {
      listen: '',
      list: [],
      keys: [],
      msg: '正在加载中...'
    }
  },
  created () {
    const ref = new Wilddog('https://cast.wilddogio.com/voice/')
    sdk.get((err) => {
      if (err) {
        console.log(err)
      } else {
        ref.on('child_added', (snapshot) => {
          let obj = snapshot.val()
          obj.key = snapshot.key()
          this.list.push(obj)
        })
        this.keys = store.get('keys') || []
        this.msg = '加载完成'
      }
    })
  },
  watch: {
    keys (val) {
      store.set('keys', this.keys)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body, html {
  height: 100%;
  -webkit-tap-highlight-color: transparent;
  font-family:'Helvetica Neue', Helvetica, Microsoft Yahei;
}
#app {
  height: 100%;
}
.page, body {
  background-color: #fff;
}
.page {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.page-title {
  text-align: center;
  font-size: 2rem;
  color: #3cc51f;
  font-weight: 400;
  background: #fff;
}
.page-desc {
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
  color: #888;
}
#info-bar {
  margin-top: 5rem;
}
#recording, #uploading {
  opacity: 0;
  transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
  -webkit-transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
#countdown {
  width: 80%;
  height: 1.5rem;
  background: rgba(60, 197, 31, 0.4);
  margin: 0 auto;
  text-align: center;
  line-height: 1.5rem;
  font-weight: bold;
  color: #fff;
  transition: all 1000ms;
}
.circle-btn {
  display: block;
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
  background: url('./assets/b.png') center center no-repeat;
  background-size: 30%;
  margin-top: 5rem;
  border-radius: 50%;
  border: 3px solid #efefef !important;
  outline: none;
  -webkit-touch-callout:none;
  box-shadow: 0 6px 36px rgba(60, 197, 31, 0.5),
            0 1px 0 #efefef,
            1px 3px 0 #efefef,
            2px 4px 0 #efefef,
            2px 5px 0 #efefef,
            2px 6px 0 #efefef;
  cursor: pointer;
  transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
  -webkit-transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.circle-btn:active {
  box-shadow: 0 5px 12px rgba(60, 197, 31, 0.8), 0 3px 0 #efefef;
}
.spinner {
  width: 5rem;
  display: inline-block;
  text-align: center;
}
.spinner > i {
  width: .8rem;
  height: .8rem;
  margin-top: .1rem;
  background-color: rgba(60, 197, 31, 0.5);
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
#user .page-title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
}
#playground {
  padding-top: 3.2rem;
  width: 100%;
  height: 80%;
  background: #efefef;
  overflow: auto;
}
.room {
  padding:.75rem;
}
.center {
  text-align: center;
}
.console {

}
</style>
