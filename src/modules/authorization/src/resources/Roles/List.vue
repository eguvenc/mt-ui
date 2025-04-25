<template>
  <va-list 
  :fields="fields"
  :filters="filters"
  >
    <va-data-table-server 
      disable-show
      :disable-actions="false"
    >
    </va-data-table-server>
  </va-list>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filters: [],
      fields: [
        {
          source: "name",
          sortable: true,
        },
        {
          source: "key",
          sortable: true,
        },
        {
          source: "level",
          sortable: true,
        },
      ],
    };
  }
};
</script>
