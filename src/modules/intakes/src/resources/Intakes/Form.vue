<template>
  <va-form :id="id" :item="item" v-model="model" disableUnsavedFormDialog>
    <v-row no-gutters>
      <v-col lg="6" md="6" sm="12">

        <va-select-input
          source="patientId"
          :error-messages="patientIdErrors"
          reference="patients"
          clearable
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-icon color="primary" class="mr-2">mdi-account-injury</v-icon>
              </template>
            </v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <v-icon color="primary" class="mr-2">mdi-account-injury</v-icon>
            <div class="ml-2">{{ item.raw.name }}</div>
          </template>
        </va-select-input>

        <va-select-input
          source="medicineId"
          :error-messages="medicineIdErrors"
          reference="medicines"
          clearable
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-icon color="primary" class="mr-2">mdi-pill</v-icon>
              </template>
            </v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <v-icon color="primary" class="mr-2">mdi-pill</v-icon>
            <div class="ml-2">{{ item.raw.name }}</div>
          </template>
        </va-select-input>

        <v-text-field
          variant="outlined"
          density="compact"
          color="primary"
          label="Intake Time"
          v-model="model.intakeTime"
          type="time"
          :error-messages="intakeTimeErrors"
        ></v-text-field>
      </v-col>
    </v-row>
    <va-save-button></va-save-button>
  </va-form>
</template>

<script>
import { provide } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

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
        patientId: {
          required,
        },
        medicineId: {
          required,
        },
        intakeTime: {
          required,
        }
      }
    }
  },
  data() {
    return {
      model: {
        id: null,
        patientId: null,
        medicineId: null,
        intakeTime: null,
      }
    };
  },
  computed: {
    patientIdErrors() {
      const errors = [];
      if (!this.v$['model'].patientId.$dirty) return errors;
      this.v$['model'].patientId.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      return errors;
    },
    medicineIdErrors() {
      const errors = [];
      if (!this.v$['model'].medicineId.$dirty) return errors;
      this.v$['model'].medicineId.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      return errors;
    },
    intakeTimeErrors() {
      const errors = [];
      if (!this.v$['model'].intakeTime.$dirty) return errors;
      this.v$['model'].intakeTime.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      return errors;
    }
  },
  methods: {

  }
}
</script>