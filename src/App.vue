<template lang="pug">
  #app
    pm-header
    router-view
    PmFooter
</template>
<script>
import PmFooter from "@/components/layout/Footer.vue";
import PmHeader from "@/components/layout/Header.vue";
export default {
  name: "app",
  components: {
    PmHeader,
    PmFooter
  }
};
</script>
<style lang="scss">
@import "./scss/main.scss";
</style>