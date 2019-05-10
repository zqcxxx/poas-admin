<template>
  <div class="container">
    <el-input
      placeholder="请输入问卷ID"
      v-model="input"
      style="width: 30%; margin-bottom: 20px"
      clearable>
    </el-input>
    <el-button type="primary" @click="findSurvey" icon="el-icon-search" style="margin-left: 20px; margin-bottom: 20px">搜索</el-button>

    <el-table
      :data="questionnaireData"
      border
      style="width: 95%">
      <el-table-column
        fixed
        prop="id"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="survey_title"
        label="问卷名称"
        width="400">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间"
        width="200">
        <template slot-scope="scope">
          {{ getStamp(scope.row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column
        label="截止时间"
        width="200">
        <template slot-scope="scope"> 
          {{scope.row.deadline | format}}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ispublished | statusFilter">
            {{ getSurveyStatus(scope.row.ispublished) }}
          </el-tag>
        </template>
      </el-table-column>     
      <el-table-column
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.ispublished === 1"
            @click="handlePublish(scope.row)">发布</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-show="pgShow">
      <el-pagination
        style="margin-bottom: 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>
    <el-dialog
      title="请选择问卷截止日期"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <el-date-picker
      v-model="ptime"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions">
    </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editQuestionDeadline">确 定</el-button>
      </span>
    </el-dialog>
    <router-view />

  </div>
</template>

<script>
import { getSurveys, getSurveyCount, publishSurvey, delSurvey, getSurvey } from '@/api/survey'
import { formatDate } from '@/utils/date'
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'success',
          1: 'info',
          2: 'danger'
        }
        return statusMap[status]
      },
      format(time) {
        if(time){
          let t = Number(time)
          let date = new Date(t);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }else{
          return '未设置'
        }
      }
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '一天后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '三天后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        editQuestionnaireId: null,
        ptime: '',
        dialogVisible: false,
        pg: 1,
        num: 10,
        questionnaireData: [],
        total: 0,
        currentPage: 1,
        input: null,
        pgShow: true
      }
    },
    mounted: function () {
      this.initData()
    },
    methods: {
      findSurvey(){
        let _this = this
        let id = Number(this.input)
        if(Number.isNaN(id)){
          this.$message.error('错误，请输入数字ID')
        }else {
          getSurvey(id).then(res => {
            let arr = []
            let obj = res.data.data
            if(!obj){
              this.$message({
                type: 'info',
                message: '无此问卷，请更换ID后重试'
              })
              return
            }
            arr.push(obj)
            _this.questionnaireData = arr
            console.log('questionnaireData',_this.questionnaireData)
          })
          _this.pgShow = false
        }
      },
      getStamp(date){
        let d = new Date(date)
        let stamp = d.getTime()
        let fd = new Date(stamp);
        return formatDate(fd, 'yyyy-MM-dd hh:mm');
      },
      editQuestionDeadline() {
        let _this = this
        this.dialogVisible = false
        let eid = this.editQuestionnaireId
        let timestamp = this.ptime.getTime()
        publishSurvey(eid, timestamp).then(res => {
          if(res.data.status === 0){
            _this.$message({
              type: 'success',
              message: res.data.message
            })
            setTimeout(_this.initData, 500)
          }else{
            _this.$message({
              type: 'info',
              message: '修改失败，请刷新后重试'
            })
          }
        })
      },
      handlePublish(data) {
        this.dialogVisible = true
        this.editQuestionnaireId = data.id
      },
      getSurveyStatus(status){
        if(status === 1){
          return '未发布'
        }else if(status === 0){
          return '已发布'
        }else {
          return '已过期'
        }
      },
      getDeadline(time){
        if(time){
          return formatDate(time)
        }else {
          return '未设置'
        }
      },
      handleClose(){
        this.dialogVisible = false
      },
      initData() {
        let _this = this
        this.pgShow = true
        getSurveys(this.pg, this.num).then(res => {
          if(res.data.status === 0){
            _this.questionnaireData = res.data.data
          }
        })
        getSurveyCount().then( res => {
          if(res.status === 200){
            _this.total = res.data.data
          }
        })
      },
      handleSizeChange(val){
        this.num = val;
        this.initData()
      },
      handleCurrentChange(val){
        this.pg = val;
        this.initData()
      },
      handleDelete(row) {
        let _this = this
        this.$confirm('即将删除该问卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let did = row.id;
          delSurvey(did).then( res => {
            if(res.data.status === 0){
              this.$message({
                type: 'success',
                message: res.data.message
              });
              setTimeout(_this.initData, 500)
            }else{
              this.$message({
                type: 'info',
                message: res.data.message
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleEdit(row) {
        let sid = row.id
        this.$router.push(`/showsurvey/${sid}`)
      },
      removeOption(item, formName) {
        if (formName === 'form'){
          console.log('item',item)
          let did =  item.id
          let index = this.form.options.indexOf(item)
          if (index !== -1) {
            this.form.options.splice(index, 1)
            delOption(did).then(res => {
              let data =  res.data
              if(data.status === 0 ){
                console.log('删除成功')
              }
            }).catch(err => console.log(err)) 
          }
        }else {
          let index = this.addForm.options.indexOf(item)
          if (index !== -1) {
            this.addForm.options.splice(index, 1)
          }
        }

      },
      addOption(formName) {
        if(formName === 'form'){
          this.form.options.push({
            id: undefined,
            value: ''
          })
        }else {
          this.addForm.options.push({
            value: ''
          });
        }
      },
      submitForm(formName) {
        let _this = this
        if( formName === 'addForm'){
          this.dialogAddFormVisible = false;
          addQuestion(this.addForm).then( res => {
            console.log('res',res);
          }).catch(err => console.log(err))
        }else {
          this.dialogFormVisible = false;
          console.log('form', this.form)
          editQuestion(this.form).then( res => {
            if(res.data.status === 0){
              console.log('编辑成功')
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              setTimeout(_this.initData, 500)
            }
          }).catch(e => console.log(e))
        }
      },
    }
  }
</script>

<style lang='css' scoped>
    .container {
        margin-top: 20px;
        margin-left: 20px;
    }
    .addquestion {
        margin-bottom: 20px;
    }
    .block {
      margin-top: 20px;
    }
    .deletebtn {
      margin-top: 20px;
    }
</style>
