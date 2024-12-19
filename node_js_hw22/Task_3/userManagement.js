"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagement = void 0;
var UserManagement;
(function (UserManagement) {
    var Admin;
    (function (Admin) {
        var AdminUser = /** @class */ (function () {
            function AdminUser(name, email, isSuperAdmin) {
                if (isSuperAdmin === void 0) { isSuperAdmin = false; }
                this.name = name;
                this.email = email;
                this.isSuperAdmin = isSuperAdmin;
            }
            AdminUser.prototype.toggleSuperAdmin = function () {
                this.isSuperAdmin = !this.isSuperAdmin;
            };
            AdminUser.prototype.getDetails = function () {
                return "Name: ".concat(this.name, ", Email: ").concat(this.email, ", Super Admin: ").concat(this.isSuperAdmin);
            };
            return AdminUser;
        }());
        Admin.AdminUser = AdminUser;
    })(Admin = UserManagement.Admin || (UserManagement.Admin = {}));
})(UserManagement || (exports.UserManagement = UserManagement = {}));
