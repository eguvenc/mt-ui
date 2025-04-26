<template>
  <va-form :id="id" :item="item" v-model="model" v-if="created" disableRedirect disableUnsavedFormDialog @saved="afterSave">
    <v-row no-gutters>
      <v-col lg="6" md="6" sm="12">
        <va-select-input
          source="medicineId"
          reference="medicines"
          :error-messages="medicineIdErrors"
          clearable
        >
        </va-select-input>

        <va-select-input
          v-if="showPatientDropdown"
          source="patientId"
          reference="patients"
          :error-messages="patientIdErrors"
          clearable
        >
        </va-select-input>
      </v-col>
    </v-row>
    <va-save-button></va-save-button>
  </va-form>
</template>

<script>
import { provide } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import Utils from "olobase-admin/src/mixins/utils";

export default {
  props: ["id", "item"],
  mixins: [Utils],
  inheritAttrs: false,
  setup() {
    let vuelidate = useVuelidate();
    const route = useRoute();
    provide('v$', vuelidate)
    return { v$: vuelidate, route }
  },
  async created() {
    if (this.route['query']['patientId']) {
      this.patientId = this.route['query']['patientId'];
    }
    if (this.item && this.item?.patientId?.id !== undefined) {
      this.patientId = this.route['query']['patientId'];
    }
    if (this.patientId) {
      const response = await this.$admin.http.get("/patients/findOneById/" + this.route['query']['patientId'] + "?disableBase64=true")
      if (response?.data?.data?.id) {
        this.model.patientId = response.data.data;  
      }
      this.showPatientDropdown = true;
    }
    // console.error(this.route.name);

    if (this.route.name == "patients_intakes_create" || this.route.name == "patients_intakes_edit") {
      this.showPatientDropdown = true;
    }
    this.created = true;
  },
  validations() {
    return {
      model: {
        name: {
          required,
          minLength: minLength(2),
        },
        patientId: {
          required,
        }
      }
    }
  },
  data() {
    return {
      created: false,
      patientId: null,
      showPatientDropdown: false,
      model: {
        id: null,
        name: null,
        patientId: null,
        medicineId: null,
        intakeTime: null,
      }
    };
  },
  methods: {
    afterSave() {
      const patientId = this.patientId ? this.patientId : this.model.patientId['id'];
      this.$router.push("/patients/" + patientId + "/edit");
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.v$['model'].name.$dirty) return errors;
      this.v$['model'].name.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      this.v$['model'].name.minLength.$invalid &&
        errors.push(this.$t("i18n.v.string.minLength", { min: "2" }));
      return errors;
    },
    patientIdErrors() {
      const errors = [];
      if (!this.v$['model'].name.$dirty) return errors;
      this.v$['model'].patientId.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      return errors;
    }
  },
}
</script>