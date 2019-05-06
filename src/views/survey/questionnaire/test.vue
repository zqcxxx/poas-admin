<template>
  <div>
    <el-card class="box-card" v-for="(item,index) in singleQuestions" :key="item.id">
      <div>{{ item.title }}</div>
      <div v-for="o in item.options" :key="o.id">
        <el-radio v-model="answer[index]" v-bind:label=o.id>{{o.value}}</el-radio>
      </div>
    </el-card> 
    <button @click="show">show</button>
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
        options: [{id:123, value: '号'}, {id: 131, value: 'dfhas'}]
      }],
      answer: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    show() {
      console.log(this.answer)
    },
    init() {}
  }
}
</script>

<style>

</style>
