<template>
  <va-list 
  :fields="fields"
  :filters="filters"
  disableSettings
  >
    <va-data-table-server 
      disable-show
    >
      <template v-slot:[`field.name`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-pill</v-icon>
          {{ item.name }}
        </div>
      </template>

      <template v-slot:[`field.frequency`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-clock-outline</v-icon>
          {{ item.frequency.name }}
        </div>
      </template>
    </va-data-table-server>
  </va-list>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filters: [
        { source: "frequency", type: "select" },
        { source: "canBeUsedForInfants", type: "select" },
      ],
      fields: [      
        {
          source: "name",
          sortable: true,
        },
        {
          source: "frequency",
          type: "select",
          sortable: true,
        },
        {
          source: "canBeUsedForInfants",
          label: "For Infants",
          type: "boolean",
          sortable: true,
        },
      ],
    };
  },
  methods: {

  }
};
</script>
