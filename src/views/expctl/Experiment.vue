<template lang="html">
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card class="box-card">
        <div class="item">
          <h3>文库情况</h3>
          <p>目前样本数: 100个</p>
          <p>已录入数据数: 20个</p>
        </div>
      </el-card>

    </el-col>
  </el-row>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    padding: 20px;
  }
  .box-card {
    width: 200px;
    margin-left: 20px;
    .item {
      padding: 10px 0;
    }
  }
</style>
