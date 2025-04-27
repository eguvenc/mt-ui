<template>
  <va-create-layout :title="title">
    <intakes-form :item="item"></intakes-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
}
</script>
