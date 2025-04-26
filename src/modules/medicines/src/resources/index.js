export default [
  {
    name: "medicines",
    standalone: true,
    permissions: [
      { name: "admin", actions: ["create", "list", "edit", "delete", "show"] },
    ],
    actions: ["create", "list", "edit", "delete", "show"],
  }
];
