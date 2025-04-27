<template>
  <va-list 
  :fields="fields"
  :filters="filters"
  disableGlobalSearch
  disableSettings
  >
    <va-data-table-server 
      disable-show
    >
      <template v-slot:[`field.patientId`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-account-injury</v-icon>
          {{ item.patientId.name }}
        </div>
      </template>

      <template v-slot:[`field.medicineId`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-pill</v-icon>
          {{ item.medicineId.name }}
        </div>
      </template>

      <template v-slot:[`field.intakeTime`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-clock-outline</v-icon>
          {{ item.intakeTime.name }}
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
        { source: "patientId", type: "select", attributes: { reference: "patients", multiple: true } },
        { source: "medicineId", type: "select", attributes: { reference: "medicines",  multiple: true } },
        { source: "intakeTime", type: "select", attributes: { reference: "intakes",  multiple: true } },
      ],
      fields: [      
        {
          source: "patientId",
          type: "select",
          sortable: true,
        },
        {
          source: "medicineId",
          type: "select",
          sortable: true,
        },
        {
          source: "intakeTime",
          type: "select",
          sortable: true,
        },
      ],
    };
  },
  methods: {

  }
};
</script>
