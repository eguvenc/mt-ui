<template>
  <va-edit-layout :title="title">
    <medicines-form :id="id" :item="item"></medicines-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
