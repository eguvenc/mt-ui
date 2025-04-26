<template>
  <va-create-layout :title="title">
    <medicines-form :item="item"></medicines-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
}
</script>
