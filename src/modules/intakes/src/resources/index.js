export default [
  {
    name: "intakes",
    standalone: true,
    permissions: [
      { name: "user", actions: ["create", "list", "edit", "delete", "show"] },
      { name: "admin", actions: ["create", "list", "edit", "delete", "show"] },
    ],
    actions: ["create", "list", "edit", "delete", "show"],
  },
  {
    name: "femaleAdults",
    permissions: [
      { name: "user", actions: ["create", "list", "edit", "delete", "show"] },
      { name: "admin", actions: ["create", "list", "edit", "delete", "show"] },
    ],
    actions: ["create", "list", "edit", "delete", "show"],
  },
  {
    name: "maleInfants",
    permissions: [
      { name: "user", actions: ["create", "list", "edit", "delete", "show"] },
      { name: "admin", actions: ["create", "list", "edit", "delete", "show"] },
    ],
    actions: ["create", "list", "edit", "delete", "show"],
  },
];
