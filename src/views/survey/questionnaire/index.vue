<template>
    <div class="container">
    <el-button type="success" size='medium' class='addquestionaire'>创建问卷</el-button>
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
      label="问卷名称"
      width="780">
    </el-table-column>
    <el-table-column
      prop="date"
      label="创建时间"
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
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>

</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
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
        }]
      }
    }
  }
</script>

<style lang='css' scoped>
    .container {
        margin-top: 20px;
        margin-left: 20px;
    }
    .addquestionaire {
        margin-bottom: 20px;
    }
</style>
