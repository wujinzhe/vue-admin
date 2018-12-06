<template>
  <div>
    <h2>欢迎登录管理系统</h2>
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
