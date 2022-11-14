<template>
  <div class="app">
    <overlay v-if="!isConnected">
      <loader/>
    </overlay>

    <registration
        v-else-if="isRegistration"
        class="app__registration"
        :uuid="uuid"
        @registered="onRegistered"
    />

    <component
      :is="userComponent"
      :prop="userProp"
      @init="initAdminParams"
      @updateIsRegistrationActive="toggleRegistration"
      @clearAll="clearUserList"
    />
  </div>
</template>

<script>
import Registration from "@/components/Registration";
import UserPage from "@/components/users-page/UserPage";
import AdminPage from "@/components/users-page/AdminPage";
import Loader from "@/components/ui-kit/Loader";
import Overlay from "@/components/ui-kit/Overlay";
import { USER_MODS } from "@/libs/constants";
import RequestManager from "@/libs/request-manager/RequestManager";
import { getUuid, saveTeamTitle } from "@/libs/utils";

export default {
  name: 'App',
  components: { Overlay, Loader, UserPage, Registration, AdminPage },
  data() {
    return {
      isRegistration: true,
      isConnected: false,
      teamTitle: null,
      uuid: getUuid(),
      mode: USER_MODS.DEFAULT_USER,
      userList: null,
      isRegistrationActive: null,
      pressedUsers: null,
    }
  },
  async created() {
    await this.initWebSocket()
    this.initRequestManager()
    await this.checkRegistration();
    this.isConnected = true
  },
  computed: {
    userComponent() {
      if (this.mode === USER_MODS.DEFAULT_USER) return 'UserPage'
      else if (this.mode === USER_MODS.ADMINISTRATOR) return 'AdminPage'
      return ''
    },
    userProp() {
      if (this.mode === USER_MODS.DEFAULT_USER) return {}
      else if (this.mode === USER_MODS.ADMINISTRATOR) return {
        userList: this.userList,  isRegistrationActive: this.isRegistrationActive, pressedUsers: this.pressedUsers
      }
      return {}
    }
  },
  methods: {
    async checkRegistration() {
      const { data } = await this._rm.request('isRegistered', { uuid: this.uuid })
      if (data.isRegistered) {
        this.teamTitle = data.teamTitle
        this.isRegistration = false

        saveTeamTitle(this.teamTitle)
      }
    },
    async onRegistered(userInfo) {
      this.teamTitle = userInfo.teamTitle;
      this.isRegistration = false;
      saveTeamTitle(this.teamTitle)
      const { data } = await this._rm.request('signUp', { uuid: this.uuid, teamTitle: this.teamTitle })
      this.mode = data.mode
    },
    initWebSocket() {
      return new Promise((resolve) => {
        this._ws = new WebSocket('ws://localhost:9001');

        this._ws.addEventListener('open', () => {
          this._ws.binaryType = 'arraybuffer'
          this._ws.addEventListener('message', this.messageHandler)
          this._ws.addEventListener('error', this.errorHandler)
          resolve()
        })
      })
    },
    async fetchUserList() {
      console.log('1234')
      const { data } = await this._rm.request('getUserList')
      this.userList = data.userList
    },
    async toggleRegistration(isActive) {
      const { data } = await this._rm.request('toggleRegistration', { isActive })
      this.isRegistrationActive = data.isRegistrationActive
    },
    async fetchPressedUsers() {
      const { data } = await this._rm.request('getPressedUsers')
      this.pressedUsers = data.pressedUsers
      console.log(data.pressedUsers)
    },
    initRequestManager() {
      this._rm = new RequestManager(this._ws, this.uuid);

      this._rm.addEventListener('updateUserList', this.fetchUserList)
      this._rm.addEventListener('updatePressedUsers', this.fetchPressedUsers)
    },
    initAdminParams() {
      this.fetchUserList();
      this.toggleRegistration();
      this.fetchPressedUsers()
    },
    async clearUserList() {
      const { data } = await this._rm.request('clearUserList')
      console.log(data)
      await this.fetchUserList()
      console.log('userList')
    },
    messageHandler(message) { console.log(message.data) },
    errorHandler(error) { console.log(error) }
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
}

.app {
  height: 100%;
  display: block;
  font-size: 16px;
  line-height: 1.25;
  font-family: serif;
  user-select: none;
  background-color: #09470c;
  color: white;
  padding: 20px 20px 40px;
  box-sizing: border-box;
  overflow: auto;


  &__registration {
    position: absolute !important;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
