<template>
    <div class="container">
    <el-button type="success" size='medium' class='addquestion'>添加题目</el-button>
    <el-table
    :data="tableData"
    border
    style="width: 95%">
    <el-table-column
      fixed
      prop="number"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="题目名称"
      width="780">
    </el-table-column>
    <el-table-column
      prop="date"
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
    <el-input v-model="form.name"></el-input>
  </el-form-item>

  <el-form-item label="题目类型" prop="resource">
    <el-radio-group v-model="form.resource">
      <el-radio label="单选"></el-radio>
      <el-radio label="多选"></el-radio>
      <el-radio label="填空"></el-radio>
    </el-radio-group>
  </el-form-item>

  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'选项' + index"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '选项不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item>

  <el-form-item>
    <el-button @click="addDomain">新增选项</el-button>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">保存</el-button>
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
</div>

</template>

<script>
  export default {
    data() {
      return {
        question: null,
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
        tableData: [{
          number: 1,
          date: '2016-05-02',
          name: '您认为学校食堂的饭菜价格如何？',
        }, {
          number: 2,
          date: '2016-05-04',
          name: '您认为食堂饭菜是否营养',
        }, {
          date: '2016-05-01',
          name: '您觉得学校食堂饭菜的卫生情况如何？',
          number: 3,
        }, {
          date: '2016-05-03',
          name: '您认为食堂饭菜的口味如何',
          number: 4,
        }],
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
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
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      submitForm(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
</style>
