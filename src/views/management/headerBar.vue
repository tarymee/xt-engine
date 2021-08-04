<template>
  <div class="app-header">
    <div class="app-header-logo">
      <img src="@/assets/img/logo2.png" />
    </div>
    <!-- <div class="app-header-time">{{date}} {{dayTime}}好</div> -->
    <div class="app-header-tit">运营平台</div>
    <div class="app-header-user">
      <el-dropdown
        size="small"
        @command="handleCommand"
      >
        <div class="app-header-user-con">
          <i class="el-icon-user-solid"></i>
          <span>{{ username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item
              icon="el-icon-lock"
              command="update"
            >
              修改密码
            </el-dropdown-item> -->
            <el-dropdown-item
              icon="el-icon-switch-button"
              command="loginOut"
            >
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div
      class="app-header-loginout el-icon-switch-button"
      title="退出登录"
      @click="loginOut"
    >
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="updateDialog"
    >
      <div class="info_content cl">
        <div class="info_line cl mb10">
          <label class="l">旧密码<span class="red">*</span>：</label>
          <div class="l inpt">
            <el-input
              v-model="oldpassword"
              type="password"
              :maxlength="20"
              placeholder="6-20个字符，区分大小写"
            ></el-input>
          </div>
        </div>
        <div class="info_line cl mb10">
          <label class="l">新密码<span class="red">*</span>：</label>
          <div class="l inpt">
            <el-input
              v-model="newpassword"
              type="password"
              :maxlength="20"
              placeholder="6-20个字符，区分大小写"
            ></el-input>
          </div>
        </div>
        <div class="info_line cl mb10">
          <label class="l">确认密码<span class="red">*</span>：</label>
          <div class="l inpt">
            <el-input
              v-model="confirmpassword"
              type="password"
              :maxlength="20"
              placeholder="6-20个字符，区分大小写"
            ></el-input>
          </div>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updatePsw"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        username: '管理员',
        updateDialog: false,
        oldpassword: '',
        newpassword: '',
        confirmpassword: ''
      }
    },
    created: function () {
      this.username = localStorage.getItem('username')
    },
    methods: {
      loginOut() {
        localStorage.removeItem('token')
        this.$router.replace('/')
      },
      handleCommand(command) {
        if (command === 'update') {
          this.updateDialog = true
        } else if (command === 'loginOut') {
          this.loginOut()
        }
      },
      check() {
        let ret = ''
        if (this.oldpassword === '') {
          ret = '请输入旧密码'
        } else if (this.newpassword === '') {
          ret = '请输入新密码'
        } else if (this.confirmpassword === '') {
          ret = '请输入确认密码'
        } else if (this.oldpassword.length < 6 || this.oldpassword.length > 20) {
          ret = '请输入6-20位字符的旧密码'
        } else if (this.newpassword.length < 6 || this.newpassword.length > 20) {
          ret = '请输入6-20位字符的新密码'
        } else if (this.newpassword !== this.confirmpassword) {
          ret = '新密码与确认密码不一致'
        }
        return ret
      },
      updatePsw() {
        let _this = this
        let msg = _this.check()
        if (msg === '') {
          _this.$http.post('/platserv/platAccount/updatePwd', {
            oldpassword: _this.oldpassword,
            newpassword: _this.newpassword
          }).then(res => {
            if (res.data.resp_data === 'ok') {
              _this.$message.success('修改密码成功！')
              _this.updateDialog = false
            } else {
              _this.$message.success('修改密码失败！')
            }
          }).catch(error => {
            let msg = (error.body && error.body.error_code) || error.statusText || error
            _this.$message.error(msg)
          })
        } else {
          _this.$message.warning(msg)
        }
      }
    }
  }
</script>

<style scoped>

</style>
