<template>
  <v-row>
    <v-col sm="12">
      <v-form @submit.prevent="updateAccount">
        <v-card flat>
          <v-card-text>
            <div class="d-flex align-center mb-2">
              <h1 class="h1">{{ $t("users.myAccount.title") }}</h1>
            </div>
            <v-row>
              <v-col lg="3" md="3" sm="12">
                <va-avatar-input
                  v-model="avatar.image"
                  :set-label="$t('users.myAccount.fields.avatar.set')"
                  :del-label="$t('users.myAccount.fields.avatar.del')"
                >
                </va-avatar-input>

                <va-text-input
                  source="firstname"
                  resource="account"
                  v-model="firstname"
                  variant="outlined"
                  :error-messages="firstnameErrors"
                ></va-text-input>

                <va-text-input
                  source="lastname"
                  resource="account"
                  v-model="lastname"
                  variant="outlined"
                  :error-messages="lastnameErrors"
                />

                <va-text-input
                  source="email"
                  resource="account"
                  v-model="email"
                  type="email"
                  variant="outlined"
                  :error-messages="emailErrors"
                ></va-text-input>

              </v-col>
            </v-row>
            <v-btn color="primary" :loading="accountUpdating" type="submit">
              {{ $t("i18n.actions.save") }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import Translation from "@/modules/i18n/src/translation";

export default {
  inject: [],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      accountUpdating: false,
      firstname: null,
      lastname: null,
      email: null,
      locale: null,
      avatar: {
        image: null,
      },
    };
  },
  created() {
    this.initializeAccount();
  },
  validations() {
    return {
      firstname: {
        required,
        maxLength: maxLength(120),
      },
      lastname: {
        required,
        maxLength: maxLength(120),
      },
      email: {
        required,
        email,
      },
    }
  },
  computed: {
    firstnameErrors() {
      const errors = [];
      const field = "firstname";
      if (!this.v$[field].$dirty) return errors;
      this.v$[field].required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      this.v$[field].maxLength.$invalid &&
        errors.push(this.$t("i18n.v.string.maxLength", { max: "120" }));
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      const field = "lastname";
      if (!this.v$[field].$dirty) return errors;
      this.v$[field].required.$invalid &&
        errors.push(this.$t("i18n.v.text.required"));
      this.v$[field].maxLength.$invalid &&
        errors.push(this.$t("i18n.v.string.maxLength", { max: "120" }));
      return errors;
    },
    emailErrors() {
      const errors = [];
      const field = "email";
      if (!this.v$[field].$dirty) return errors;
      this.v$[field].required.$invalid &&
        errors.push(this.$t("i18n.v.email.required"));
      this.v$[field].email.$invalid && errors.push(this.$t("v.email.invalid"));
      return errors;
    },
  },
  methods: {
    async initializeAccount() {
      let response = await this.$admin.http.get("/users/myAccount/findMe");
      if (response && response.status == 200) {
        let data = response.data.data;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.avatar.image = data.avatar.image;
      }
    },
    async updateAccount() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return false;
      }
      this.accountUpdating = true;
      try {
        let data = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          avatar: {
            image: this.avatar.image,
          }
        };
        let Self = this;
        let user = await this.$store.getModule("auth").checkAuth();
        if (user) {
          this.$admin.http({ method: "PUT", url: "/users/myAccount/update", data: data }).then(async function(response){
            if (response && response.status == 200) {
              
              Self.$router.push({ name: "dashboard"});
              setTimeout(function(){
                Self.$admin.message("success", Self.$t("i18n.form.saved"));
              }, 1);
            }
          });
        }
      } catch (e) {
        // console.log(e.message);
      } finally {
        this.accountUpdating = false;
      }
    },
  },
};
</script>
