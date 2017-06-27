<template lang="html">
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" v-model="listQuery.name" placeholder="合作单位名称" style="width:180px"></el-input>
      <el-button class="filter-item" @click="handleFilter" type="primary" icon="search">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" style="margin-left: 10px" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="handleDownload" type="primary" icon="document">导出</el-button>
    </div>

    <el-table :key="tableKey" :data="list" border highlight-current-row style="width: 100%">
      <el-table-column label="机构名">
        <template align="center" width="65" scope="scope">
          <span class="link-type" @click="showEdit(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template align="center" width="65" scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来样机构联系人">
        <template align="center" width="65" scope="scope">
          <span class="link-type" @click="handleFetchContacts(scope.row.id)">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="来样批次">
        <template align="center" width="65" scope="scope">
          <span class="link-type" @click="handleFetchBatches(scope.row.id)">查看</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="success" @click="showEdit(scope.row)">修改</el-button>
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
    :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"  @close="resetTemp">
      <el-form class="smapll-space" :model="temp" label-position="left" label-width="70px" style="width:400px; margin-left: 50px">
        <el-form-item label="单位名">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="temp.address"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="create">创建</el-button>
        <el-button v-else type="primary" @click="update">更新</el-button>
      </div>
    </el-dialog>

    <el-dialog title="合作单位联系人" :visible.sync="dialogContactsVisible" size="small">
      <el-table :data="contactsData" border fit highlight-current-row style="width:100%">
        <el-table-column label="姓名">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="samll" v-model="scope.row.name"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="samll" v-model="scope.row.phone"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="samll" v-model="scope.row.email"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑" width="120">
          <template scope="scope">
            <el-button v-show="!scope.row.edit" type="primary" @click="scope.row.edit = true" size="small" icon="edit">编辑</el-button>
            <el-button v-show="scope.row.edit && !scope.row.create" type="success" @click="updateContact(scope)" size="small" icon="check">完成</el-button>
            <el-button v-show="scope.row.create" type="success" @click="createContact(scope.row)" size="small" icon="check">创建</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="addNewContact()">添加新联系人</el-button>
      </div>
    </el-dialog>
    <el-dialog title="合作单位批次信息" :visible.sync="dialogBatchesVisible" size="small">
       <el-table :data="batchesData" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="type" label="样本类型"> </el-table-column>
          <el-table-column prop="status" label="到样状态"> </el-table-column>
          <el-table-column prop="character" label="状态特征"> </el-table-column>
          <el-table-column prop="deliver_time" label="寄送时间"> </el-table-column>
          <el-table-column prop="arrive_time" label="到样时间"> </el-table-column>
          <el-table-column prop="express_num" label="快递单号"> </el-table-column>
          <el-table-column prop="store_time" label="入库时间"> </el-table-column>
      </el-table>
    </el-dialog >
  </div>
</template>

<script>
import { fetchList, createItem, updateItem, deleteItem, fetchAgencyBatches } from '@/api/agencies'
import { fetchAgencyContacts, updateItem as updateContact, createItem as createContact } from '@/api/contacts'

export default {
  data () {
    return {
      list: null,
      total: 0,
      tableKey: 0,
      listQuery: {
        name: undefined,
        page: 1,
        limit: 20
      },
      listLoading: true,
      temp: {
        id: undefined,
        name: '',
        address: ''
      },
      textMap: {
        create: '创建',
        update: '更新'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dialogContactsVisible: false,
      contactsData: [],
      dialogBatchesVisible: false,
      batchesData: [],
      tempAgencyId: null
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        // console.log(response.data)
        this.list = response.data.data.map(v => {
          v.edit = false
          return v
        })
        // this.total = response.data.total
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
    handleFetchContacts (id) {
      this.dialogContactsVisible = true
      this.tempAgencyId = id
      fetchAgencyContacts(id).then(res => {
        this.contactsData = res.data.data.map(v => {
          v.edit = false
          return v
        })
      })
    },
    updateContact (scope) {
      const id = scope.row.id
      const data = this.contactsData[scope.$index]
      updateContact(id, data).then(res => {
        scope.row.edit = false
        this.$notify({
          type: 'success',
          title: '成功',
          message: '更新成功'
        })
      })
    },
    handleFetchBatches (id) {
      this.dialogBatchesVisible = true
      fetchAgencyBatches(id).then(res => {
        this.batchesData = res.data.data.map(v => {
          v.edit = false
          return v
        })
      })
    },
    createContact (row) {
      console.log(row)
      createContact(row).then(() => {
        row.create = false
        row.edit = false
        this.$notify({
          type: 'success',
          title: '成功',
          message: '创建成功'
        })
      })
    },
    addNewContact () {
      this.contactsData.push({
        agency_id: this.tempAgencyId,
        name: '',
        phone: '',
        email: '',
        create: true,
        edit: true
      })
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        name: '',
        address: ''
      }
    }
  }
}
</script>

<style lang="css">
</style>
