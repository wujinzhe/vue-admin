<template>
  <div>
    <h2>欢迎登录管理系统</h2>
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-date-picker
        type="date"
        placeholder="选择日期"/>
    </div>

    <router-link to="/father">跳转到father</router-link>
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
      this.$message.success('刷新成功')
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>
