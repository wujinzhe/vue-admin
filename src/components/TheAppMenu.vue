<template>
  <div>
    <el-menu
      style="width: 200px;"
      default-active="2"
      class="el-menu-vertical-demo"
      router
    >
      <div class="logo">
        logo
      </div>
      <el-submenu
        v-for="(item, index) in menuList"
        :key="index"
      >
        <template slot="title">
          <i class="el-icon-document"/>
          <span>{{ index }}</span>
        </template>
        <el-menu-item
          v-for="(child, index1) in item"
          :index="child.path"
          :key="index1"
        >{{ child.title }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import merge from 'webpack-merge'
/** 判断两个路由的父子关系 */
// function compare (fatherPath, subPath) {
//   let _path1 = fatherPath.replace(/\//, '\\/')
//   return new RegExp(`${_path1}\\/([\\s\\w]*)$`, 'ig').test(subPath)
// }
export default {
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.menuList = this.fun2()
  },
  methods: {
    fun2 () {
      const routes = this.$router.options.routes
      var rr = {}
      routes.forEach(item => {
        if (item.parent) {
          rr = merge(rr, {
            [item.parent]: [{ title: item.title, path: item.path }]
          })
        }
      })
      return rr
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    height: 64px;
    line-height: 64px;
    white-space: 5px;
    background-color: #ff9800;
    color: white;
    font-size: 30px;
    font-style: italic;
    font-weight: 900;
    text-align: center;
  }
</style>
