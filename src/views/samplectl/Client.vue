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
        <template align="center" scope="scope">
          <span>{{ scope.row.extra }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="年龄">
        <template align="center" width="65" scope="scope" placeholder="输入年龄">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>

      <el-table-column label="身高">
        <template align="center" width="65" scope="scope" placeholder="输入身高">
          <span>{{ scope.row.height }}</span>
        </template>
      </el-table-column>

      <el-table-column label="体重">
        <template align="center" width="65" scope="scope" placeholder="输入体重"> 
          <span>{{ scope.row.weight }}</span>
        </template>
      </el-table-column>

      <el-table-column label="样本">
        <template align="center" width="65" scope="scope">
          <span class="link-type" @click="handleFetchSamples(scope.row.samples)">{{ scope.row.samples }}</span>
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
      <el-form class="smapll-space" :model="temp" label-position="left" label-width="120px" style="width:400px; margin-left: 50px">
        <el-form-item label="名称">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio class="radio" v-model="temp.gender" label="1">男</el-radio>
          <el-radio class="radio" v-model="temp.gender" label="2">女</el-radio>
          <el-radio class="radio" v-model="temp.gender" label="3">其他</el-radio>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="temp.age"></el-input>
        </el-form-item>
        <el-form-item label="身高">
          <el-input v-model="temp.height"></el-input>
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="temp.weight"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="电话号码">
          <el-input v-model="temp.extra.phone_num"></el-input>
        </el-form-item>
        <el-form-item label="是否吸烟">
          <el-radio class="radio" v-model="temp.extra.smoking" label="1">是</el-radio>
          <el-radio class="radio" v-model="temp.extra.smoking" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否饮酒">
          <el-radio class="radio" v-model="temp.extra.drinking" label="1">是</el-radio>
          <el-radio class="radio" v-model="temp.extra.drinking" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="甘油三酯">
          <el-input v-model="temp.extra.triglyceride"></el-input>
        </el-form-item>
        <el-form-item label="胆固醇">
          <el-input v-model="temp.extra.cholesterol"></el-input>
        </el-form-item>
        <el-form-item label="高密度脂蛋白">
          <el-input v-model="temp.extra.h_lipoprotein"></el-input>
        </el-form-item>
        <el-form-item label="低密度脂蛋白">
          <el-input v-model="temp.extra.l_lipoprotein"></el-input>
        </el-form-item>
        <el-form-item label="FBG">
          <el-input v-model="temp.extra.fbg"></el-input>
        </el-form-item>
        <el-form-item label="排便">
          <el-select v-model="temp.extra.defecate" placaholder="每日排便次数">
            <el-option key="0" label="一日一次" value="0"></el-option>
            <el-option key="1" label="一日二次" value="1"></el-option>
            <el-option key="2" label="一日三次" value="2"></el-option>
            <el-option key="3" label="一日次次" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病史">
          <el-input v-model="temp.extra.medical_history"></el-input>
        </el-form-item>
        <el-form-item label="家族遗传病史">
          <el-input v-model="temp.extra.family_history"></el-input>
        </el-form-item>
        <el-form-item label="用药史">
          <el-input v-model="temp.extra.medicine"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="temp.extra.remarks"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="create">确定</el-button>
        <el-button v-else type="primary" @click="update">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="用户所有样本" :visible.sync="dialogSamplesVisible" size="small">
      <el-table :data="samplesData" border fit hightlight-current-row style="width: 100%">
        <el-table-column prop="id" label="谱元ID"></el-table-column>
        <el-table-column prop="status" label="报告状态"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createItem, updateItem, deleteItem, fetchClientSamples } from '@/api/batches'
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
        gender: 0,
        age: 0,
        height: 0,
        weight: 0,
        extra: {
          phone_num: '',
          smoking: 0,
          drinking: 0,
          triglyceride: '',
          cholesterol: '',
          h_lipoprotein: '',
          fbg: '',
          defecate: 0,
          medical_history: '',
          family_history: '',
          medicine: '',
          remarks: ''
        }
      },
      textMap: {
        create: '创建',
        update: '更新'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dialogSamplesVisible: false,
      samplesData: null
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
    handleFetchSamples (row) {
      let id = row.id
      fetchClientSamples(id).then(res => {
        this.dialogSamplesVisible = true
        this.samplesData = res.data.data
      })
    }
  }
}
</script>

<style lang="css">
</style>
