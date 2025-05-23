<template>
  <v-app>
    <va-layout 
      v-if="authenticatedUser"
    >
      <template #appbar>
        <va-app-bar
          :key="getNavbarKey"
          color="primary"
          density="compact"
          elevation="1"
          :header-menu="getHeaderMenu"
          sidebar-color="white"
        >
          <template v-slot:navbar-logo>
            <div class="text-center mt-12 mb-5 mr-6 text-primary">
              <img :src="logo" border="0" />
            </div>
          </template>
          
          <template v-slot:profile>
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn icon small v-bind="props" class="mr-1">
                 <div v-if="avatarExists" style="float:left;">
                    <v-avatar size="24px">
                      <v-img 
                        :src="getAvatar"
                        alt="Avatar"
                      ></v-img>
                    </v-avatar>
                  </div>
                  <div v-else style="float:left;">
                    <v-icon>mdi-account-circle</v-icon>
                  </div>
                </v-btn>
              </template>
              <v-card min-width="300">
                <v-list nav class="mb-2">
                  <v-list-item
                    class="mb-2 mt-2" 
                     v-if="getFullname"
                    :prepend-avatar="getAvatar"
                  >
                    <div class="list-item-content">
                      <v-list-item-title class="title">{{ getFullname }}</v-list-item-title>
                      <v-list-item-subtitle v-if="getEmail">{{ getEmail }}</v-list-item-subtitle>
                    </div>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                  <v-card flat class="mt-2">
                    <v-card-text style="padding:0px;">
                      <v-list-item
                        v-for="(item, index) in getProfileMenu"
                        :key="index"
                        link
                        :to="item.link"
                        @click="item.logout ? logout() : null"
                      >
                        <template v-slot:prepend>
                          <v-icon>{{ item.icon }}</v-icon>
                        </template>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                      </v-list-item>
                    </v-card-text>
                  </v-card>
                </v-list>
              </v-card>
            </v-menu>
          </template>
          
        </va-app-bar>
      </template>

      <template #footer>
        <va-footer 
          :key="getCurrentLocale" 
          :menu="getFooterMenu"
        >
          <template v-slot:left>
          </template>
          <template v-slot:right>
            <span style="font-size:13px">&copy; 2024</span>
          </template>
        </va-footer>
      </template>
    </va-layout>
  </v-app>
</template>

<script>
import { isEmpty} from '@/helpers/lodash';
import { useDisplay } from "vuetify";
import { storeToRefs } from 'pinia'
import useAuth from "olobase-admin/src/store/auth";
import Translation from "@/modules/i18n/src/translation";
import config from "../@config";
import logo from '@/assets/images/medical-logo-60px.png';

export default {
  name: "App",
  inject: [],
  setup() {
    const { lgAndUp } = useDisplay();
    return { lgAndUp };
  },
  data() {
    return {
      logo,
      avatar: null,
      avatarExists: false,
      email: null,
      fullname: null,
      authenticatedUser: null,
    };
  },
  async created() {
    /**
     * Set default locale
     */
    const lang = Translation.guessDefaultLocale();
    if (lang && Translation.supportedLocales.includes(lang)) { // assign browser language
      await Translation.switchLanguage(lang);
    }
    /**
     * Check user is authenticated
     */
    this.authenticatedUser = await this.$store.getModule("auth").checkAuth();
    if (! this.authenticatedUser) {
      this.$router.push({name: "users_login"});
    } else {
      this.email = this.$store.getModule("auth").getEmail;
      this.fullname = this.$store.getModule("auth").getFullname;
      // 
      // Please do not remove it, it periodically updates the session lifetime.
      // Thus, as long as the user's browser is open, the user logged in to the application,
      // otherwise the session will be closed when the ttl period expires.
      // 
      this.$admin.http.post('/auth/session', { update: 1 }); 
    }
    /**
     * Check avatar
     */
    let base64Image = this.$store.getModule("auth").getAvatar;
    if (base64Image == "undefined" || base64Image == "null" || isEmpty(base64Image)) { 
      this.avatar = config.avatar.base64; // default avatar image
      this.avatarExists = false;
    } else {
      this.avatarExists = true;
      this.avatar = base64Image;
    }
  },
  computed: {
    getNavbarKey() {
      return this.$store.navbarKey + '_' + this.$store.getLocale;
    },
    getCurrentLocale() {
      const { locale } = storeToRefs(this.$store);
      return locale;
    },
    getAvatar() {
      return this.avatar;
    },
    getEmail() {
      return this.email;
    },
    getFullname() {
      return this.fullname;
    },
    getHeaderMenu() {
      return [];
    },
    getProfileMenu() {
      return [
        {
          icon: "mdi-account",
          text:  this.$t("users.myAccount.menu.label"),
          link: "/users/myAccount",
        },
        {
          icon: "mdi-key",
          text: this.$t("users.changePassword.menu.label"),
          link: "/users/changePassword",
        },
        {
          icon: "mdi-logout",
          text: this.$t("users.logout.menu.label"),
          logout: true,
        },
      ];
    },
    getFooterMenu() {
      return [
        // {
        //   href: link,
        //   text: this.$t("menu.terms"),
        // },
      ]
    }
  },
  methods: {
    async logout() {
      this.$store.getModule("api").setLoading(true);
      await this.$store.getModule("auth").logout();
      this.$router.push({ name: "users_login" });
    },
  },
};
</script>
