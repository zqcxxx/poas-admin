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
        
<el-dialog
  title="编辑题目"
  :visible.sync="dialogFormVisible"
  width="40%"
  :before-close="handleClose">
  <el-form ref="form" :model="form" label-width="100px" class="demo-dynamic">
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
    <el-input v-model="value.value"></el-input><el-button @click.prevent="removeOption(value, 'form')">删除</el-button>
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

      <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total='total'>
    </el-pagination>
  </div>
<el-dialog
  title="添加题目"
  :visible.sync="dialogAddFormVisible"
  width="40%"
  :before-close="handleClose">
  <el-form ref="addForm" :model="addForm" label-width="100px" class="demo-dynamic">
  <el-form-item label="题目名称">
    <el-input v-model="addForm.title"></el-input>
  </el-form-item>

  <el-form-item label="题目类型" prop="resource">
    <el-radio-group v-model="addForm.type">
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
  >
    <el-input v-model="value.value"></el-input><el-button @click.prevent="removeOption(value, 'addForm')">删除</el-button>
  </el-form-item>

  <el-form-item>
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

import { getQuestions, getQuestionCount, addQuestion } from '@/api/question'

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
        addForm: {
          title: '',
          type: 0,
          options: [{
            value: ''
          }]
        },
        form: {
          title: '',
          type: 0,
          options:[{
            value: ''
          }],
          delivery: false,
        },
        test: null
      }
    },
    mounted () {
      this.getQue(this.pg, this.num);
      getQuestionCount().then( res => {
        this.total = res.data.data;
      })
    },
    methods: {
      handleClose(){},
      addQue(){
        this.dialogAddFormVisible = true;
      },
      getQue(pg, num){
        getQuestions(pg, num).then( res => {
          this.questionData = res.data.data;
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
      handleClick(row) {
        console.log(row);
      },
      handleDelete(index, row) {
          this.$confirm('即将删除该题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleEdit() {
          this.dialogFormVisible = true;
          console.log(this.dialogFormVisible);
      },
            submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeOption(item, formName) {
        if (formName === 'form'){
          let index = this.form.options.indexOf(item)
          if (index !== -1) {
            this.form.options.splice(index, 1)
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
            value: ''
          })
        }else {
          this.addForm.options.push({
            value: ''
          });
        }
      },
      submitForm(formName) {
        this.dialogFormVisible = false;
        console.log('form', this.form);
        console.log('addForm', this.addForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addQuestion(this.addForm).then( res => {
              console.log(res);
            }).catch(err => console.log(err))
            alert('submit!');

          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
