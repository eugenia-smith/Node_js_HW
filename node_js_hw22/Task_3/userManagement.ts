export namespace UserManagement {
  export namespace Admin {
    export class AdminUser {
      constructor(
        public name: string,
        public email: string,
        public isSuperAdmin: boolean = false
      ) {}

      toggleSuperAdmin(): void {
        this.isSuperAdmin = !this.isSuperAdmin;
      }

      getDetails(): string {
        return `Name: ${this.name}, Email: ${this.email}, Super Admin: ${this.isSuperAdmin}`;
      }
    }
  }
}
