<template>
  <el-container class="layout-container-demo nav_container">
    <el-aside width="250px">
      <el-scrollbar>
        <el-menu
          :default-openeds="['1']"
          :router="true"
          :default-active="Path.Employee"
        >
          <el-menu-item
            index="/"
            style="
              flex-direction: column;
              justify-content: center;
              height: 20vh;
            "
          >
            <el-avatar
              :size="50"
              :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
            />
            <div>admin</div>
          </el-menu-item>
          <el-menu-item index="/Dashboard">
            <el-icon><HomeFilled /></el-icon> {{ Text.NavDashboard }}
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><UserFilled /></el-icon>{{ Text.NavAccManager }}
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="Path.EmployeeName"
                @click="handleClickTitle(Text.NavAccEmployee)"
                >{{ Text.NavAccEmployee }}</el-menu-item
              >
              <el-menu-item
                :index="Path.Role"
                @click="handleClickTitle(Text.NavRoles)"
                >{{ Text.NavRoles }}</el-menu-item
              >
              <el-menu-item
                :index="Path.Permissions"
                @click="handleClickTitle(Text.NavPermissions)"
                >{{ Text.NavPermissions }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="/" @click="logout">{{ Text.LogoutTitle }}</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="nav_header">
        <div class="title_header">{{ Screen }}</div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { ref } from "vue";
import { Text, Path } from "../../constants/commonConstants";
export default {
  components: {},
  setup() {
    const activePage = ref(1);
    const Screen = ref("Dashboard");
    const totalPages = ref("");
    const handleClickTitle = (title) => {
      Screen.value = title;
    };
    return {
      Text,
      Path,
      Screen,
      totalPages,
      activePage,
      handleClickTitle,
    };
  },
  methods:{
    logout(){
      localStorage.removeItem("token")
      location.reload()
    }
  }
};
</script>
<style scoped>
@import "../../styles/NavStyle.css";
.layout-container-demo .el-header {
  position: relative;
  background-color: #52535594;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #F0F2F5;
}
</style>
