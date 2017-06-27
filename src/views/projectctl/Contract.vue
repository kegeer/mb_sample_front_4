<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" v-model="listQuery.name" placeholder="合作单位名称" style="width:180px"></el-input>
      <el-button class="filter-item" @click="handleFilter" type="primary" icon="search">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" style="margin-left: 10px" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" type="primary" icon="document">导出</el-button>
      <el-button class="filter-item" @click="handleOpenSequenceType" type="primary" icon="menu">测序类型表</el-button>
      <el-button class="filter-item" @click="handleOpenSequenceArea" type="primary" icon="menu">测序区域表</el-button>
      <el-button class="filter-item" @click="handleOpenSequenceSize" type="primary" icon="menu">测序数据量表</el-button>
    </div>
    <el-table :key="tableKey" :data="list" border highlight-current-row style="width: 100%">
      <el-table-column label="合同编号">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同名称">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="签订时间">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.sign_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="合同启动时间">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.start_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="合同截止时间">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.end_date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地区">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.area }}</span>
        </template>
      </el-table-column>

      <el-table-column label="合作单位">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.agency_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="合作方联系人">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.contact_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品类别">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.product_type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="测序区域">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.sequence_area }}</span>
        </template>
      </el-table-column>

      <el-table-column label="测序类型">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.sequence_type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数据量">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.sequence_data }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="default" @click="showEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="remove(scope.row.id)">删除</el-button>
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
    :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close="resetTemp">
      <el-form class="smapll-space" :model="temp" label-position="left" label-width="120px" style="width:600px; margin-left: 50px">
        <el-form-item label="合同名称">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="签订时间">
          <el-date-picker v-model="temp.sign_date" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同启动时间">
          <el-date-picker v-model="temp.start_date" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同截止时间">
          <el-date-picker v-model="temp.end_date" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="temp.area"></el-input>
        </el-form-item>
        <el-form-item label="合作单位">
          <el-select @change='clearContact' v-model="temp.agency_id" placeholder="选择合作伙伴">
            <el-option v-for="item in agenciesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作方联系人">
          <el-select v-model="temp.contact_id" placeholder="选择联系人">
            <el-option v-for="item in contactsList" :key="item.id" :label="item.name" :value="item.id" v-show="item.agency_id === temp.agency_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类别">
          <el-input v-model="temp.product_type"></el-input>
        </el-form-item>
        <el-form-item label="测序区域">
          <el-input v-model="temp.sequence_area"></el-input>
        </el-form-item>
        <el-form-item label="测序类型">
          <el-input v-model="temp.sequence_type"></el-input>
        </el-form-item>
        <el-form-item label="数据量">
          <el-input v-model="temp.sequence_data"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="create">确定</el-button>
        <el-button v-else type="primary" @click="update">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="测序类型表" size="small" :visible.sync="dialogSequenceTypeVisible">
      <el-table :data="sequenceTypesData" border fit highlight-current-row style="width: 100%">
         <el-table-column prop="name" label="名称"> </el-table-column>
     </el-table>
    </el-dialog>
    <el-dialog title="测序数据大小表" size="small" :visible.sync="dialogSequenceSizeVisible">
      <el-table :data="sequenceSizesData" border fit highlight-current-row style="width: 100%">
         <el-table-column prop="name" label="名称"> </el-table-column>
     </el-table>
    </el-dialog>
    <el-dialog title="测序区域表" size="small" :visible.sync="dialogSequenceAreaVisible">
      <el-table :data="sequenceAreasData" border fit highlight-current-row style="width: 100%">
         <el-table-column prop="name" label="名称"> </el-table-column>
     </el-table>
    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { fetchList, createItem, updateItem, deleteItem } from '@/api/contracts'
import { fetchList as fetchStList, createItem as createStList, updateItem as updateStList, deleteItem as deleteStList } from '@/api/sequenceTypes'
import { fetchList as fetchSsList, createItem as createSsList, updateItem as updateSsList, deleteItem as deleteSsList } from '@/api/sequenceSizes'
import { fetchList as fetchSaList, createItem as createSaList, updateItem as updateSaList, deleteItem as deleteSaList } from '@/api/sequenceAreas'
import { mapActions, mapGetters } from 'vuex'
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
        name: '',
        sign_date: null,
        start_date: null,
        end_date: null,
        area: '',
        agency_id: null,
        contact_id: null,
        product_type: null,
        sequence_area: null,
        sequence_type: null,
        sequence_data: null
      },
      textMap: {
        create: '创建',
        update: '更新'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dialogSequenceTypeVisible: false,
      dialogSequenceSizeVisible: false,
      dialogSequenceAreaVisible: false,
      sequenceTypesData: [],
      sequenceSizesData: [],
      sequenceAreasData: []
    }
  },
  created () {
    this.prepareList()
    this.getList()
  },
  computed: {
    ...mapGetters(['agenciesList', 'contactsList'])
  },
  methods: {
    ...mapActions(['getAgenciesList', 'getContactsList']),
    prepareList () {
      this.getAgenciesList()
      this.getContactsList()
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
    handleOpenSequenceType () {
      this.dialogSequenceTypeVisible = true
      fetchStList().then(res => {
        this.sequenceTypesData = res.data.data.map(v => {
          v.edit = false
        })
      })
    },
    handleOpenSequenceSize () {
      this.dialogSequenceSizeVisible = true
      fetchSsList().then(res => {
        this.sequenceSizesData = res.data.data.map(v => {
          v.edit = false
        })
      })
    },
    handleOpenSequenceArea () {
      this.dialogSequenceAreaVisible = true
      fetchSaList().then(res => {
        this.sequenceAreasData = res.data.data.map(v => {
          v.edit = false
        })
      })
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        name: '',
        sign_date: null,
        start_date: null,
        end_date: null,
        area: '',
        agency_id: null,
        contact_id: null,
        product_type: null,
        sequence_area: null,
        sequence_type: null,
        sequence_data: null
      }
    }
  }
}
</script>

<style lang="css">
</style>
