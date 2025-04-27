export default [
  {
    name: "patients",
    standalone: true,
    permissions: [
      { name: "user", actions: [] },
      { name: "admin", actions: ["create", "list", "edit", "delete", "show"] },
    ],
    actions: ["create", "list", "edit", "delete", "show"],
  }
];
