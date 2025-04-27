export default [
  {
    name: "medicines",
    standalone: true,
    permissions: [
      { name: "user", actions: ["create", "list", "edit", "delete", "show"] },
      { name: "admin", actions: ["create", "list", "edit", "delete", "show"] },
    ],
    actions: ["create", "list", "edit", "delete", "show"],
  }
];
