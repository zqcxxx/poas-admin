<template>
  <div class="container">
    <el-input v-model="input" placeholder="请输入员工编号" class="idput"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="searchRecord" class="btn">搜索</el-button>
    <el-table
    :data="record"
    border
    class="rectable">
    <el-table-column
      fixed
      prop="id"
      label="序号"
      width="100"
    >
    </el-table-column>
    <el-table-column
      fixed
      prop="eid"
      label="员工编号"
      width="120"
    >
    </el-table-column>
    <el-table-column
      fixed
      prop="idCard"
      label="身份证号"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="eName"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="eDepartment"
      label="部门"
      width="120">
    </el-table-column>
    <el-table-column
      prop="trainDate"
      label="培训时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="trainContent"
      label="培训内容"
      width="180">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="delRecord(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
    
<script>
export default {
  data () {
    return{
      record: [],
      input: ''
    }
  },
  mounted: function() {
    this.initRecord()
  },
  methods: {
    initRecord() {
      this.getRequest('/personnel/Train/getEmpTrainData').then( res => {
          this.record = res.data
      }).catch(e => console.log(e))
    },
    searchRecord(){
      let id = Number(this.input)
    },
    delRecord(row){
      let id = row.id
      this.getRequest(`/personnel/Train/delEmpTrainDataById/${id}`).then( res => {
        this.initRecord()
      })
    }
  }
}
</script>

<style lang='css' scoped>
    .container {
        margin: 20px;
    }
    .idput {
      width: 300px;
      float: left;
    }
    .btn {
      margin-left: 20px;
    }
    .rectable {
      width: 90%;
      margin-top: 20px;
    }
</style>
