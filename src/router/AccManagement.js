import Employee from '../pages/AccountManagementPage/EmployeeAccount.vue'
import Role from '../pages/AccountManagementPage/RolePage.vue'
import Permissions from '../pages/AccountManagementPage/PermissionPage.vue'
import * as Path from '../constants/commonConstants/Path';

const EmployeeRoute = {
    component: Employee, name: Path.EmployeeName, path: Path.Employee
}

const RoleRoute = {
    component: Role, name: Path.RoleName, path: Path.Role
}

const PermissionsRoute = {
    component: Permissions, name: Path.PermissionsName, path: Path.Permissions
}

export {
    EmployeeRoute, RoleRoute, PermissionsRoute
}