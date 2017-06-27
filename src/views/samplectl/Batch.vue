<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" v-model="listQuery.name" placeholder="合作单位名称" style="width:180px"></el-input>
      <el-button class="filter-item" @click="handleFilter" type="primary" icon="search">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" style="margin-left: 10px" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" type="primary" icon="document">导出</el-button>
    </div>
    <el-table :key="tableKey" :data="list" border highlight-current-row style="width: 100%">

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

      <el-table-column label="样品信息">
        <template align="center" width="65" scope="scope">
          <span class="link-type" @click="handleFetchSamples(scope.row)">查看样品信息</span>
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
      <el-form class="smapll-space" :model="temp" label-position="left" label-width="120px" style="width:400px; margin-left: 50px">
        <el-form-item label="所属机构">
          <el-select @change='clearContact' v-model="temp.agency_id" placeholder="选择合作伙伴">
            <el-option v-for="item in agenciesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="联系人信息">
          <el-select v-model="temp.contact_id" placeholder="选择联系人">
            <el-option v-for="item in contactsList" :key="item.id" :label="item.name" :value="item.id" v-show="item.agency_id === temp.agency_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="寄送时间">
          <el-date-picker v-model="temp.deliver_time" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH-mm-ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到达时间">
          <el-date-picker v-model="temp.arrive_time" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="temp.express_num"></el-input>
        </el-form-item>
        <el-form-item label="入库时间">
          <el-date-picker v-model="temp.store_time" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="存储位置及温度">
          <el-select v-model="temp.position_id" placeholder="选择合作伙伴">
            <el-option v-for="item in positionsList" :key="item.id" :label="item.position + '/' + item.tempr" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select v-model="temp.project_id" placeholder="选择合作伙伴">
            <el-option v-for="item in projectsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技术路线">
          <el-select v-model="temp.roadmap_id" placeholder="选择合作伙伴">
            <el-option v-for="item in roadmapsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="temp.remark"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="create">确定</el-button>
        <el-button v-else type="primary" @click="update">确定</el-button>
      </div>
    </el-dialog>

    <!-- TODO 次级页面都添加dialog弹出框 -->
    <el-dialog title="合作单位批次信息" :visible.sync="dialogSamplesVisible" size="small">
       <el-table :data="samplesData" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="pmid" label="谱元编号"> </el-table-column>
          <el-table-column prop="ori_num" label="原始编号"> </el-table-column>
          <el-table-column label="样品量">
            <template scope="scope">
              <span>{{ scope.row.amount + '/' + scope.row.type }}</span>
            </template>
          </el-table-column>
      </el-table>
    </el-dialog >
  </div>
</template>

<script>
import { fetchList, createItem, updateItem, deleteItem, fetchBatchSamples } from '@/api/batches'
import { mapGetters, mapActions } from 'vuex'
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
        agency_id: undefined,
        contact_id: undefined,
        deliver_time: undefined,
        arrive_time: undefined,
        express_num: '',
        store_time: '',
        position_id: undefined,
        project_id: undefined,
        roadmap_id: undefined,
        remark: ''
      },
      textMap: {
        create: '创建',
        update: '更新'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dialogSamplesVisible: false,
      samplesData: []
    }
  },
  computed: {
    ...mapGetters(['agenciesList', 'contactsList', 'projectsList', 'roadmapsList', 'positionsList'])
  },
  created () {
    this.prepareList()
    this.getList()
  },
  methods: {
    ...mapActions(['getAgenciesList', 'getContactsList', 'getProjectsList', 'getRoadmapsList', 'getPositionsList']),
    prepareList () {
      this.getAgenciesList()
      this.getContactsList()
      this.getProjectsList()
      this.getRoadmapsList()
      this.getPositionsList()
    },
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
    clearContact () {
      this.temp.contact_id = undefined
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
      console.log(this.temp)
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
    handleFetchSamples (row) {
      let id = row.id
      fetchBatchSamples(id).then(res => {
        this.dialogSamplesVisible = true
        this.samplesData = res.data.data
      })
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        agency_id: undefined,
        contact_id: undefined,
        deliver_time: undefined,
        arrive_time: undefined,
        express_num: '',
        store_time: '',
        position_id: undefined,
        project_id: undefined,
        roadmap_id: undefined,
        remark: ''
      }
    }
  }
}
</script>

<style lang="css">
</style>
