<template>
  <div class="page-login">
    <div class="area-center">
      <h3>登陆</h3>
      <el-form v-model="form" label-width="60px">
        <el-form-item label="账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="doLogin" type="primary" style="width: 400px">登陆</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { doAjax } from "@/utils/ajax";
import { ElMessageBox } from "element-plus";
import { Options, Vue } from "vue-class-component";
import "@/assets/scss/login.scss";
import store from "@/store";
@Options({
  components: {},
})
export default class Login extends Vue {
  form: any = {};
  mounted() { }
  async doLogin() {

    let res: any = await doAjax({
      url: "login",
      method: "post",
      data: this.form,
    });
    store.state.token = res.accessToken;

    store.state.token = res.accessToken;
    localStorage.setItem("token_snooker28", res.accessToken);
    this.$router.push({ path: "/count" });
  }
}
</script>
