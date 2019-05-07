<template>
  <div>
    <el-card class="box-card" style="width:100%;margin-top: 20px">{{surveyTitle}}</el-card>
    <el-card class="box-card item-card" v-for="(item,index) in singleQuestions" :key="item.title" style="margin-top: 20px">
      <div>{{ item.title }}?(单选)</div>
      <div v-for="o in item.options" :key="o.id" style="padding-top: 10px">
        <el-radio v-model="sqAnswer[index]" v-bind:label=o.id style="font-weight:bold;">{{o.value}}</el-radio>
      </div>
    </el-card>

    <el-card class="box-card item-card" v-for="(item, index) in multipleQuestions" :key="item.title" style="margin-top: 20px">
      <div >{{ item.title }}?(多选)</div>
      <el-checkbox-group v-model="mulAnswer[index]" >
        <div v-for="o in item.options" :key="o.id" style="padding-top: 10px">
          <el-checkbox v-bind:label=o.id style="font-weight:bold;">{{o.value}}</el-checkbox>
        </div>
      </el-checkbox-group> 
    </el-card>

    <el-card class="box-card item-card" v-for="(item, index) in fiiContent" :key="item.id" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>{{item.title}}?</span>
      </div>
      <div style="height:50px;">
            <md-input v-model="fiiAnswer[index]" name="title" placeholder="输入答案">答案</md-input>
      </div>
    </el-card>
     <el-button type="primary" @click="show" class="sbtn">提交问卷</el-button>
  </div>
</template>

<script>
import MdInput from '@/components/MDinput'

import { getCompleteSurvey, getSurvey } from '@/api/survey'

export default {
  components: {
    MdInput,
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      },
      surveyTitle: '',
      singleQuestions: [],
      multipleQuestions:[],
      fiiContent: [],
      sqAnswer: [],
      mulAnswer: [[], [], [], [], [], []],
      fiiAnswer: [],
      answer: [],
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    show() {
      console.log('sqAnswer', this.sqAnswer)
      console.log('mulAnswer', this.mulAnswer)
      console.log('fiiAnswer', this.fiiAnswer)
    },
    initData() {
      let _this = this
      let sid = this.$route.params.id
      getCompleteSurvey(sid).then(res => {
        let data = res.data.data
        _this.singleQuestions = data[0]
        _this.multipleQuestions = data[1]
        _this.fiiContent = data[2]
      })
      getSurvey(sid).then(res => {
        let data = res.data.data
        _this.surveyTitle = data.survey_title
      }) 
    }
  }
}
</script>

<style lang='css' >
  .item-card {
    width: 80%;
    margin-left: 10%;
  }
  .item-card .el-radio__inner{
    border: 1px solid !important;
  }
  .item-card .el-checkbox__inner{
    border: 1px solid !important;
  }
  .sbtn{
    width: 80%;
    margin-top: 20px;
    margin-left: 10%;
    margin-bottom: 20px;
  }
</style>
