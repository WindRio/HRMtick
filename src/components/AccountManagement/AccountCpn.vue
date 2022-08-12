<template>
  <Authorization
    v-if="showUpdateModal == true"
    :visible="showUpdateModal"
    :cancel="handleCancelModal"
    :itemUpd="itemUpd"
  />
  <el-container class="container_account">
    <el-header class="header_account">
      <CreateOneInputForm :screen="'Account'" />
      <SearchCommon :handleSearch="handleSearch" />
    </el-header>
    <el-main class="main">
      <el-row class="width_100">
        <el-col :span="12">
          <el-table :data="AccountReducer.data" :border="true">
            <el-table-column label="Email" width="200%" align="center">
              <template #default="scope">
                <div class="flex_center">
                  <span class="table_span">{{ scope.row.email }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Role" width="" align="center">
              <template #default="scope">
                <el-popover
                  effect="light"
                  trigger="hover"
                  placement="top"
                  width="auto"
                  v-if="scope.row.listRole.length !== 0"
                >
                  <template #default>
                    <div
                      v-for="(role, index) in scope.row.listRole"
                      :key="index"
                      class="flex_center"
                    >
                      {{ role.name }}
                    </div>
                  </template>
                  <template #reference>
                    <el-tag class="cursor_default">{{
                      scope.row.listRole[0].name
                    }}</el-tag>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="Active" width="" align="center">
              <template #default="scope">
                <div class="flex_center">
                  <ActiveAccountCpn :account="scope.row" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Operations" align="center" width="180%">
              <template #default="scope">
                <button-common
                  :title="'Author'"
                  size="small"
                  @click="handleAuthor(scope.row)"
                />
                <button-common
                  icon="InfoFilled"
                  :title="Text.ViewProfileBtn"
                  size="small"
                  type="info"
                  @click="handleViewProfile(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <Profile
            :accountEmail="accountProps.email"
            :idAccount="accountProps.id"
          />
        </el-col>
      </el-row>
    </el-main>
    <el-footer
      ><PaginationCommon
        v-if="AccountReducer.totalPages"
        :totalPages="AccountReducer.totalPages"
        :handlePagination="handleNextPage"
        :activePage="AccountReducer.activePage"
    /></el-footer>
  </el-container>
</template>
<script>
import { reactive, ref } from "vue";
import { AccountStore, RoleStore } from "../../reducers/AccManageReducer";
import { getAccount } from "../../sagas/AccountManageSaga/AccountSaga";
import { getAllRole } from "../../sagas/AccountManageSaga/RoleSaga";
import { getProfile } from "../../sagas/AccountManageSaga/ProfileSaga";
import { Text } from "../../constants/commonConstants";
import { CreateOneInputForm, Authorization, ActiveAccountCpn } from "./Modal";
import { ButtonCommon, SearchCommon, PaginationCommon } from "../common";
import Profile from "./Profile.vue";
export default {
  name: "Account",
  components: {
    ButtonCommon,
    SearchCommon,
    PaginationCommon,
    CreateOneInputForm,
    Profile,
    Authorization,
    ActiveAccountCpn,
  },
  setup() {
    const AccountReducer = AccountStore();
    const RoleReducer = RoleStore();
    const idProfile = ref("");
    const accountProps = reactive({
      id: null,
      email: "",
    });
    const itemUpd = reactive({
      id: "",
      email: "",
      isActive: null,
      role: [],
    });
    const showUpdateModal = ref(false);
    const handleViewProfile = (row) => {
      getProfile(row.idProfile);
      accountProps.id = row.id;
      accountProps.email = row.email;
    };
    getAccount({ activePage: 1, textSearch: "" });
    getAllRole();
    const textSearchState = ref("");
    const handleSearch = (textSearch) => {
      getAccount({ activePage: 1, textSearch: textSearch.textSearchModel });
      textSearchState.value = textSearch.textSearchModel;
    };
    const handleNextPage = (i) => {
      getAccount({ activePage: i, textSearch: textSearchState.value });
      getProfile();
    };
    const handleCancelModal = () => {
      showUpdateModal.value = false;
    };
    const handleAuthor = (item) => {
      itemUpd.id = item.id;
      itemUpd.email = item.email;
      itemUpd.role = item.listRole;
      itemUpd.isActive = item.active;
      showUpdateModal.value = true;
    };
    return {
      AccountReducer,
      RoleReducer,
      idProfile,
      Text,
      handleViewProfile,
      handleSearch,
      handleNextPage,
      accountProps,
      handleCancelModal,
      showUpdateModal,
      itemUpd,
      handleAuthor,
    };
  },
};
</script>
<style scoped>
@import "../../styles/AccountManageStyle.css";
@import "../../styles/Common.css";
</style>
