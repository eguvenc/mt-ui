<template>
  <va-edit-layout :title="title">
    <patients-form :id="id" :item="item"></patients-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
