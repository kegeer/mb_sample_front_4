<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.pmid" placeholder="谱元ID" @keyup.enter.native="handleFilter" style="width:200px"></el-input>

      <el-select class="filter-item" v-model="listQuery.type" placeholder="请选择类型" clearable style="width:90px">
        <el-option v-for="item in typeOptions" :label="item.display_name" :key="item.key" :value="item.key"></el-option>
      </el-select>

      <el-select class="filter-item" v-model="listQuery.status" placeholder="请选择样品状态" clearable style="width:90px">
        <el-option v-for="item in statusOptions" :label="item.display_name" :key="item.key" :value="item.key"></el-option>
      </el-select>

      <el-select class="filter-item" v-model="listQuery.sequenceMethod" placeholder="请选择测序类型" clearable style="width:90px">
        <el-option v-for="item in sequenceMethodOptions" :label="item.display_name" :key="item.key" :value="item.key"></el-option>
      </el-select>

      <el-select class="filter-item" clearable style="width: 90px" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :label="item.label" :key="item.key" :value="item.key"></el-option>
      </el-select>

      <el-button class="filter-item" type="primary" @click="handleFilter" icon="search">搜索</el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate" icon="edit" style="margin-left: 10px">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" icon="document" type="primary">导出</el-button>
    </div>

    <el-table v-loading.body="listLoading" :key="tableKey" :data="list" border highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="谱元ID" width="180">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.pmid }}</span>
          <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="原始编号" width="180">
        <template scope="scope">
          <span>{{ scope.row.ori_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="样品状态" width="80">
        <template scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="测序类型" width="80">
        <template scope="scope">
          <span>{{ scope.row.sequence_method }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="引物" width="80">
        <template scope="scope">
          <span>{{ scope.row.primer }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="测序仪" width="80">
        <template scope="scope">
          <span>{{ scope.row.sequencer }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文库编号" width="80">
        <template scope="scope">
          <span>{{ scope.row.library }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="warning" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagiantion-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style="width:400px; margin-left: 50px">
        <el-form-item label="谱元ID">
          <el-input v-model="temp.pmid" placeholder="谱元ID"></el-input>
        </el-form-item>
        <el-form-item label="原始编号">
          <el-input v-model="temp.ori_num" placeholder="原始编号"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="create">创建</el-button>
        <el-button v-else type="info" @click="update">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/sample_table'

const typeOptions = [
  {key: 1, display_name: '粪便'},
  {key: 2, display_name: '唾液'},
  {key: 3, display_name: '呼吸道'}
]
const statusOptions = [
  {key: 1, display_name: '液样'},
  {key: 2, display_name: '固体'},
  {key: 3, display_name: 'DNA'}
]
const sequenceMethodOptions = [
  {key: 1, display_name: 'v3-v4'},
  {key: 2, display_name: 'v3'},
  {key: 3, display_name: 'v4'}
]
const sortOptions = [
  {label: '按升序排列', key: '+id'},
  {label: '按降序排列', key: '-id'}
]

const typeKeyValue = typeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'table_sample',
  data () {
    return {
      list: null,
      total: 0,
      listLoading: true,
      tableKey: 0,
      listQuery: {
        pmid: undefined,
        type: undefined,
        status: undefined,
        sequenceMethod: undefined,
        sort: '+id',
        page: 1,
        limit: 20
      },
      typeOptions,
      statusOptions,
      sequenceMethodOptions,
      sortOptions,
      temp: {
        id: undefined,
        pmid: null,
        ori_num: null
      },
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogStatus: '',
      dialogFormVisible: false
    }
  },
  created () {
    this.getList()
  },
  filters: {
    typeFilter (type) {
      return typeKeyValue[type]
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
        console.log(res)
      })
    },
    handleFilter () {
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate (row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete (row) {
      this.$notify({
        type: 'success',
        title: '成功',
        message: '删除成功',
        duration: 2000
      })
      let index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleDownload () {

    },
    create () {
      this.temp.id = parseInt(Math.random() * 100) + 1024
      this.list.unshift(this.temp)
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success',
        duration: 2000
      })
    },
    update () {
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf()
          this.list.splice(index, 1, this.temp)
          break
        }
      }

      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        pmid: null,
        ori_num: null
      }
    }
  }
}
</script>

<style lang="css">
</style>
