<template>
  <div class="container">
    <el-input
      placeholder="请输入问卷名称"
      style="width: 80%"
      v-model="surtitle"
      clearable>
    </el-input>
    <el-table
      ref="multipleTable"
      :data="questionData"
      tooltip-effect="dark"
      style="width: 80%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="id"
        label="序号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="question_title"
        label="题目名称"
        width="680">
      </el-table-column>
      <el-table-column
        label="添加时间"
        width="200"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{ getStamp(scope.row.createAt) }}
        </template>        
      </el-table-column>
      <el-table-column
        label="题目类型"
        width="80">
       <template slot-scope="scope">{{ showType(scope.row.question_type) }}</template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" class="block">
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button type="success" size='medium' class='addquestion' @click="addSurvey()">添加问卷</el-button>
    </div>
    <router-view />

  </div>
</template>

<script>
import { getAllQuestions} from '@/api/question'
import { createSurvey } from '@/api/survey'
import { formatDate } from '@/utils/date'

  export default {
    filters: {
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
        surtitle: '',
        addQuestionnaireData: {
            title: '',
            questionid: [],
            deadline: ''
        },
        multipleSelection: [],
        questionData: [],
        question: null,
      }
    },
    mounted: function () {
      this.initData()
    },
    methods: {
      getStamp(date){
        let d = new Date(date)
        let stamp = d.getTime()
        let fd = new Date(stamp);
        return formatDate(fd, 'yyyy-MM-dd hh:mm');
      },
      empData(){
        this.addQuestionnaireData.title = ''
        this.addQuestionnaireData.questionid = []
        this.addQuestionnaireData.deadline = ''
      },
      addSurvey(){
        let _this = this
        if(this.multipleSelection){
          this.$confirm('是否创建问卷?','提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            _this.addQuestionnaireData.title = _this.surtitle
            for(let o of _this.multipleSelection){
              _this.addQuestionnaireData.questionid.push(o.id)
            }
            if(_this.addQuestionnaireData.questionid.length === 0){
              _this.$message({
                type: 'info',
                message: '错误，至少选择一个题目'
              })
              return
            }
            if(!_this.addQuestionnaireData.title){
              _this.$message({
                type: 'info',
                message: '错误，问卷名称不能为空'
              })
              return  
            }
            createSurvey(_this.addQuestionnaireData).then(res => {
              if(res.data.status === 0){
                _this.$message({
                  type: 'success',
                  message: res.data.message
                })
                _this.surtitle = ''
                _this.empData()
                _this.initData()
              }else{
                _this.empData()
                _this.$message({
                  type: 'info',
                  message: '添加失败，请重试'
                })
              }
            })
          })
        }  
      },
      showType(type){
        let qt = Number(type)
        switch (qt) {
          case 0:
            return '单选'
            break
          case 1:
            return '多选'
            break
          case 2:
            return '填空'
            break
          default:
            return '错误'
        }
      },
      toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      initData() {
        let _this = this
        getAllQuestions().then(res => {
          if(res.data.data && res.data.status === 0){
            _this.questionData = res.data.data;
          }
        }).catch(e => console.log(e))
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
</style>
