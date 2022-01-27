<template>
  <el-card>
    <div class="config">
      <el-table :data="list">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="底注" prop="basicChip"></el-table-column>
        <el-table-column label="加注列表" prop="chipList"></el-table-column>
        <el-table-column label="茶水费" prop="teaMoney"></el-table-column>
        <el-table-column label="最低入场" prop="min"></el-table-column>
        <el-table-column label="最高入场" prop="max"></el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button type="primary" @click="doShowEdit(scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog center title="编辑" v-model="showEdit">
        <el-form label-width="100px">
          <el-form-item label="名称">
            <el-input v-model="selectedData.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="底注">
            <el-input v-model="selectedData.basicChip"></el-input>
          </el-form-item>
          <el-form-item label="加注列表">
            <el-input v-model="selectedData.chipList"></el-input>
          </el-form-item>
          <el-form-item label="茶水费">
            <el-input v-model="selectedData.teaMoney"></el-input>
          </el-form-item>
          <el-form-item label="最低入场">
            <el-input v-model="selectedData.min"></el-input>
          </el-form-item>
          <el-form-item label="最高入场">
            <el-input v-model="selectedData.max"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" @click="doSubmit">修改</el-button>
        </template>
      </el-dialog>
    </div>
  </el-card>
</template>

<script lang="ts">
import { doAjax } from "@/utils/ajax";
import { ElMessageBox } from "element-plus";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class Room extends Vue {
  showEdit = false;
  selectedData = {};
  list: any[] = [];
  doShowEdit(data: any) {
    this.selectedData = Object.assign({}, data);
    this.showEdit = true;
  }
  async doSubmit() {
    await doAjax({
      url: "/room/update",
      method: "post",
      data: this.selectedData,
    });
    ElMessageBox.alert("修改成功");
    this.showEdit = false;
    this.getList();
  }
  async getList() {
    let res: any = await doAjax({
      url: "/room/list",
      method: "get",
      params: {},
    });
    this.list = res.data.data;
  }
  mounted() {
    this.getList();
  }
}
</script>
