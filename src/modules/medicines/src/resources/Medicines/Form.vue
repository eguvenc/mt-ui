<template>
  <va-form :id="id" :item="item" v-model="model" disableUnsavedFormDialog>
    <v-row no-gutters>
      <v-col lg="6" md="6" sm="12">

        <va-text-input
          source="name"
          :error-messages="nameErrors"
          variant="outlined"
        >
          <template #prepend-inner>
            <v-icon color="primary" class="mr-2">mdi-pill</v-icon>
          </template>
        </va-text-input>

        <va-select-input
          source="frequency"
          :error-messages="frequencyErrors"
          clearable
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-icon color="primary" class="mr-2">mdi-clock-outline</v-icon>
              </template>
            </v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <v-icon color="primary" class="mr-2">mdi-clock-outline</v-icon>
            <div class="ml-2">{{ item.raw.name }}</div>
          </template>
        </va-select-input>

        <va-boolean-input 
          source="canBeUsedForInfants"
        >  
        </va-boolean-input>
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
        name: {
          required,
          minLength: minLength(2),
        },
        frequency: {
          required,
        }
      }
    }
  },
  data() {
    return {
      model: {
        id: null,
        name: null,
        frequency: null,
        canBeUsedForInfants: 0,
      }
    };
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
    frequencyErrors() {
      const errors = [];
      if (!this.v$['model'].frequency.$dirty) return errors;
      this.v$['model'].frequency.required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      return errors;
    }
  },
  methods: {

  }
}
</script>