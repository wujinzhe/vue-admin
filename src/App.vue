<template>
  <the-app-layout user-name="德玛西亚"/>
</template>

<script>
import TheAppLayout from '@/components/TheAppLayout'

export default {
  name: 'App',
  components: {
    TheAppLayout
  },
  created () {
    // this.getLabelType()
  },
  methods: {
    getLabelType () {
      this.$Http.getLabelType({}).then(resp => {
        console.log(resp)
      })
    }
  }
}
</script>
