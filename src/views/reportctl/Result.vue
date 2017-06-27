<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" v-model="listQuery.name" placeholder="合作单位名称" style="width:180px"></el-input>
      <el-button class="filter-item" @click="handleFilter" type="primary" icon="search">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" style="margin-left: 10px" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" type="primary" icon="document">导出</el-button>
    </div>
    <el-table :key="tableKey" :data="list" border highlight-current-row style="width: 100%">
      <el-table-column label="生成时间">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="样品谱元ID">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.sample_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报告状态">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核员">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.auditor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核时间">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.auditor_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预览并审核">
        <template align="center" width="65" scope="scope">
          <span class="link-type" @click="handlePreview(scope.row)">打开</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="warning" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagintion-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, next, pager, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
    :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"  @close="resetTemp">
      <el-form class="smapll-space" :model="temp" label-position="left" label-width="70px" style="width:400px; margin-left: 50px">
        <el-form-item label="名称">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="create">确定</el-button>
        <el-button v-else type="primary" @click="update">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="子项表格" :visible.sync="dialogSubprojectsVisible" size="small">
      <el-table :data="subprojectsData" border fit highlight-current-row style="width: 100%">
         <el-table-column prop="name" label="子项目名称"> </el-table-column>
     </el-table>
    </el-dialog>
    <el-dialog title="预览并审核报告" :visible.sync="dialogPreviewVisible" size="small">
      <el-table :data="reportContents" border fit highlight-current-row style="width: 100%">
         <el-table-column prop="name" label="子项目名称"> </el-table-column>
     </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createItem, updateItem, deleteItem } from '@/api/results'
export default {
  data () {
    return {
      list: null,
      total: 0,
      tableKey: 0,
      listQuery: {
        name: '',
        page: 1,
        limit: 20
      },
      listLoading: true,
      temp: {
        id: undefined,
        name: ''
      },
      textMap: {
        create: '创建',
        update: '更新'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dialogSubprojectsVisible: false,
      subprojectsData: [],
      dialogPreviewVisible: false,
      reportContents: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.map(v => {
          v.edit = false
          return v
        })
        this.listLoading = false
      })
    },
    handleFilter () {},
    handleCreate () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleDownload () {},
    handleSizeChange () {},
    handleCurrentChange () {},
    create () {
      createItem(this.temp).then(res => {
        this.dialogFormVisible = false
        this.getList()
        this.resetTemp()
      })
    },
    showEdit (row) {
      this.dialogStatus = 'update'
      this.temp = row
      this.dialogFormVisible = true
    },
    update () {
      let id = this.temp.id
      let data = this.temp
      updateItem(id, data).then(res => {
        this.dialogFormVisible = false
        this.getList()
        this.resetTemp()
      })
    },
    remove (id) {
      deleteItem(id).then(res => {
        this.getList()
      })
    },
    handlePreview (row) {
      this.dialogPreviewVisible = true
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        name: ''
      }
    }
  }
}
</script>

<style lang="css">
</style>
