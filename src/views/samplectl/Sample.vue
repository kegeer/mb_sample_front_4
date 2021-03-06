<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" v-model="listQuery.name" placeholder="合作单位名称" style="width:180px"></el-input>
      <el-button class="filter-item" @click="handleFilter" type="primary" icon="search">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" style="margin-left: 10px" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" type="primary" icon="document">导出</el-button>
    </div>
    <el-table :key="tableKey" :data="list" border highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号">
        <template scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="谱元ID">
        <template scope="scope">
          <span class="link-type" @click="showEdit(scope.row)">{{ scope.row.pmid }}</span>
          <el-tag>{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="原始编号">
        <template scope="scope">
          <span>{{ scope.row.ori_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="样品状态">
        <template scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="测序类型">
        <template scope="scope">
          <span>{{ scope.row.sequence_method }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="引物">
        <template scope="scope">
          <span>{{ scope.row.primer }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="测序仪">
        <template scope="scope">
          <span>{{ scope.row.sequencer }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文库编号">
        <template scope="scope">
          <span>{{ scope.row.library }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="warning" @click="showEdit(scope.row)">修改</el-button>
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
      <el-form class="smapll-space" :model="temp" label-position="left" label-width="120px" style="width:600px; margin-left: 50px">
        <el-form-item label="所属批次">
          <el-select v-model="temp.batch_id" placeholder="选择来样批次">
            <el-option v-for="item in batchesList" :key="item.id" :label="item.deliver_time" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="temp.client_id" placeholder="选择所属客户">
            <el-option v-for="item in clientsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="谱元ID">
          <el-input v-model="temp.pmid"></el-input>
        </el-form-item>
        <el-form-item label="原始ID">
          <el-input v-model="temp.ori_num"></el-input>
        </el-form-item>
        <el-form-item label="样品量">
          <el-input placeholder="选择类型" v-model="temp.amount">
            <el-select v-model="temp.type_choice" slot="prepend" placeholder="选择">
              <el-option label="重量" value="1"></el-option>
              <el-option label="体积" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="测序方法" v-show="temp.id">
          <el-input v-model="temp.sequence_method"></el-input>
        </el-form-item>
        <el-form-item label="引物" v-show="temp.id">
          <el-input v-model="temp.primer"></el-input>
        </el-form-item>
        <el-form-item label="测序仪" v-show="temp.id">
          <el-input v-model="temp.sequencer"></el-input>
        </el-form-item>
        <el-form-item label="文库编号" v-show="temp.id">
          <el-input v-model="temp.library_id"></el-input>
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
  </div>
</template>

<script>
import { fetchList, createItem, updateItem, deleteItem, fetchSampleResults } from '@/api/samples'
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
        batch_id: null,
        client_id: null,
        pmid: '',
        ori_num: '',
        amount: 0,
        type_choice: '',
        sequence_method: 0,
        primer: 0,
        sequencer: 0,
        library_id: 0,
        remark: ''
      },
      textMap: {
        create: '创建',
        update: '更新'
      },
      dialogStatus: '',
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapGetters(['batchesList', 'clientsList'])
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions(['getBatchesList', 'getClientsList']),
    prepareList () {
      this.getBatchesList()
      this.getClientsList()
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
    handleFilter () {},
    handleCreate () {
      this.dialogStatus = 'create'
      this.prepareList()
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
      this.prepareList()
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
    handleFetchResults (row) {
      let id = row.id
      fetchSampleResults(id).then(res => {
        this.dialogSamplesVisible = true
        this.samplesData = res.data.data
      })
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        batch_id: null,
        client_id: null,
        pmid: '',
        ori_num: '',
        amount: 0,
        type_choice: '',
        sequence_method: 0,
        primer: 0,
        sequencer: 0,
        library_id: 0,
        remark: ''
      }
    }
  }
}
</script>

<style lang="css">
.el-select .el-input {
    width: 110px;
  }

</style>
