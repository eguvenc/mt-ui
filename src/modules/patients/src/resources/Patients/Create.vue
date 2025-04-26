<template>
  <va-create-layout :title="title">
    <patients-form :item="item"></patients-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
}
</script>
