<template>
  <div id="app">
    <div class="page" id="caster" v-if="auth">
      <div class="weui_toast" v-show="uploading">
        <div id="loadingToast" class="weui_loading_toast">
          <div class="weui_mask_transparent"></div>
          <div class="weui_toast">
            <div class="weui_loading">
              <div class="weui_loading_leaf weui_loading_leaf_0"></div>
              <div class="weui_loading_leaf weui_loading_leaf_1"></div>
              <div class="weui_loading_leaf weui_loading_leaf_2"></div>
              <div class="weui_loading_leaf weui_loading_leaf_3"></div>
              <div class="weui_loading_leaf weui_loading_leaf_4"></div>
              <div class="weui_loading_leaf weui_loading_leaf_5"></div>
              <div class="weui_loading_leaf weui_loading_leaf_6"></div>
              <div class="weui_loading_leaf weui_loading_leaf_7"></div>
              <div class="weui_loading_leaf weui_loading_leaf_8"></div>
              <div class="weui_loading_leaf weui_loading_leaf_9"></div>
              <div class="weui_loading_leaf weui_loading_leaf_10"></div>
              <div class="weui_loading_leaf weui_loading_leaf_11"></div>
            </div>
            <p class="weui_toast_content">上传中...</p>
          </div>
        </div>
      </div>
      <div class="page-title">直播主播页面</div>
      <div class="page-desc">点击下方按钮开始录音</div>
      <voice></voice>
      <div class="divider"></div>
      <div class="page-desc">上传文字</div>
      <v-text :uploading.sync="uploading"></v-text>
      <div class="divider"></div>
      <div class="page-desc">上传图片</div>
      <v-image></v-image>
    </div>
    <div class="page" id="login" v-else>
      <div class="weui_cells weui_cells_form">
        <div class="weui_cell">
          <div class="weui_cell_hd"><label class="weui_label">用户名</label></div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" type="email" placeholder="请输入用户名" v-model="email">
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_hd"><label class="weui_label">密码</label></div>
          <div class="weui_cell_bd weui_cell_primary">
            <input class="weui_input" type="password" placeholder="请输入密码" v-model="password">
          </div>
        </div>
      </div>
      <div class="weui_btn_area">
        <a class="weui_btn weui_btn_primary" @click="login">登陆</a>
      </div>
    </div>
  </div>
</template>

<script>
import sdk from './api/sdk'
import Voice from './components/Voice'
import vText from './components/Text'
import vImage from './components/Image'
import Wilddog from 'Wilddog'

const ref = new Wilddog('https://cast.wilddogio.com/')

export default {
  components: {Voice, vText, vImage},
  data () {
    return {
      uploading: false,
      msg: '正在加载中...',
      auth: false,
      email: '',
      password: ''
    }
  },
  created () {
    sdk.get((err) => {
      if (err) {
        console.log(err)
      } else {
        this.msg = '加载完成'
      }
    })
    const authData = ref.getAuth()
    console.log(authData)
    if (authData) {
      this.auth = true
    }
  },
  methods: {
    login () {
      ref.authWithPassword({
        email: this.email,
        password: this.password
      }, this.authHandler)
    },
    authHandler (err, authData) {
      if (authData) {
        this.auth = true
      } else {
        console.log(err)
      }
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
.page, body, .weui_textarea_counter {
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
#countdown {
  height: 1.5rem;
  background: rgba(60, 197, 31, 0.4);
  margin: 0 auto;
  text-align: center;
  line-height: 1.5rem;
  font-weight: bold;
  color: #fff;
  transition: all 1000ms;
}
.divider {
  width: 100%;
  height: 2px;
  background: #ddd;
  margin-top: 1rem;
}
#login {
  margin-top: 5rem;
}
#login .weui_label {
  min-width: 5em;
}
</style>
