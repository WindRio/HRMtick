<template>
  <UpdatePermissionModal
    :visible="showUpdateModal"
    :cancel="handleCancelModal"
    :itemUpd="itemUpd"
  />
  <el-container class="container_account">
    <el-header class="header_permission">
      <SearchCommon :handleSearch="handleSearch" />
    </el-header>
    <el-main class="flex_center">
      <el-table
        :data="PermissionReducer.data"
        class="width_70"
        :border="true"
        size="large"
      >
        <el-table-column label="Name Permission" width="" align="center">
          <template #default="scope">
            <div class="flex_center">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Description" width="" align="center">
          <template #default="scope">
            <div class="flex_center">
              <span style="margin-left: 10px">{{ scope.row.description }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="" align="center">
          <template #default="scope">
            <button-common
              @click="handleEdit(scope.row)"
              type="warning"
              :title="Text.EditBtn"
              icon="Edit"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer
      ><PaginationCommon
        v-if="PermissionReducer.totalPages"
        :totalPages="PermissionReducer.totalPages"
        :handlePagination="handleNextPage"
        :activePage="PermissionReducer.activePage"
    /></el-footer>
  </el-container>
</template>
<script>
import { ref, reactive } from "vue";
import { Text, Message } from "../../constants/commonConstants";
import PermissionStore from "../../reducers/AccManageReducer/PermissionReducer";
import { getPermission } from "../../sagas/AccountManageSaga/PermissionSaga";
import UpdatePermissionModal from "./Modal/UpdatePermissionModal.vue";
import { ButtonCommon, SearchCommon, PaginationCommon } from "../common";
export default {
  name: "Permission",
  components: {
    ButtonCommon,
    UpdatePermissionModal,
    SearchCommon,
    PaginationCommon,
  },
  setup() {
    const PermissionReducer = PermissionStore();
    const showUpdateModal = ref(false);
    const itemUpd = reactive({
      id: "",
      name: "",
      description: "",
    });
    const handleEdit = (item) => {
      itemUpd.id = item.id;
      itemUpd.name = item.name;
      itemUpd.description = item.description;
      showUpdateModal.value = true;
    };
    const handleCancelModal = () => {
      showUpdateModal.value = false;
    };
    const textSearchState = ref("");
    const handleSearch = (textSearch) => {
      getPermission({ activePage: 1, textSearch: textSearch.textSearchModel });
      textSearchState.value = textSearch.textSearchModel;
    };
    const handleNextPage = (i) => {
      getPermission({ activePage: i, textSearch: textSearchState.value });
    };
    getPermission({ activePage: 1, textSearch: "" });
    return {
      PermissionReducer,
      Text,
      Message,
      showUpdateModal,
      handleEdit,
      handleCancelModal,
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
