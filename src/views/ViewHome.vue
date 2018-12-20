<template>
  <div>
    <h2>欢迎登录管理系统</h2>
    <router-link to="/father">跳转到father</router-link>
    <br>
    <el-button
      type="primary"
      @click="click">获取经纬度</el-button>
  </div>
</template>
<script>
export default {
  components: {
    // aDatePicker: datePicker
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    click () {
      // this.$message.success('刷新成功')
      this.getLabelType()
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    getLabelType () {
      this.$Http.getLabelType({}).then(resp => {
        console.log(resp)
      })
    },
    getLocation (callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback)
      } else {
        callback()
      }
    }
  }
}
</script>
