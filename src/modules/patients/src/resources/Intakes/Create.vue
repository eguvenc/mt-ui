<template>
  <va-create-layout :title="title">
    <patients-intakes-form :item="item"></patients-intakes-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
}
</script>
