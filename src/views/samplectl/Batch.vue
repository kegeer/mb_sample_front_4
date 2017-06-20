<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" v-model="listQuery.name" placeholder="合作单位名称" style="width:180px"></el-input>
      <el-button class="filter-item" @click="handleFilter" type="primary" icon="search">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" style="margin-left: 10px" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" type="primary" icon="document">导出</el-button>
    </div>
    <el-table :key="tableKey" :data="list" border highlight-current-row style="width: 100%">
      <el-table-column label="序号">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属机构">
        <template align="center" width="40" scope="scope">
          <span>{{ scope.row.agency_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人">
        <template align="center" width="40" scope="scope">
          <span>{{ scope.row.contact_id }}</span>
        </template>
      </el-table-column>


      <el-table-column label="寄送时间">
        <template align="center" width="120" scope="scope">
          <span>{{ scope.row.deliver_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到达时间">
        <template align="center" width="120" scope="scope">
          <span>{{ scope.row.arrive_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="快递单号">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.express_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库时间">
        <template align="center" width="120" scope="scope">
          <span>{{ scope.row.store_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存储位置及温度">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.position_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目编号">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.project_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="技术路线">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.roadmap_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleModifyStatus(scope.row, 'close')">关闭</el-button>
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
    :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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

    <!-- TODO 次级页面都添加dialog弹出框 -->
  </div>
</template>

<script>
import { fetchList } from '@/api/batch_table'
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
      dialogFormVisible: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response.data)
        this.list = response.data.items
        this.total = response.data.total
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
    create () {},
    update () {}
  }
}
</script>

<style lang="css">
</style>
