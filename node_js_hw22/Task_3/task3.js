"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userManagement_1 = require("./userManagement");
var admin = new userManagement_1.UserManagement.Admin.AdminUser("Ben Sole", "admin@example.com");
console.log(admin.getDetails());
admin.toggleSuperAdmin();
console.log(admin.getDetails());
