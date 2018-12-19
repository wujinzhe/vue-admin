<template>
  <the-app-layout user-name="德玛西亚"/>
</template>

<script>
import TheAppLayout from '@/components/TheAppLayout'
console.log('TheAppLayout', TheAppLayout)

export default {
  name: 'App',
  components: {
    TheAppLayout
  },
  created () {
    this.$Http.getMchtDetailList({}).then(resp => {
      console.log(resp.aaa)
    })
  }
}
</script>
