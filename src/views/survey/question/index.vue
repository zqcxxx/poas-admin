<template>
  <div class="container">
    <el-button type="success" size='medium' class='addquestion' @click="addQue()">添加题目</el-button>
    <el-table
      :data="questionData"
      border
      style="width: 95%">
      <el-table-column
        fixed
        prop="id"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="question_title"
        label="题目名称"
        width="780">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="添加时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
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
      title="编辑题目"
      :visible.sync="dialogFormVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px" class="demo-dynamic">
        <el-form-item label="题目名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="题目类型" prop="resource">
          <el-radio-group v-model="form.type">
            <el-radio label="单选"></el-radio>
            <el-radio label="多选"></el-radio>
            <el-radio label="填空"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-for="(value, index) in form.options"
          :label="'选项' + (index + 1)"
          :key="value.key"
          :prop="'options.' + index + '.value'"
          :rules="{
            required: true, message: '选项不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="value.value"></el-input>
          <el-button @click.prevent="removeOption(value, 'form')" class="deletebtn">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addOption('form')">新增选项</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加题目"
      :visible.sync="dialogAddFormVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="addForm" :model="addForm" label-width="100px" class="demo-dynamic">
        <el-form-item 
          label="题目名称"
          :rules="{
            required: true, message: '选项不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="addForm.title" ></el-input>
        </el-form-item>
        <el-form-item label="题目类型" prop="resource">
          <el-radio-group v-model="addForm.type" @change="changeType">
            <el-radio label="0">单选</el-radio>
            <el-radio label="1">多选</el-radio>
            <el-radio label="2">填空</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-for="(value, index) in addForm.options"
          :label="'选项' + (index + 1)"
          :key="value.key"
          :prop="'options.' + index + '.value'"
          :rules="{
            required: true, message: '选项不能为空', trigger: 'blur'
          }"
          v-show="questionType"
        >
          <el-input v-model="value.value"></el-input>
          <el-button @click.prevent="removeOption(value, 'addForm')" class="deletebtn">删除</el-button>
        </el-form-item>

        <el-form-item v-show="questionType">
          <el-button @click="addOption('addForm')">新增选项</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">保存</el-button>
          <el-button @click="dialogAddFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { getQuestions, getQuestionCount, addQuestion, deleteQuestion, getQuestionOptions, editQuestion } from '@/api/question'
import { delOption } from '@/api/option'
  export default {
    data() {
      return {
        pg: 1,
        num: 10,
        questionData: [],
        total: 0,
        currentPage: 1,
        question: null,
        dialogFormVisible: false,
        dialogAddFormVisible: false,
        questionType: true,
        addForm: {
          title: '',
          type: null,
          options: [{
            value: ''
          }]
        },
        form: {
          id: undefined,
          title: '',
          type: null,
          options:[{
            id: undefined,
            value: '',
          }],
          delivery: false,
        },
        test: null
      }
    },
    mounted: function () {
      this.initData()
    },
    methods: {
      handleClose(){},
      initData() {
        console.log('修改数据')
        let _this = this
        this.getQue(this.pg, this.num)
        getQuestionCount().then( res => {
          if(res.status === 200){
            _this.total = res.data.data
          }
        })
      },
      addQue(){
        this.dialogAddFormVisible = true;
      },
      changeType(value){
        if(value === '2'){
          this.questionType = false;
        }else {
          this.questionType = true;
        } 
      },
      getQue(pg, num){
        let _this = this
        getQuestions(pg, num).then( res => {
          _this.questionData = res.data.data;
        })
      },
      handleSizeChange(val){
        this.num = val;
        this.getQue(this.pg, this.num);
      },
      handleCurrentChange(val){
        this.pg = val;
        this.getQue(this.pg, this.num);
      },
      handleDelete(row) {
        let _this = this
        this.$confirm('即将删除该题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let did = row.id;
          deleteQuestion(did).then( res => {
            if(res.data.status === 0){
              this.$message({
                type: 'success',
                message: res.data.message
              });
              _this.initData()
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
      handleEdit(index, row) {
        let _this = this
        this.dialogFormVisible = true;
        console.log('row',row)
        let editid = row.id;
        this.form.id = row.id
        this.form.title = row.question_title;
        this.form.type = row.question_type;
        getQuestionOptions(editid).then( res => {
          let data = res.data;
          _this.form.options = [];
          for(let o of data.data){
            _this.form.options.push({id: o.id, value: o.option_value})
          }
        })
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
            _this.initData()
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
              _this.initData()
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
