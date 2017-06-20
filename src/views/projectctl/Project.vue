<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" v-model="listQuery.name" placeholder="合作单位名称" style="width:180px"></el-input>
      <el-button class="filter-item" @click="handleFilter" type="primary" icon="search">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" style="margin-left: 10px" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" type="primary" icon="document">导出</el-button>
    </div>
    <el-table :key="tableKey" :data="list" border highlight-current-row style="width: 100%">
      <el-table-column type="expand">
        <template scope="scope">
          <p>总样品数: {{ scope.row.total_samples }}</p>
          <p>样品来源: {{ scope.row.sample_source }}</p>
          <p>样品类型: {{ scope.row.samples_type }}</p>
          <p>本项目样品识别码: {{ scope.row.sample_code }}</p>
          <p>已完成样品数: {{ scope.row.completed_samples }}</p>
          <p>未完成样品数: {{ scope.row.in_progress_sample }}</p>
        </template>
      </el-table-column>

      <el-table-column label="序号">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="子项目名称">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属项目">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.project_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密级">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优先级">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.privilege }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目简要概述">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目负责人">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.p_manager }}</span>
        </template>
      </el-table-column>
      <el-table-column label="信息负责人">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.info_manager }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目管理">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.manage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进展与问题	">
        <template align="center" width="65" scope="scope">
          <span class="link-type" @handleProjectProblems(scope.row.problems)>{{ scope.row.problems }}</span>
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
  </div>
</template>

<script>
import { fetchList } from '@/api/sub_project_table'
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
    update () {},
    handleProjectProblems (item) {}
  }
}
</script>

<style lang="css">
</style>
