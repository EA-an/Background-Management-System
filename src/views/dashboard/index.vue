<template>
  <div>
    <Card />
    <Sale />
    <Observe/>
  </div>
</template>

<script>
import Card from "./Card";
import Observe from "./Observe";
import Sale from "./Sale";
export default {
  name: "home",
  components: {
    Card,
    Sale,
    Observe,
  },
};
</script>

<style></style>
