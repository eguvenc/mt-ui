<template>
  <va-edit-layout :title="title">
    <patients-intakes-form :id="id" :item="item"></patients-intakes-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
