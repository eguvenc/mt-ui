import module from "./index.js";

export default {
  name: module.name,
  build: async function (t, admin) {
    const adminRole = await admin.can(["admin"]);

    return adminRole
      ? [
          {
            icon: "mdi-medical-cotton-swab",
            text: t("intakes.menu.label"),
            link: "/intakes?sortBy=name&sortDesc=false",
            order: 1,
          }
        ]
      : [];
  },
};
