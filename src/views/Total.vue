<template>
  <el-card>
    <div class="config">
      <el-row>
        <el-form inline label-width="80px">
          <el-form-item label="tag">
            <el-select v-model="form.tag" multiple>
              <el-option v-for="i in listOption" :label="i.label" :value="i.value" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始日期">
            <el-date-picker v-model="form.startDate" type="datetime" value-format="YYYY-MM-DD HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期">
            <el-date-picker v-model="form.endDate" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <p>该周期内 金币收支: {{data.golds}}</p>
      <!-- <p>该周期内 钻石收支: {{data.diamond}}</p> -->
    </div>
  </el-card>
</template>

<script lang="ts">
import { doAjax } from "@/utils/ajax";
import { ElMessageBox } from "element-plus";
import { Options, Vue } from "vue-class-component";
import moment from "moment";
@Options({
  components: {},
})
export default class Room extends Vue {
  flagLoading = false;
  data: any ={};
  lastForm: any = {};
  form: any = {
    page: 1,
    pageSize: 200
  };
  async getList() {
    this.flagLoading = true;
    this.lastForm = Object.assign({}, this.form);
    let res: any = await doAjax({
      url: "/asset/rank/total",
      method: "post",
      data: this.form,
    });
    this.flagLoading = false;
    this.data = res[0];
  }
  listOption: any = [];
  mounted() {
    let map: any = {
      10000: "游戏赢取",
      20000: "游戏失败",
      30000: "系统回收",
      40000: "礼物赠送",
      50000: "消费",
      60000: "活动领取",
      0: "其它",
    };
    for (let id in map) {
      this.listOption.push({
        label: map[id],
        value: +id,
      });
    }
  }
}
</script>