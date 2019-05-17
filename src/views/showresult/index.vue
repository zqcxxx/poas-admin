<template>
  <div>

    <el-card class="box-card" style="width:100%;margin-top: 20px">{{surveyTitle}}</el-card>
    <el-card class="box-card item-card" v-for="(item,index) in choiceAnswer" :key="item.title" style="margin-top: 20px">
      <div>{{ item.title }}(单选)</div>
      <div :id=index style="width: 600px;height:400px;"></div>
    </el-card>

    <el-card class="box-card item-card" v-for="(item, index) in fiiContent" :key="item.id" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
      </div>
      <div style="height:50px;">
            <md-input v-model="fiiAnswer[index]" name="title" placeholder="输入答案">答案</md-input>
      </div>
    </el-card>
     <el-button type="primary" @click="submitData" class="sbtn">提交问卷</el-button>
  </div>
</template>

<script>
import MdInput from '@/components/MDinput'

import { getCompleteSurvey, getSurvey } from '@/api/survey'
import { submitAnswer, getAnswer } from '@/api/answer'

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
      choiceAnswer: [],
      fillAnswer: [],
      surveyTitle: '',
      singleQuestions: [],
      multipleQuestions:[],
      fiiContent: [],
      sqAnswer: [],
      mulAnswer: [],
      fiiAnswer: [],
      answer: [],
      sid: 0,
      title: '示例测试'
    }
  },
  mounted() {
    this.initData()
    console.log(this.surveyTitle)
    // 在异步请求获取到数据后，进行echarts初始化 ps：暂时解决方案，未找到更好
    setTimeout(this.drawChart, 3000)
  },
  methods: {
    drawChart() {
      for(let i in this.choiceAnswer){
        // let myChart = this.$echarts.init(this.$refs.test);
        let xdata = []
        let sdata = []
        let myChart = this.$echarts.init(document.getElementById(`${i}`));
        for(let o of this.choiceAnswer[i].options){
          xdata.push(o.value)
          sdata.push(o.count)
        }
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: this.title
          },
          tooltip: {},
          legend: {
            data: ["答案"]
          },
          xAxis: {
            data: xdata
          },
          yAxis: {},
          series: [
            {
              name: "答案",
              type: "bar",
              data: sdata
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
        // 基于准备好的dom，初始化echarts实例
  //    console.log(this.$refs.test)

    },
    initData() {
      let _this = this
      this.sid = this.$route.params.id
      getAnswer(this.sid).then(res => {
        this.choiceAnswer = res.data.data[0]
        this.fillAnswer = res.data.data[1]
        console.log(this.choiceAnswer)
      }).catch(err => console.log(err))
      getCompleteSurvey(this.sid).then(res => {
        let data = res.data.data
        _this.singleQuestions = data[0]
        let leg = data[1].length
        for(let i = 0; i < leg; i++){
          _this.mulAnswer.push([])
        }
        _this.multipleQuestions = data[1]
        _this.fiiContent = data[2]
      })
      getSurvey(this.sid).then(res => {
        let data = res.data.data
        _this.surveyTitle = data.survey_title
      })
    },
    submitData() {
      for(let s in this.sqAnswer){
        this.singleQuestions[s].answer = this.sqAnswer[s]
      }
      for(let p in this.mulAnswer){
        this.multipleQuestions[p].answer = this.mulAnswer[p]
      }
      for(let o in this.fiiAnswer){
        this.fiiContent[o].answer = this.fiiAnswer[o]
      }
      let pd = {}
      pd.id = this.sid
      pd.data = []
      pd.data.push(this.singleQuestions, this.multipleQuestions, this.fiiContent)
      submitAnswer(pd).then(res => {
        if(res.data.status === 0){
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        }else {
            this.$message({
              type: 'info',
              message: '提交失败，请刷新后重试'
            })
          }
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
