import module from "./index.js";

export default {
  name: module.name,
  build: async function (t, admin) {
    const userRole = await admin.can(["user"]);
    const adminRole = await admin.can(["admin"]);

    return userRole || adminRole
      ? [
          {
            icon: "mdi-pill-multiple",
            text: t("medicines.menu.label"),
            link: "/medicines?sortBy=name&sortDesc=false",
            order: 1,
          }
        ]
      : [];
  },
};
