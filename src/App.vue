



<template>
  <div class="tac">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="menu"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
    >
      <el-menu-item index="/room">
        <el-icon><icon-menu /></el-icon>
        <span>房间配置</span>
      </el-menu-item>
      <el-menu-item index="user">
        <el-icon><icon-menu /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    const handleOpen = (key: any, keyPath: any) => {
      
      console.log(key, keyPath);
    };
    const handleClose = (key: any, keyPath: any) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
    };
  },
});
</script>
<style lang="scss">
.tac {
  height: 100%;
  display: flex;
  flex-direction: row;
  .main {
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }
}
body,
html {
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
