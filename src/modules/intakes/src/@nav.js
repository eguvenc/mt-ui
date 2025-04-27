import module from "./index.js";

export default {
  name: module.name,
  build: async function (t, admin) {
    const userRole = await admin.can(["user"]);
    const adminRole = await admin.can(["admin"]);

    return userRole || adminRole
      ? [
          {
            icon: "mdi-medical-cotton-swab",
            text: t("intakes.menu.label"),
            order: 1,
            children: [
              {
                icon: "mdi-list-box-outline",
                text: t("intakes.list.menu.label"),
                link: "/intakes?sortBy=name&sortDesc=false",
              },
              {
                icon: "mdi-face-woman-outline",
                text: t("intakes.femaleAdults.menu.label"),
                link: "/intakes/femaleAdults?filter={\"intakeTime\":[\"20:00\"]}",
              },
              {
                icon: "mdi-face-man",
                text: t("intakes.maleInfants.menu.label"),
                link: "/intakes/maleInfants?filter={\"intakeTime\":[\"08:00\"]}",
              }
            ]
          }
        ]
      : [];
  },
};
