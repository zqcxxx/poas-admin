<template>
  <div>
    <el-card class="box-card" v-for="item in singleQuestions" :key="item.index">
      <div>{{ item.title }}</div>
      <!-- <div v-for="o in item.options" :key="o">
        <el-radio v-model="answer[o.index]" label=o.id>备选项</el-radio>
      </div> -->
    </el-card> 
  </div>
</template>

<script>
const optionVal = ['A','B','C','D','E','F','G','H','I']
export default {
  data() {
    return {
      singleQuestions: [{
        id: 1,
        title: '213',
        type: 0,
        options: [{id: 2, value: '满意'}, {id: 321, value: '不满意'}]
      },{
        id: 21,
        title: '锻炼腹肌',
        type: 0,
        options: []
      }],
      answer: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
    show() {
      return this.$route.params.id
    }
  }
}
</script>

<style>

</style>
