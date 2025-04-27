export default [
  {
    name: "intakes",
    standalone: true,
    permissions: [
      { name: "admin", actions: ["create", "list", "edit", "delete", "show"] },
    ],
    actions: ["create", "list", "edit", "delete", "show"],
  }
];
