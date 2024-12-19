import { UserManagement } from "./userManagement";

const admin = new UserManagement.Admin.AdminUser(
  "Ben Sole",
  "admin@example.com"
);
console.log(admin.getDetails());

admin.toggleSuperAdmin();
console.log(admin.getDetails());
