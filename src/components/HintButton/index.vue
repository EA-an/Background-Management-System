<template>
  <a :title="title" style="margin:10px;">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
    props:['title'],
    name:"HintButton",


}
</script>

<style>

</style>