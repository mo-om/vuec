<template>
  <div class="login">
    <h1 class="app-name">{{appName}}</h1>
    <div class="login-box" :class="{'no-pointer-events': submitting}">
      <Form ref="userForm" :model="userForm" :rules="userRule" v-show="!secondFactor">
        <FormItem prop="username">
          <Input :maxlength="11" type="text" v-model="userForm.username" icon="ios-person" placeholder="手机号" autofocus></Input>
        </FormItem>
        <FormItem prop="password">
          <Input :maxlength="20" type="password" v-model="userForm.password" icon="ios-locked-outline" placeholder="密码"></Input>
        </FormItem>
        <Button type="primary" :loading="submitting" @click="handleGetSms('userForm')" long>
          <span v-if="!submitting">下一步</span>
          <span v-else>Loading...</span>
        </Button>
      </Form>
      <Form ref="otpForm" :model="otpForm" :rules="otpRule" v-show="secondFactor">
        <FormItem prop="otp">
          <Input type="text" v-model="otpForm.otp" icon="code" element-id="otp" placeholder="验证码"></Input>
        </FormItem>
        <Button type="primary" :loading="submitting" @click="handleLogin('otpForm')" long>
          <span v-if="!submitting">登 录</span>
          <span v-else>Loading...</span>
        </Button>
      </Form>
    </div>
    <Alert v-show="error" type="error" class="error">{{error}}</Alert>
  </div>
</template>

<script>
import axios from 'axios';
import { storageHelper } from 'utils';
import { appName, authToken, authMobile } from 'configs';

export default {

  data() {
    return {
      appName: appName,
      submitting: false,
      secondFactor: false,
      error: '',
      userForm: {
        username: '',
        password: '',
        otp: ''
      },
      otpForm: {
        otp: ''
      },
      userRule: {
        username: [
          { required: true, trigger: 'blur', message: '请填写手机号码' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请填写密码' }
        ]
      },
      otpRule: {
        otp: [
          { required: true, trigger: 'blur', message: '验证码' }
        ]
      }
    };
  },
  mounted() {

  },
  methods: {
    errorHanler(error) {
      this.error = error.message || error.error;
    },
    setSubmitState(state) {
      this.submitting = state;
    },
    handleGetSms (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        this.getSms()
      })
    },
    handleLogin (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        this.login()
      })
    },
    getSms() {
      this.setSubmitState(true);
      axios.post('sso/login', {
        username: this.userForm.username,
        password: this.userForm.password,
      },{ defineError: true })
        .then((res) => {
          this.error = '';
          this.secondFactor = true;
          this.setSubmitState(false);
          setTimeout(() => document.getElementById('otp').focus());
        })
        .catch((error) => {
          this.setSubmitState(false);
          this.errorHanler(error);
        })
    },
    login() {
      this.setSubmitState(true);
      axios.post('sso/second_factor', {...this.userForm,...this.otpForm}, { useOrigin: true })
        .then((res) => {
          const token = res.headers[authToken];
          const mobile = this.userForm.username;
          storageHelper.setItem(authToken, token, { expire: 0.5 });
          storageHelper.setItem(authMobile, mobile, { expire: 0.5 });
          this.setSubmitState(true);
          this.$router.push({ name: 'home'});
        })
        .catch((error) => {
          this.setSubmitState(false);
          this.errorHanler(error);
        })
    }
  }

};
</script>

<style lang="less">
  .login {
    text-align: center;
    padding: 10rem 0;
    width: 320px;
    margin: 0 auto;
    .login-box {
      background: #fff;
      border: 1px solid rgba(0,0,0,0.1);
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      border-radius: 0.25rem;
      padding: 2rem
    }
    .ivu-form-item {
      margin-bottom: 2rem
    }
  }
  .app-name, .login-box {
    margin-bottom: 1rem;
  }
</style>
