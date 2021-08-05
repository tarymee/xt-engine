<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login-baner"></div>
      <div class="login">
        <div class="login-logo">
          <img
            src="@/assets/img/logo.png"
            alt="玄武科技"
          />
          <div class="login-logo-tit">智慧100-运营平台</div>
        </div>
        <!-- @:submit.native.prevent="onSubmit" -->
        <el-form
          ref="form"
          :model="loginData"
          label-width="0px"
        >
          <el-form-item class="login-input">
            <el-input
              v-model="loginData.username"
              prefix-icon="el-icon-user"
              placeholder="帐号"
            ></el-input>
          </el-form-item>
          <el-form-item class="login-input">
            <el-input
              v-model="loginData.password"
              prefix-icon="el-icon-lock"
              placeholder="密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginData.remember">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="login-button">
            <!-- native-type="submit" -->
            <el-button
              type="primary"
              round
              size="medium"
              @click="onSubmit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { loading, utils } from '@xt/service'
  console.log(loading)
  export default {
    data() {
      return {
        loginData: {
          username: '',
          password: '',
          remember: ''
        }
      }
    },
    created() {
      this.loginData.username = localStorage.getItem('username') || ''
      this.loginData.password = localStorage.getItem('password') || ''
      this.loginData.remember = localStorage.getItem('remember') === '1'
    },
    methods: {
      onCheck(e) {
        console.log(e)
        this.loginData.remember = e.target.checked
      },
      onSubmit(e) {
        // debugger
        // console.log(e)
        // e.preventDefault()
        // console.log(this.loginData)

        let username = this.loginData.username
        let password = this.loginData.password
        if (!username) {
          this.$message.error('请填写帐号！')
          return
        } else if (!password) {
          this.$message.error('请填写密码！')
          return
        } else {
          loading.open()
          this.$http.post(`/platserv/auth/login`, {
            username: username,
            password: password,
          }, {
            headers: {
              // 请求头配置
              req_id: '333',
              app_id: '2'
            }
          }).then(response => {
            // 验证成功
            if (response.ok) {
              let token = response.data.resp_data.token
              if (token) {
                localStorage.setItem('token', token)
              }

              // 记住密码
              localStorage.setItem('username', username)
              if (this.loginData.remember) {
                localStorage.setItem('password', password)
                localStorage.setItem('remember', this.loginData.remember ? '1' : '0')
              } else {
                localStorage.removeItem('password')
                localStorage.removeItem('remember')
              }

              this.$router.replace('/management/enterprise')
            }
          }).catch((err) => {
            utils.errorMessage(err)
          }).finally(() => {
            loading.close()
          })
        }
      }
    }
  }
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(270deg, #495FFF, #99D2FF);
    /* background-image: radial-gradient(#99D2FF, #495FFF); */
    /* background-image: url(img/bg.jpg); */
    background-image: url(~@/assets/img/login-bg.jpg);
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    overflow: auto;
  }

  .login-wrap {
    overflow: hidden;
    width: 800px;
    height: 500px;
    margin: 20vh auto 10vh;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    position: relative;
    box-shadow: 0 20px 20px 0 rgba(8, 53, 96, 0.15);
    display: flex;
  }

  .login-baner {
    flex: none;
    width: 375px;
    height: 500px;
    background-image: url(~@/assets/img/login-banner.jpg);
    opacity: 0.9;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .login {
    flex: 1;
    padding: 50px;
    position: relative;
  }

  .login-logo {
    margin: 0px auto 20px;
    overflow: hidden;
  }

  .login-logo img {
    margin: 0 auto 10px;
    display: block;
    height: 80px;
  }

  .login-logo-tit {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }


</style>

<style>
  .login-input .el-input__inner {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #333;
    border-radius: 0;
    color: #333;
  }
  .login-input .el-input__inner::placeholder {
    color: #999;
  }
  .login-input .el-input__prefix, .login-input .el-input .el-input__clear {
    color: #333;
  }

  .login-button .el-button {
    width: 100%;
    display: block;
  }
</style>
