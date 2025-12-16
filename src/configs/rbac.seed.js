import { Permission, Role } from "../modules/RBAC/rbac.model.js";
import { User } from "../modules/user/user.model.js";

export const seedPermissionsAndRoles = async () => {

    // Create or find the "CREATE_PERMISSION" permission
    const permCreate = await Permission.findOrCreate({
        where: { name: "CREATE_PERMISSION" },
        defaults: { description: "Permission to create new permissions" }
    });

    // Create or find the "assign_role" permission
    const permAssignRole = await Permission.findOrCreate({
        where: { name: "assign_role" },
        defaults: { description: "Permission to assign roles to users" }
    });

    // Create or find the "read_roles" permission
    const permReadRoles = await Permission.findOrCreate({
        where: { name: "read_roles" },
        defaults: { description: "Permission to view roles" }
    });

    // Create or find the "Admin" role
    const [adminRole] = await Role.findOrCreate({
        where: { title: "Admin" },
        defaults: { description: "Administrator role with full permissions" }
    });

    // Assign all created permissions to the Admin role
    await adminRole.setPermissions([permCreate[0], permAssignRole[0], permReadRoles[0]]);

    // Find all users marked as isAdmin = true
    const users = await User.findAll({
        where: { isAdmin: true }
    });

    // Assign the Admin role to all users who are admins
    for (const user of users) {
        await user.setRoles([adminRole]);
        console.log(`User ${user.full_name || user.id} assigned to Admin role`);
    }
};