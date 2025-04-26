import module from "./index.js";

export default {
  name: module.name,
  build: async function (t, admin) {
    const adminRole = await admin.can(["admin"]);

    return adminRole
      ? [
          {
            icon: "mdi-account-injury-outline",
            text: t("patients.menu.label"),
            link: "/patients?sortBy=name&sortDesc=false",
            order: 1,
          }
        ]
      : [];
  },
};
