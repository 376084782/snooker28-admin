<template>
  <el-card>
    <el-row>
      <el-col :span="6">
        <el-input clearable v-model="input1" placeholder="根据名字关键字搜索">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="getList()" type="primary">搜索</el-button>
      </el-col>
    </el-row>
    <div class="config">
      <el-table :data="list">
        <el-table-column label="名称" prop="user_name"></el-table-column>
        <el-table-column label="uid" prop="id"></el-table-column>
        <el-table-column label="金币" prop="assets.golds"></el-table-column>
        <el-table-column label="高概率" prop="flag">
          <template #default="scope">
            <el-switch
              @change="toggleCheat(scope.row)"
              v-model="scope.row.flag"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="btn">
          <template #default="scope">
            <el-button @change="doKick(scope.row)">踢出</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="pageData.total"
        @current-change="getList"
        :page-size="10"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script lang="ts">
import { doAjax } from "@/utils/ajax";
import { ElMessage, ElMessageBox } from "element-plus";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class User extends Vue {
  doKick(data: any) {
    let uid = data.id;
    ElMessageBox.confirm(`是否确认踢出${data.user_name}`).then(async () => {
      await doAjax({
        url: "/user/kick",
        method: "post",
        data: {
          uid,
        },
      });
      ElMessage.success("操作成功！");
    });
  }
  pageData = {
    total: 0,
    page: 1,
  };
  list: any[] = [];
  input1 = "";
  async getList(p = 1) {
    let data: any = await doAjax({
      url: "/user/list",
      method: "post",
      data: { pageSize: 15, page: p, userName: this.input1 },
    });
    this.pageData.total = data.total;
    this.pageData.page = data.page;
    this.list = data.data;
  }
  mounted() {
    this.getList();
  }
  async toggleCheat(data: any) {
    await doAjax({
      url: "/user/toggleCheat",
      method: "post",
      data: { uid: data.id, flag: data.flag },
    });
  }
}
</script>
