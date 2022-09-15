<template>
  <el-card>
    <el-row>
      <el-button @click="goAdd()" type="primary">新增黑名单</el-button>
    </el-row>
    <div class="config">
      <el-table :data="list">
        <el-table-column label="ip" prop="ip"></el-table-column>
        <el-table-column label="操作" prop="btn">
          <template #default="scope">
            <el-button @click="addBlack(false,scope.row.ip)">解封</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <el-dialog center title="新增黑名单" v-model="showAdd">
    <el-form label-width="100px">
      <el-form-item label="ip">
        <el-input v-model="dataAdd.ip"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="doAdd">封禁</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { doAjax } from "@/utils/ajax";
import { ElMessage, ElMessageBox } from "element-plus";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class User extends Vue {
  showAdd = false
  dataAdd: any = {}
  goAdd() {
    this.dataAdd = {}
    this.showAdd = true;
  }
  doAdd() {
    ElMessageBox.confirm(`是否确认封禁ip：${this.dataAdd.ip}`).then(async () => {
      await doAjax({
        url: "/ip/ban",
        method: "post",
        data: {
          flag: true,
          ip: this.dataAdd.ip
        },
      });
      this.showAdd = false;
      ElMessage.success("操作成功！");
      this.getList();

    });

  }
  addBlack(flag: boolean, ip: any) {
    ElMessageBox.confirm(`是否确认${flag ? '封禁' : '解封'}ip：${ip}`).then(async () => {
      await doAjax({
        url: "/ip/ban",
        method: "post",
        data: {
          flag,
          ip
        },
      });
      this.getList();
      ElMessage.success("操作成功！");
    });
  }
  doKick(data: any) {
    let uid = data.id;
  }
  list: any[] = [];
  input1 = "";
  async getList(p = 1) {
    let data: any = await doAjax({
      url: "/ban/list",
      method: "post",
      data: {},
    });
    console.log(data, 'dddd')
    this.list = data;
  }
  mounted() {
    this.getList();
  }
}
</script>
