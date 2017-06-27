<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" v-model="listQuery.name" placeholder="合作单位名称" style="width:180px"></el-input>
      <el-button class="filter-item" @click="handleFilter" type="primary" icon="search">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" style="margin-left: 10px" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" type="primary" icon="document">导出</el-button>
    </div>
    <el-table :key="tableKey" :data="list" border highlight-current-row style="width: 100%">
      <el-table-column label="中文名称">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.c_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="英文名称">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.e_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="解释">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参考最小值">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.ref_min }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参考最大值">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.ref_max }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据解读">
        <template align="center" width="65" scope="scope">
          <span class="link-type" @click="handleFetchInfoRefs(scope.row)">
            查看
          </span>
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
    <el-dialog title="数据解读表" :visible.sync="dialogInfoRefsVisible" size="small">
      <el-table :data="subprojectsData" border fit highlight-current-row style="width: 100%">
         <el-table-column prop="name" label="子项目名称"> </el-table-column>
     </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createItem, updateItem, deleteItem } from '@/api/infos'
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
      dialogInfoRefsVisible: false
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
      })
    },
    remove (id) {
      deleteItem(id).then(res => {
        this.getList()
      })
    },
    handleFetchInfoRefs (row) {
      this.dialogInfoRefsVisible = true
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
