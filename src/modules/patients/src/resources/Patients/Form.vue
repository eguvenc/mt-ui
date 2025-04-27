<template>
  <va-form :id="id" :item="item" v-model="model" disableUnsavedFormDialog>
    <v-row no-gutters>
      <v-col lg="6" md="6" sm="12">

        <va-select-input
          source="userId"
          reference="users"
          :error-messages="userIdErrors"
          clearable
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

        <v-row class="mt-2" v-if="$route.name == 'patients_edit'">
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-data-table :density="getDensity" :items="model.intakes" :headers="intakeHeaders">

              <template v-slot:top>
                <v-row>
                  <v-col>
                    <h2 class="text-h6">Intakes</h2>
                  </v-col>
                  <v-col class="d-flex justify-end">
                    <v-btn color="primary" @click="addIntake" icon>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>

              <template v-slot:[`item.medicineId`]="{ item }">
                <div class="d-flex align-center gap-2">
                  <v-icon color="primary" class="mr-2">mdi-pill</v-icon>
                  {{ item.medicineId.name }}
                </div>
              </template>

              <template v-slot:[`item.intakeTime`]="{ item }">
                <div class="d-flex align-center gap-2">
                  <v-icon color="primary" class="mr-2">mdi-clock-outline</v-icon>
                  {{ item.intakeTime.name }}
                </div>
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn icon variant="text" @click="editIntake(item.id)">
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
              Are you sure this intake will be deleted permanently ?
            </v-card-title>
            <v-card-actions class="justify-end">
              <v-btn text @click="cancelDelete">Cancel</v-btn>
              <v-btn color="red-darken-2" text @click="confirmDeleteIntake">Delete</v-btn>
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
import { required, minLength } from "@vuelidate/validators";
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
      selectedIntakeId: null,      
      serverItems: [],
      totalItems: 0,
      loadingIntakes: false,
      itemsPerPage: 10,
      model: {
        id: null,
        userId: null,
        gender: null,
        ageGroup: null,
        intakes: [],
      },
      intakeHeaders: [
        { title: "", key: 'medicineId', sortable: false },
        { title: "", key: 'intakeTime', sortable: false },
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
    userIdErrors() {
      const errors = [];
      if (!this.v$['model'].userId.$dirty) return errors;
      this.v$['model'].userId.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
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
  },
  methods: {
    openDeleteDialog(id) {
      this.selectedIntakeId = id;
      this.deleteDialog = true;
    },
    cancelDelete() {
      this.selectedIntakeId = null;
      this.deleteDialog = false;
    },
    confirmDeleteIntake() {
      if (this.selectedIntakeId) {
        this.deleteIntake(this.selectedIntakeId);
      }
      this.deleteDialog = false;
      this.selectedIntakeId = null;
    },    
    addIntake() {
      this.$router.push(
        {
          name: "intakes_create",
          query: { patientId: this.id }
        }
      );
    },
    editIntake(id) {
      this.$router.push('/intakes/' + id + '/edit?patientId=' + this.id)
    },
    async deleteIntake(id) {
      await this.$admin.http.delete('/intakes/delete/' + id);
      await this.loadCurrentIntakes({ page: 1, itemsPerPage: this.itemsPerPage, search: { q: this.q } });
    },    
    async loadCurrentIntakes ({ page, itemsPerPage, sortBy }) {
      this.loadingIntakes = "primary";
      this.fetchCurrentIntakes({ page, itemsPerPage, sortBy, search: { q: null } }).then(({ items, total }) => {
        this.model.intakes = items
        this.loadingIntakes = false
      })
    },
    async fetchCurrentIntakes ({ page, itemsPerPage, sortBy, search }) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const response = await this.$admin.http.get('/intakes/findAllById/' + this.id);

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