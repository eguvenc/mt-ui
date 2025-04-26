<template>
  <va-form :id="id" :item="item" v-model="model" disableUnsavedFormDialog>
    <v-row no-gutters>
      <v-col lg="6" md="6" sm="12">

        <va-select-input
          source="userId"
          reference="users"
          :error-messages="userIdErrors"
          clearable
          return-object
        >
        </va-select-input>

        <va-select-input
          source="gender"
          :error-messages="genderErrors"
          clearable
        >
        </va-select-input>

        <va-select-input
          source="ageGroup"
          :error-messages="ageGroupErrors"
          clearable
        >
        </va-select-input>

        <v-row class="mt-2">
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-data-table :density="getDensity" :items="model.intakes" :headers="intakeHeaders">

              <template v-slot:item.vehicleId="{ item }">
                <div class="d-flex flex-wrap ga-2">
                  <v-chip
                    size="small"
                    label
                    color="primary"
                  >
                    <v-icon icon="mdi-label" start></v-icon>
                    {{ item?.userId?.name }}
                  </v-chip>
                </div>
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn icon variant="text" @click="updatePatient(item.id)">
                  <v-icon size="xsmall">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon variant="text" @click="openDeleteDialog(item.id)">
                  <v-icon size="xsmall" color="red-accent-4">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-dialog v-model="deleteDialog" max-width="600">
          <v-card>
            <v-card-title class="text-h6">
              Are you sure this data will be deleted permanently?
            </v-card-title>
            <v-card-actions class="justify-end">
              <v-btn text @click="cancelDelete">İptal</v-btn>
              <v-btn color="red-darken-2" text @click="confirmDeletePatient">Sil</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>
    </v-row>
    <va-save-button></va-save-button>
  </va-form>
</template>

<script>
import { provide } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import config from '@/@config'

export default {
  props: ["id", "item"],
  mixins: [],
  inheritAttrs: false,
  setup() {
    let vuelidate = useVuelidate();
    provide('v$', vuelidate)
    return { v$: vuelidate }
  },
  validations() {
    return {
      model: {
        name: {
          required,
          minLength: minLength(2),
        },
        userId: {
          required,
        },
        gender: {
          required,
        },
        ageGroup: {
          required,
        },
      }
    }
  },
  async created() {
    if (this.id) {
      await this.loadCurrentIntakes({ page: 1, itemsPerPage: this.itemsPerPage, search: { q: this.q } });
    }
  },
  data() {
    return {
      q: null,
      deleteDialog: false,
      selectedPatientId: null,      
      serverItems: [],
      totalItems: 0,
      loadingIntakes: false,
      itemsPerPage: 10,
      model: {
        id: null,
        userId: null,
        name: null,
        gender: null,
        ageGroup: null,
        intakes: [],
      },
      intakeHeaders: [
        { title: "", key: 'medicineName' },
        { title: "", key: 'intakeTime' },
        { title: "", key: 'action', sortable: false }
      ],
    };
  },
  computed: {
    getDensity() {
      return config.density;
    },
    nameErrors() {
      const errors = [];
      if (!this.v$['model'].name.$dirty) return errors;
      this.v$['model'].name.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      this.v$['model'].name.minLength.$invalid &&
        errors.push(this.$t("i18n.v.string.minLength", { min: "2" }));
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.v$['model'].gender.$dirty) return errors;
      this.v$['model'].gender.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      return errors;
    },
    ageGroupErrors() {
      const errors = [];
      if (!this.v$['model'].ageGroup.$dirty) return errors;
      this.v$['model'].ageGroup.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      return errors;
    },
    userIdErrors() {
      const errors = [];
      if (!this.v$['model'].userId.$dirty) return errors;
      this.v$['model'].userId.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      return errors;
    }
  },
  methods: {
    openDeleteDialog(id) {
      this.selectedPatientId = id;
      this.deleteDialog = true;
    },
    cancelDelete() {
      this.selectedPatientId = null;
      this.deleteDialog = false;
    },
    confirmDeletePatient() {
      if (this.selectedPatientId) {
        this.deleteModel(this.selectedPatientId);
      }
      this.deleteDialog = false;
      this.selectedPatientId = null;
    },    
    addIntakeTime() {
      this.$router.push(
        {
          name: "patients_intakes_create",
          query: { patientId: this.id }
        }
      );
    },
    updatePatient(id) {
      this.$router.push('/patients/models/' + id + '/edit?patientId=' + this.id)
    },
    async deletePatient(id) {
      await this.$admin.http.delete('/patients/intakes/delete/' + id);
      await this.loadCurrentIntakes({ page: 1, itemsPerPage: this.itemsPerPage, search: { q: this.q } });
    },    
    async loadCurrentIntakes ({ page, itemsPerPage, sortBy }) {
      this.loadingIntakes = "primary";
      this.fetchCurrentIntakes({ page, itemsPerPage, sortBy, search: { q: null } }).then(({ items, total }) => {
        this.model.Intakes = items
        this.loadingIntakes = false
      })
    },
    async fetchCurrentIntakes ({ page, itemsPerPage, sortBy, search }) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const response = await this.$admin.http.get('/patiens/intakes/findAllById/' + this.id);

      const items = response?.data?.data;
      if (sortBy && sortBy.length) {
        const sortKey = sortBy[0].key
        const sortOrder = sortBy[0].order
        items.sort((a, b) => {
          const aValue = a[sortKey]
          const bValue = b[sortKey]
          return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
        })
      }
      const paginated = items.slice(start, end === -1 ? undefined : end);
      return { items: paginated, total: items.length }
    },

  }

}
</script>