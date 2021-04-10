<template>
  <div @click="clickHandle">
    <div class="userinfo" @click="bindViewTap">
      <img
        class="userinfo-avatar"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      />
      <img
        class="userinfo-avatar"
        src="/static/images/user.png"
        background-size="cover"
      />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input
        type="text"
        class="form-control"
        :value="motto"
        placeholder="v-model"
      />
      <input
        type="text"
        class="form-control"
        v-model="motto"
        placeholder="v-model"
      />
      <input
        type="text"
        class="form-control"
        v-model.lazy="motto"
        placeholder="v-model.lazy"
      />
    </form>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div class="all">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <date-select />
  </div>
</template>

<script>
import card from "@/components/card";
import DateSelect from "@/components/DateSelect";

export default {
  data() {
    return {
      motto: "Hello miniprograme",
      userInfo: {
        nickName: "mpvue",
        avatarUrl: "http://mpvue.com/assets/logo.png",
      },
    };
  },

  components: {
    card,
    DateSelect,
  },

  methods: {
    bindViewTap() {
      let self = this;
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        self.$miniapp.switchTab("logs");
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    },
  },

  created() {
    // let app = getApp()
  },
};
</script>

<style lang="stylus" scoped>
.userinfo-nickname {
  color: themeColor;
}
</style>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
}
</style>
