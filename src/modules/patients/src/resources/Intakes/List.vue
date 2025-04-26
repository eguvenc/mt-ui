<template>
  <va-list 
  :fields="fields"
  :filters="filters"
  disableSettings
  >
    <va-data-table-server 
      disable-show
      disable-clone
    >
      <template v-slot:[`field.vehicleId`]="{ item }">
        <div class="d-flex flex-wrap ga-2">
          <!-- <img v-if="item.vehicleId.logoPath" :src="getImageUrl(item.vehicleId.logoPath)" width="25" /> -->
          <v-chip
            size="small"
            label
            color="primary"
          >
            <v-icon icon="mdi-label" start></v-icon>
            {{ item?.vehicleId?.name }}
          </v-chip>
        </div>
      </template>
      <template v-slot:[`field.imagePath`]="{ item }">
        <div style="padding: 5px;">
          <v-avatar
            v-if="item.imagePath"
            rounded="lg"
            style="width: 50px; height: 25px;"
          >
            <v-img :src="getImageUrl(item.imagePath)" alt="Logo" />
          </v-avatar>
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

      ],
      fields: [
        {
          source: "imagePath",
          sortable: true,
        },
        {
          source: "vehicleId",
          sortable: true,
        },
        {
          source: "name",
          sortable: true,
        },
        {
          source: "batteryCapacity",
          sortable: true,
        },
        {
          source: "maxKW",
          sortable: true,
        },
        {
          source: "wltpRange",
          sortable: true,
        },
        {
          source: "range100",
          sortable: true,
        },
        {
          source: "range75",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    getImageUrl(imagePath) {
      if (! imagePath) {
        return;
      }
      const parts = imagePath.split('/').filter(Boolean);
      const dir = parts[1];      // "vehicle-image"
      const filename = parts[2]; // "a808cd8c-....jpeg"
      const fileUrl = process.env.API_URL + `/files?dir=${dir}&filename=${filename}&thumb=50x25`;
      // console.error(fileUrl);
      return fileUrl;
    }
  }
};
</script>
