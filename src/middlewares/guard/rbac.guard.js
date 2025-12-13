import createHttpError from "http-errors";
import { User } from "../../modules/user/user.model.js";
import { Role, Permission } from "../../modules/RBAC/rbac.model.js";

export const rbacGuard = (requiredPermissions = [], requireAll = true) => {
  return async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw createHttpError(401, "Unauthorized");
      }

          // Fetch user along with roles and permissions
      const user = await User.findByPk(req.user.id, {
        include: [
          {
            model: Role,
            as: "roles",
            attributes: ["id", "title"],
            include: [
              {
                model: Permission,
                as: "permissions",
                attributes: ["name"]
              }
            ]
          }
        ]
      });

      if (!user) {
        throw createHttpError(401, "User not found");
      }

      // Gather all permissions of the user
      const userPermissions = new Set(
        user.roles.flatMap(role => role.permissions.map(p => p.name))
      );

      // If no specific permission is required, allow access
      if (!requiredPermissions || requiredPermissions.length === 0) {
        return next();
      }

      // Ensure requiredPermissions is an array
      const permissions = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      const hasAccess = requireAll
        ? permissions.every(p => userPermissions.has(p))
        : permissions.some(p => userPermissions.has(p));

      if (!hasAccess) {
        console.log("Access denied. User permissions:", [...userPermissions], "Required:", permissions);
        throw createHttpError(403, "Access denied");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};