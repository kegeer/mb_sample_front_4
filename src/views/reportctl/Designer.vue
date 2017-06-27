<template lang="html">
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">

            <template v-for="item in modules" class="item">
              <el-card class="box-card" style="margin-top: 12px;">
                <el-button size="small" type="primaryu" @click="remove(item)" icon="delete" style="float: right;"></el-button>
                <h1>{{ item.title }}</h1>
                <p>{{ item.description }}</p>
                <p>{{ item.content }}</p>
              </el-card>
            </template>

        <el-button type="primary" size="small" @click="addModule" style="float: right;margin-top: 12px;">添加模块</el-button>

        </div>
      </el-col>
    </el-row>

    <el-dialog
    :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"  @close="resetTemp">
      <el-form class="smapll-space" :model="temp" label-position="left" label-width="70px" style="width:400px; margin-left: 50px">
        <el-form-item label="标题">
          <el-input type="textarea" v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="temp.description"></el-input>
        </el-form-item>
        <el-form-item label="数据内容">
          <el-input v-model="temp.content"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="create">确定</el-button>
        <el-button v-else type="primary" @click="update">确定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="子项表格" :visible.sync="dialogSubprojectsVisible" size="small">
      <el-table :data="subprojectsData" border fit highlight-current-row style="width: 100%">
         <el-table-column prop="name" label="子项目名称"> </el-table-column>
     </el-table>
    </el-dialog> -->
  </div>
</template>

<script>
// import { fetchList } from '@/api/templates'
export default {
  data () {
    return {
      modules: [
        {
          title: '测试标题',
          description: '对于百度的现状，外界有种种解读。一些媒体将它归咎于错过了移动互联网时代，从此掉队；另外一种说法聚焦于百度的管理，认为创始人李彦宏大权独揽，管理层很难发挥作用；派系斗争也被认为是百度无法取得好成绩的重要原因',
          content: '他要为百度寻找下一个千亿美金市值的路径'
        }
      ],
      temp: {
        // order: null,
        title: '',
        description: '',
        content: ''
      },
      textMap: {
        create: '创建',
        update: '更新'
      },
      dialogStatus: '',
      dialogFormVisible: false
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    // getList () {
    //   this.listLoading = true
    //   fetchList(this.listQuery).then(response => {
    //     console.log(response.data)
    //     this.list = response.data.items
    //     this.total = response.data.total
    //     this.listLoading = false
    //   })
    // },
    handleFilter () {},
    handleCreate () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleDownload () {},
    handleSizeChange () {},
    handleCurrentChange () {},
    create () {
      this.modules.push(this.temp)
      this.dialogFormVisible = false
      this.resetTemp()
    },
    showEdit (row) {
      this.dialogStatus = 'update'
      this.temp = row
      this.dialogFormVisible = true
    },
    update () {
    },
    remove (item) {
      let index = this.modules.indexOf(item)
      if (index !== -1) {
        this.modules.splice(index, 1)
      }
    },
    resetTemp () {
      this.temp = {
        title: '',
        description: '',
        content: ''
      }
    },
    addModule () {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    }
  }
}
</script>

<style lang="scss" scope>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
