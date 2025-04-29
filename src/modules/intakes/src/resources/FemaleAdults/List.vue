<template>
  <va-list 
  :fields="fields"
  :filters="filters"
  disableGlobalSearch
  disableCreate
  >
    <va-data-table-server 
      disable-show
      disable-create
      disable-edit
      disable-clone
      disable-delete
    >
      <template v-slot:[`field.patientId`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-account-injury</v-icon>
          {{ item.patientId.name }}
        </div>
      </template>

      <template v-slot:[`field.gender`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon :color="item.gender?.id === 'male' ? 'blue' : 'pink'" class="mr-2">
            {{ item.gender?.id === 'male' ? 'mdi-gender-male' : 'mdi-gender-female' }}
          </v-icon>
          <span>{{ item.gender?.name }}</span>
        </div>
      </template>

      <template v-slot:[`field.ageGroup`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon :color="item.ageGroup?.id === 'infant' ? 'warning' : 'green'" class="mr-2">
            {{ item.ageGroup?.id === 'infant' ? 'mdi-baby-face-outline' : 'mdi-human-male' }}
          </v-icon>
          <span>{{ item.ageGroup?.name }}</span>
        </div>
      </template>

      <template v-slot:[`field.intakeTime`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-clock-outline</v-icon>
          {{ item.intakeTime.name }}
        </div>
      </template>

      <template v-slot:[`field.medicineId`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-pill</v-icon>
          {{ item.medicineId.name }}
        </div>
      </template>

      <template v-slot:row.actions="{ item }">
        <va-action-button
          icon="mdi-pencil"
          color="primary"
          text
          :to="getRoute(item.id)"
        ></va-action-button>
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
        { source: "intakeTime", type: "select", attributes: { reference: "intakes",  multiple: true } },
      ],
      fields: [      
        {
          source: "patientId",
          type: "select",
          sortable: true,
        },
        {
          source: "gender",
          type: "select",
          sortable: true,
        },
        {
          source: "ageGroup",
          type: "select",
          sortable: true,
        },
        {
          source: "intakeTime",
          type: "select",
          sortable: true,
        },
        {
          source: "medicineId",
          type: "select",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    getRoute(id) {
      //  
      //  store list redirect query params we will use it for save
      //  operations which is located
      //  in form provider / this.formState.submit(redirect?querParams)
      //  
      localStorage.setItem("path", this.$route.path);
      localStorage.setItem("listQuery", JSON.stringify(this.$route.query));

      return { name: 'intakes_edit', params: { id } }
    }
  }
};
</script>
