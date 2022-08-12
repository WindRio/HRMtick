<template>
  <div>
    <el-table :data="TickAccountStore.data" style="width: 100%">
      <el-table-column label="Name" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Role" width="300%" style="display: flex">
        <template #default="scope">
          <el-tag v-for="role in scope.row.role" :key="role.id">{{
            role.name
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center">
      <Pagination
        v-if="TickAccountStore.totalPages"
        :totalPages="TickAccountStore.totalPages"
        :handlePagination="handlePaginationAccount"
        :activePage="TickAccountStore.activePage"
      />
    </div>
  </div>
  <div>
    <!-- v-if="drawer" -->
    <el-drawer v-model="drawer" direction="rtl" title="THIS IS ROLE" size="50%">
      <template #default>
        <div>
          <el-table
            ref="multipleTableRef"
            :data="pageRole"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="100" />
            <el-table-column label="Name" width="120">
              <template #default="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="Description" width="200">
              <div>Day chi la role ao</div>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template #footer>
        <div
          style="display: flex; justify-content: center; padding-bottom: 200px"
        >
          <Pagination
            v-if="TickRoleStore.totalPages"
            :totalPages="TickRoleStore.totalPages"
            :handlePagination="handlePaginationRole"
            :activePage="TickRoleStore.activePage"
          />
        </div>
        <div style="flex: auto">
          <el-button @click="handleCancel">cancel</el-button>
          <el-button type="primary" @click="handleConfirm">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script>
import { ElTable } from "element-plus";
import { nextTick, reactive, ref, watch, watchEffect } from "vue";
import TickAccountReducer from "../reducers/TickAccountReducer";
import TickRoleReducer from "../reducers/TickRoleReducer";
import { getAccount, getRoleTick } from "../sagas/TickSaga";
import Pagination from "./common/PaginationCommon.vue";
export default {
  components: {
    Pagination,
  },
  setup() {
    getAccount({ activePage: 1 });
    getRoleTick({ activePage: 1 });
    const TickAccountStore = TickAccountReducer();
    const TickRoleStore = TickRoleReducer();
    const multipleTableRef = ref(ElTable);
    const pageRole = ref([]);
    const currentPage = ref(1);
    const pageBack = ref(false);
    const drawer = ref(false);
    const currentState = reactive({
      id: "",
      prevRoles: [],
      currentRoles: [],
      nextRoles: [],
    });
    const handleEdit = (row) => {
      drawer.value = true;
      currentState.prevRoles = row.role;
      currentState.currentRoles = row.role;
      currentState.id = row.id;
    };
    const handleSelectionChange = (val) => {
      currentState.nextRoles = val;
      console.log(currentState.nextRoles, "this is changing");
    };
    // watch(TickRoleStore.dataRole, (current) => {
    //   // console.log(current, prev, "this is fukkkkkkkkkkkkkkkkkkkkkkk");
    //   console.log(current)
    //   if (TickRoleStore?.storagePageRole[currentPage.value - 1] !== current) {
    //     pageRole.value = TickRoleStore.dataRole;
    //     console.log("???????????????????????????")
    //   }
    // });
    watch(pageRole, (current, prev) => {
      // console.log(current, prev, "this is fukkkkkkkkkkkkkkkkkkkkkkk");
      if (current !== prev && current.length !== 0) {
        TickRoleStore.storagePageRole.push({
          page: currentPage.value,
          data: current,
        });
      }
    });
    watch(
      () => currentState.nextRoles,
      (current, prev) => {
        if (current !== prev) {
          if (TickRoleStore.storageRoleItem.length !== 0) {
            for (let i in TickRoleStore.storageRoleItem) {
              if (currentPage.value > TickRoleStore.storageRoleItem.length) {
                TickRoleStore.storageRoleItem.push({
                  page: currentPage.value,
                  data: current,
                });
                console.log("object", TickRoleStore.storageRoleItem);
              } else {
                TickRoleStore.storageRoleItem[currentPage.value - 1].data =
                  current;
                console.log(i);
                console.log("not not", TickRoleStore.storageRoleItem);
              }
            }
          } else {
            TickRoleStore.storageRoleItem.push({
              page: currentPage.value,
              data: current,
            });
            console.log("not", TickRoleStore.storageRoleItem);
          }
        }
      }
    );
    watchEffect(async () => {
      if (pageBack.value == false) {
        pageRole.value = TickRoleStore.dataRole;
      } else {
        for (let i in TickRoleStore.storagePageRole) {
          if (currentPage.value == TickRoleStore.storagePageRole[i].page) {
            pageRole.value = TickRoleStore.storagePageRole[i].data;
          }
        }
      }
      // console.log(
      //   TickRoleStore.storagePageRole,
      //   "storagePageRole",
      //   TickRoleStore.storageRoleItem,
      //   "storageRoleItem"
      // );
      // }
      if (drawer.value && currentState.nextRoles.length == 0) {
        await nextTick();
        pageRole.value.forEach((allRoles) => {
          currentState.currentRoles.forEach((role) => {
            if (allRoles.id == role.id) {
              multipleTableRef.value.toggleRowSelection(allRoles, undefined);
            }
          });
        });
      }
    });

    const handlePaginationRole = (i) => {
      currentPage.value = i;
      if (TickRoleStore.storageRoleItem.length >= i) {
        pageBack.value = true;
        for (let i in TickRoleStore.storageRoleItem) {
          if (currentPage.value == TickRoleStore.storageRoleItem[i].page) {
            currentState.currentRoles = TickRoleStore.storageRoleItem[i].data;
          }
        }
      } else {
        pageBack.value = false;
        getRoleTick({ activePage: i });
        currentState.currentRoles = currentState.prevRoles;
      }
    };
    return {
      TickAccountStore,
      TickRoleStore,
      drawer,
      multipleTableRef,
      pageRole,
      handleSelectionChange,
      handleEdit,
      handlePaginationRole,
    };
  },
  methods: {
    handlePaginationAccount(i) {
      getAccount({ activePage: i });
    },
    handleConfirm() {
      this.drawer = false;
    },
    handleCancel() {
      this.drawer = false;
      this.multipleTableRef.clearSelection();
    },
  },
};
</script>
<style></style>
