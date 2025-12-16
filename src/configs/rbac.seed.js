import { Permission, Role } from "../modules/RBAC/rbac.model.js";
import { User } from "../modules/user/user.model.js";

export const seedPermissionsAndRoles = async () => {
    // ================= Permissions =================
    const [permCreate] = await Permission.findOrCreate({
        where: { name: "CREATE_PERMISSION" },
        defaults: { description: "Permission to create new permissions" }
    });

    const [permAssignRole] = await Permission.findOrCreate({
        where: { name: "assign_role" },
        defaults: { description: "Permission to assign roles to users" }
    });

    const [permReadRoles] = await Permission.findOrCreate({
        where: { name: "read_roles" },
        defaults: { description: "Permission to view roles" }
    });

    // اضافه کردن پرمیشن "ADMIN" برای دسترسی کامل ادمین
    const [permAdmin] = await Permission.findOrCreate({
        where: { name: "ADMIN" },
        defaults: { description: "Full access for admins" }
    });

    // ================= Roles =================
    const [adminRole] = await Role.findOrCreate({
        where: { title: "Admin" },
        defaults: { description: "Administrator role with full permissions" }
    });

    // اختصاص تمام پرمیشن‌ها به Role Admin
    await adminRole.setPermissions([permCreate, permAssignRole, permReadRoles, permAdmin]);

    // ================= Assign Admin Role to Users =================
    const users = await User.findAll({ where: { isAdmin: true } });

    for (const user of users) {
        await user.setRoles([adminRole]);
        console.log(`User ${user.full_name || user.id} assigned to Admin role with full permissions`);
    }
};
