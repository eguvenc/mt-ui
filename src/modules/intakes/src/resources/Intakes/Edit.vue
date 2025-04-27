<template>
  <va-edit-layout :title="title">
    <intakes-form :id="id" :item="item"></intakes-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
