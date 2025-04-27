<template>
  <v-row>
    <v-col cols="6">
      <v-card 
        class="mt-2 mb-5" 
        variant="flat" 
        style="background-color: #fff"
      >
        <v-card-text>
          <div class="h1 mb-4">
            {{ $t("i18n.swagger.restApi") }}
          </div>
          <v-btn
            block
            color="primary"
            :href="getRestAPILink"
            target="_blank"
            prepend-icon="mdi-open-in-new"
            variant="flat"
          >
            {{ $t("i18n.swagger.openDocs") }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    getRestAPILink() {
      let baseUrl = process.env.API_URL;
      const regex = /\/api$/;
      baseUrl = baseUrl.replace(regex, "");
      return baseUrl + "/swagger/web/";
    }
  },
};
</script>

