<template>
  <UpdateRoleModal
    v-if="showUpdateModal == true"
    :visible="showUpdateModal"
    :cancel="handleCancelModal"
    :itemUpd="itemUpd"
  />
  <el-container class="container_account">
    <el-header class="header_account">
      <CreateOneInputForm :screen="'Role'" />
      <SearchCommon :handleSearch="handleSearch" />
    </el-header>
    <el-main class="flex_center">
      <el-table :data="RoleReducer.data" class="width_90" :border="true">
        <el-table-column label="Role" width="210" align="center">
          <template #default="scope">
            <div class="flex_center">
              <span class="table_span">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Permission" width="" align="center">
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
            >
              <template #default>
                <div
                  v-for="(permission, index) in scope.row.listPermission"
                  :key="index"
                  class="flex_center"
                >
                  {{ permission.name }}
                </div>
              </template>
              <template #reference>
                <el-tag class="cursor_default">{{
                  scope.row.listPermission[0]
                    ? scope.row.listPermission[0].name
                    : "Not Permission"
                }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Operations" align="center">
          <template #default="scope">
            <button-common
              @click="handleEdit(scope.row)"
              type="warning"
              :title="Text.EditBtn"
              icon="Edit"
            />
            <button-common
              type="danger"
              @click="handleDelete(scope.row.id)"
              :title="Text.DeleteBtn"
              icon="Delete"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer
      ><PaginationCommon
        v-if="RoleReducer.totalPages"
        :totalPages="RoleReducer.totalPages"
        :handlePagination="handleNextPage"
        :activePage="RoleReducer.activePage"
    /></el-footer>
  </el-container>
</template>
<script>
import { reactive, ref } from "vue";
import RoleStore from "../../reducers/AccManageReducer/RoleReducer";
import { getRole, deleteRole } from "../../sagas/AccountManageSaga/RoleSaga";
import { UpdateRoleModal, DeleteModal, CreateOneInputForm } from "./Modal";
import { Text } from "../../constants/commonConstants";
import { ButtonCommon, SearchCommon, PaginationCommon } from "../common";
export default {
  name: "Employee",
  components: {
    ButtonCommon,
    SearchCommon,
    UpdateRoleModal,
    PaginationCommon,
    CreateOneInputForm,
  },
  setup() {
    const RoleReducer = RoleStore();
    const selectAccIndex = ref(0);
    const showUpdateModal = ref(false);
    const itemUpd = reactive({
      id: "",
      name: "",
      permissions: [],
    });
    const handleCancelModal = () => {
      showUpdateModal.value = false;
    };
    const handleEdit = (item) => {
      itemUpd.id = item.id;
      itemUpd.name = item.name;
      itemUpd.permissions = item.listPermission;
      showUpdateModal.value = true;
    };
    const handleDelete = (id) => {
      DeleteModal({
        message: "Do you want to delete this role?",
        id: id,
        key: "Role",
      });
    };
    const textSearchState = ref("");
    const handleSearch = (textSearch) => {
      getRole({ activePage: 1, textSearch: textSearch.textSearchModel });
      textSearchState.value = textSearch.textSearchModel;
    };
    const handleNextPage = (i) => {
      getRole({ activePage: i, textSearch: textSearchState.value });
    };
    getRole({ activePage: 1, textSearch: "" });
    return {
      RoleReducer,
      Text,
      showUpdateModal,
      selectAccIndex,
      deleteRole,
      handleCancelModal,
      handleEdit,
      handleDelete,
      itemUpd,
      handleSearch,
      handleNextPage,
    };
  },
};
</script>
<style scoped>
@import "../../styles/AccountManageStyle.css";
@import "../../styles/Common.css";
</style>
