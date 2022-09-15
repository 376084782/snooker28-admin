<template>
  <el-card>
    <div class="config">
      <h3>28在线玩家总数:{{ count }}</h3>
      <el-row>
        <el-form inline label-width="80px">
          <el-form-item label="tag">
            <el-select v-model="form.tag">
              <el-option
                v-for="i in listOption"
                :label="i.label"
                :value="i.value"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.date"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="范围">
            <el-select v-model="form.timeType">
              <el-option label="时" value="hours"></el-option>
              <el-option label="天" value="days"></el-option>
              <el-option label="月" value="months"></el-option>
              <el-option label="年" value="years"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="getList">搜索</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="flagLoading" :data="listData">
          <el-table-column
            label="user_name"
            prop="user[0].user_name"
          ></el-table-column>
          <el-table-column
            label="ip_address"
            prop="user[0].ip_address"
          ></el-table-column>
          <el-table-column
            label="device_id"
            prop="user[0].device_id"
          ></el-table-column>
          <el-table-column label="是否在线" prop="isOnline"> </el-table-column>
          <el-table-column label="财产" prop="golds">
            <template #default="scope">
              {{ getGold(scope.row) }}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
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
  listData: any = [];
  lastForm: any = {};
  form = {
    tag: 30000,
    date: "2022-04-11 14:30:00",
    timeType: "days",
  };
  async getList() {
    this.flagLoading = true;
    this.lastForm = Object.assign({}, this.form);
    let res: any = await doAjax({
      url: "/asset/rank",
      method: "post",
      data: this.form,
    });
    this.flagLoading = false;
    this.listData = res;
    console.log(res,'resresres')
  }
  count = 0;
  async getCountOnline() {
    let num: any = await doAjax({
      url: "/user/online/count",
      method: "get",
    });
    this.count = num;
  }
  getGold(d: any) {
    if (!d) {
      return {};
    }
    let res = Object.assign({}, d);
    if (res["counter_data"]) {
      res = res["counter_data"];
    }
    if (res["" + this.lastForm.tag]) {
      res = res["" + this.lastForm.tag];
    }
    if (res[this.lastForm.timeType]) {
      res = res[this.lastForm.timeType];
    }
    let dd = {};
    for (let key in res) {
      dd = res[key];
    }
    return dd;
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
    this.form.date = moment().format("YYYY-MM-DD HH:mm:ss");
    this.getCountOnline();
  }
}
</script>