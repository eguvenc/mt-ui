<template>
  <va-list 
  :fields="fields"
  :filters="filters"
  disableSettings
  >
    <va-data-table-server 
      disable-show
      disable-clone
      :show-expand="true"
      :expand-on-click="true"
    >
      <template v-slot:[`field.name`]="{ item }">
        <div class="d-flex align-center gap-2">
          <v-icon color="primary" class="mr-2">mdi-account-injury</v-icon>
          {{ item.name }}
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

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <v-container fluid v-if="item.intakes">
              <v-row dense>
                <v-col cols="12" v-for="(intake, index) in item.intakes" :key="index">
                  <v-card class="mb-4" max-width="400">
                    <v-card-title class="d-flex justify-space-between align-center text-subtitle-2">
                      <div class="d-flex align-center gap-3">
                        <span><strong>{{ intake.medicine.name }}</strong></span>
                      </div>
                      <v-btn size="x-small" color="primary" @click="editIntake(intake)">
                        {{ $t('patients.patients.labels.editIntake') }}
                      </v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="text-body-2">
                      <v-row dense>
                        <v-col cols="6">
                          <v-icon>mdi-clock-outline</v-icon>
                        </v-col>
                        <v-col cols="6">{{ intake.intakeTime }}</v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="6">
                          <v-icon>mdi-baby-face-outline</v-icon>
                        </v-col>
                        <v-col cols="6"><v-icon :color="intake.medicine.canBeUsedForInfants ? 'green' : 'red'">{{ intake.medicine.canBeUsedForInfants ? 'mdi-check' : 'mdi-close' }}</v-icon></v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </td>
        </tr>
      </template>

      <template v-slot:[`field.expand`]="{ item }">
        <v-btn
          :prepend-icon="'mdi-pill'"
          :append-icon="'mdi-chevron-down'"
          :text="$t('patients.patients.buttons.expand.label')"
          @click="toggleRowExpand(item)"
          class="text-none"
          color="medium-emphasis"
          size="small"
          variant="text"
          border
          slim
        />
      </template>


      <template v-slot:item.data-table-expand="{ item }">
        <v-btn
          :prepend-icon="'mdi-pill'"
          :append-icon="'mdi-chevron-down'"
          :text="$t('patients.patients.buttons.expand.label')"
          @click="toggleRowExpand(item)"
          class="text-none"
          color="medium-emphasis"
          size="small"
          variant="text"
          border
          slim
        />
      </template>
    </va-data-table-server>
  </va-list>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      expandedRows: [],
      filters: [

      ],
      fields: [
        {
          source: 'expand', // genişletme butonu
          title: "this.$t('patients.patients.fields.expand')",        // başlık gösterme
          width: '50px',
        },        
        {
          source: "name",
          sortable: true,
        },
        {
          source: "gender",
          sortable: true,
        },
        {
          source: "ageGroup",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    editIntake(intake) {
      //  
      //  store list redirect query params we will use it for save
      //  operations which is located
      //  in form provider / this.formState.submit(redirect?querParams)
      //  
      localStorage.setItem("path", this.$route.path);
      localStorage.setItem("listQuery", JSON.stringify(this.$route.query));
      this.$router.push("/intakes/" + intake.id + "/edit");
    },
    getImageUrl(logoPath) {
      if (! logoPath) {
        return;
      }
      const parts = logoPath.split('/').filter(Boolean);
      const dir = parts[1];      // "vehicle-logo"
      const filename = parts[2]; // "a808cd8c-....jpeg"
      return process.env.API_URL + `/files?dir=${dir}&filename=${filename}&thumb=50x25`;
    },
    // isRowExpanded(item) {
    //   return this.expandedRows.includes(item.id)
    // },
    toggleRowExpand(item) {
      const index = this.expandedRows.indexOf(item.id)
      if (index === -1) {
        this.expandedRows.push(item.id)
      } else {
        this.expandedRows.splice(index, 1)
      }
    },
  }
};
</script>
