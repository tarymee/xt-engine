<template>
  <div
    class="xt-progress"
    :style="[viewStyle]"
  >
    <div class="xt-progress-con">
      <div class="xt-progress-con-cur" :style="{ width: computedValue }"></div>
    </div>
    <div class="xt-progress-text">{{ computedText }}</div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import baseMixin from '../common/baseMixin'

export default {
  name: 'xt-progress',
  mixins: [baseMixin],
  data () {
    return {
      // todo: 圆环模式
      displaytype: ''
    }
  },
  computed: {
    computedText () {
      let result = Number(this.value) * 100
      // 保留两位小数
      result = Math.round(result * 100) / 100
      return `${result}%`
    },
    computedValue () {
        let result = Number(this.value) * 100
        // 保留两位小数
        result = Math.round(result * 100) / 100
        // 限定在[0-100]
        if (result > 100) {
            result = 100
        } else if (result < 0) {
            result = 0
        }
        return `${result}%`
    }
  },
  created () {
    this.dealViewRuleProp('displaytype', 'string')
  },
  methods: {
    // todo: 赋值检测 赋值错误，您的传值为${data}，进度条控件只接受[0-1]之间的字符串数字。

  }
}
</script>

<style scope>
.xt-progress {
  font-size: 13px;
  height: 32px;
  display: flex;
  /* height: 100%; */
  align-items: center;
}
.xt-progress-con {
  flex: auto;
  height: 4px;
  border-radius: 4px;
  background-color: #eee;
}
.xt-progress-con-cur {
  height: 4px;
  border-radius: 4px;
  background-color: #08A657;
  width: 0;
  -webkit-transition: all 0.1s linear 0.1s;
  -moz-transition: all 0.1s linear 0.1s;
  -ms-transition: all 0.1s linear 0.1s;
  -o-transition: all 0.1s linear 0.1s;
  transition: all 0.1s linear 0.1s;
}
.xt-progress-text {
  width: 48px;
  text-align: center;
  flex: none;
}
</style>
