<template>
  <div>

    <el-card class="box-card" style="width:100%;margin-top: 20px">{{surveyTitle}}(结果)</el-card>
    <el-card class="box-card item-card" v-for="(item,index) in choiceAnswer" :key="item.title" style="margin-top: 20px">
      <div :id=index style="width: 600px;height:400px;"></div>
    </el-card>

    <el-card class="box-card item-card" v-for="item in fillAnswer" :key="item.id" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <strong>{{item.title}}</strong>
      </div>
      <div v-for="ans in item.ans" :key="ans" style="margin-top: 10px">{{ans}}</div>
    </el-card>
     <el-button type="primary" @click="confirm" class="sbtn">确定</el-button>
  </div>
</template>

<script>
import { getSurvey } from '@/api/survey'
import { getAnswer } from '@/api/answer'
export default {
  data() {
    return {
      choiceAnswer: [],
      fillAnswer: [],
      surveyTitle: '',
      sid: 0,
    }
  },
  mounted() {
    this.initData()
    console.log(this.surveyTitle)
    // 在异步请求获取到数据后，进行echarts初始化 ps：暂时解决方案，未找到更好
    setTimeout(this.drawChart, 600)
  },
  methods: {
    drawChart() {
      let typeMap = {
        0: '单选',
        1: '多选',
        2: '填空' 
      }
      for(let i in this.choiceAnswer){
        let xdata = []
        let sdata = []
        let myChart = this.$echarts.init(document.getElementById(`${i}`));
        for(let o of this.choiceAnswer[i].options){
          xdata.push(o.value)
          sdata.push(o.count)
        }
        let title = this.choiceAnswer[i].title + ' (' + typeMap[this.choiceAnswer[i].type] + ') '
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: title
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
          legend: {
            data: ["答案"]
          },
          yAxis: {
            data: xdata,
          },
          xAxis: {
            type: 'value',
            minInterval: 1
          },
          series: [
            {
              type: "bar",
              data: sdata,
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    let colorList = [
                      '#006374','#B5C334','#FCCE10','#E87C25','#27727B',
                       '#FE8463','#9BCA63'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    initData() {
      let _this = this
      this.sid = this.$route.params.id
      getAnswer(this.sid).then(res => {
        this.choiceAnswer = res.data.data[0]
        this.fillAnswer = res.data.data[1]
      }).catch(err => console.log(err))
      getSurvey(this.sid).then(res => {
        let data = res.data.data
        _this.surveyTitle = data.survey_title
      })
    },
    confirm() {
      this.$router.push('/result/index')
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
