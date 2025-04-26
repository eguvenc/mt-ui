import module from "./index.js";

export default {
  name: module.name,
  build: async function (t, admin) {
    const adminRole = await admin.can(["admin"]);

    return adminRole
      ? [
          {
            icon: "mdi-pill",
            text: t("medicines.menu.label"),
            link: "/medicines?sortBy=name&sortDesc=false",
            order: 1,
          }
        ]
      : [];
  },
};
