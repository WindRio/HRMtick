<template>
  <div>
    <el-table :data="TickAccountStore.data" style="width: 100%">
      <el-table-column label="Account" width="400%">
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
      <PaginationCommon
        v-if="TickAccountStore.totalPages"
        :totalPages="TickAccountStore.totalPages"
        :handlePagination="handleNextPage"
        :activePage="TickAccountStore.activePage"
      />
    </div>
  </div>

  <el-drawer
    v-model="drawer"
    direction="rtl"
    :before-close="handleClose"
    size="40%"
    title="Update Role"
  >
    <template #default>
      <el-table
        ref="TickSelection"
        :data="TickRoleStore.dataRole"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="Name" width="120">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="Description" width="120">
          <div>Day la role</div>
        </el-table-column>
      </el-table>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">Cancel</el-button>
        <el-button type="primary" @click="confirmClick">Confirm</el-button>
      </div>
      <div style="display: flex; justify-content: center">
        <PaginationCommon
          v-if="TickRoleStore.totalPages"
          :totalPages="TickRoleStore.totalPages"
          :handlePagination="handleNextPageTick"
          :activePage="TickRoleStore.activePage"
        />
      </div>
      <el-button type="primary" @click="sumArr">SUM ARR</el-button>
    </template>
  </el-drawer>
</template>
<script>
import { ElMessageBox, ElTable } from "element-plus";
import { nextTick, reactive, ref, watchEffect } from "vue";
import TickRoleReducer from "../reducers/TickRoleReducer";
import { updateAccount, getRoleTick } from "../sagas/TickSaga";
import TickAccountReducer from "../reducers/TickAccountReducer";
import { getAccount } from "../sagas/TickSaga";
import PaginationCommon from "./common/PaginationCommon.vue";
// import PaginationCommonTick from "./PaginationCommonTick.vue";
export default {
  components: { PaginationCommon },
  setup() {
    const drawer = ref(false);
    const TickRoleStore = TickRoleReducer();
    const TickSelection = ref(ElTable);
    const ChangeSelection = ref();
    let dataR = ref();
    const listRoleState = reactive({
      id: "",
      page: 1,
      roleState: [],
    });
    const updItem = reactive({
      id: "",
      listRole: [],
    });
    const TickAccountStore = TickAccountReducer();
    const handleSelectionChange = (val) => {
      ChangeSelection.value = val;
      console.log(ChangeSelection.value, "ChangeSelection");
    };
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          done();
          drawer.value = false;
          listRoleState.id = "";
          listRoleState.roleState = [];
          TickSelection.value.clearSelection();
        })
        .catch(() => {});
    };

    const cancelClick = () => {
      drawer.value = false;
      listRoleState.id = "";
      listRoleState.roleState = [];
      TickSelection.value.clearSelection();
    };
    const confirmClick = () => {
      ElMessageBox.confirm(`Are you confirm to chose  ?`)
        .then(() => {
          drawer.value = false;
          updateAccount();
        })
        .catch(() => {});
    };

    const breakProxy = reactive({ proxy: [], RoleState: [], resultArr: [] });
    const handleEdit = async (row) => {
      drawer.value = true;
      listRoleState.id = row.id;
      listRoleState.roleState = row.role;
      // console.log(listRoleState.roleState, "account Role");
      breakProxy.RoleState = row.role;
      await nextTick();
      for (let i in dataR.value) {
        listRoleState.roleState.forEach((row) => {
          if (dataR.value[i].id === row.id) {
            TickSelection.value.toggleRowSelection(dataR.value[i], undefined);
          }
        });
      }
    };

    const handleNextPageTick = async (i) => {
      getRoleTick({ activePage: i });
      listRoleState.page = i;
    };
    const sumArr = () => {
      // listRoleState.roleState = ChangeSelection.value;
      breakProxy.proxy = ChangeSelection.value;
      // breakProxy.proxy.forEach((item) => {
      //   breakProxy.RoleState.push(item);
      // });
      let arr = breakProxy.proxy.concat(breakProxy.RoleState);
      console.log(arr);
      console.log(breakProxy.RoleState, "lllllllllll`");
      let newArr1 = [];
      let newArr2 = [];
      let newArr3 = []; //duplicate array
      let newArr4 = [];
      let newArr5 = []; //unduplicate array
      let check = [];
      let split = arr.filter((filter) => {
        const checkDuplicate = newArr1.includes(filter.name);
        if (!checkDuplicate) {
          newArr1.push(filter.name);
          // console.log(newArr1, 'arrN1')
        } else {
          newArr2.push(filter.name);
          // console.log(newArr2, 'arrN2')
        }
      });
      for (let i = 0; i < arr.length; i++) {
        const checkDuplicate = newArr2.includes(arr[i].name);
        if (!checkDuplicate) {
          newArr3.push(arr[i]);
          // console.log(newArr3, 'No duplicate')
        } else {
          newArr4.push(arr[i]);
          // console.log(newArr4, "arr duplicate");
        }
      }
      for (let i = 0; i < newArr4.length; i++) {
        const checkDuplicate = check.includes(newArr4[i].name);
        // console.log(checkDuplicate, 'checkDuplicate')
        if (!checkDuplicate) {
          // console.log(newArr4[i], 'arr4')
          check.push(newArr4[i].name);
          // console.log(check, 'checker')
          newArr5.push(newArr4[i]);
          // console.log(newArr5, 'arr5')
        }
      }
      console.log(newArr5, "duplicate 3");
      console.log(newArr3, "no duplicate 5");
      console.log(newArr5.concat(newArr3), "tong")
      console.log(split, "no duplicate array");
      // for (let i in breakProxy.RoleState) {
      //   for (let j in breakProxy.proxy) {
      //     console.log(breakProxy.RoleState[i].id, breakProxy.proxy[j].id);
      //     if (breakProxy.RoleState[i].id !== breakProxy.proxy[j].id) {
      //       console.log("k trung");
      //     } else {
      //       console.log("trung")
      //     }
      //   }
      //   // if (!breakProxy.resultArr.includes(breakProxy.RoleState[i])) {
      //   //   console.log("1")
      //   //   console.log(breakProxy.RoleState[i])
      //   //   breakProxy.resultArr.push(breakProxy.RoleState[i]);
      //   // } else {
      //   //   console.log("2")
      //   // }
      // }
    };
    watchEffect(async () => {
      if (dataR.value !== TickRoleStore.dataRole) {
        dataR.value = TickRoleStore.dataRole;
        await nextTick();
        for (let i in dataR.value) {
          listRoleState.roleState.forEach((row) => {
            if (dataR.value[i].id === row.id) {
              TickSelection.value.toggleRowSelection(dataR.value[i], undefined);
            }
          });
        }
      }
    });
    getAccount({ activePage: 1 });
    getRoleTick({ activePage: 1 });
    return {
      handleSelectionChange,
      TickRoleStore,
      TickAccountStore,
      handleClose,
      drawer,
      cancelClick,
      confirmClick,
      TickSelection,
      updItem,
      handleEdit,
      handleNextPageTick,
      sumArr,
    };
  },
  methods: {
    handleNextPage(i) {
      getAccount({ activePage: i });
    },
  },
};
</script>
<style></style>
