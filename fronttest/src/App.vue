<template>
<div>
  <nav>
    <router-link to="/">Головна</router-link>
        <router-link to="/about">Про автора</router-link>
      <router-link to="/worker/new"> Додати робітника </router-link>
      <p3 v-if="storage.login">
        Ви увійшли як <b>{{ storage.login }}</b>
        <input type="button" value="вийти" @click="sign_out"/>
      </p3>
      <router-link to="/signin" v-else> Увійти </router-link>
  </nav>
  <router-view></router-view>
  </div>
</template>

<script>
import auth from "@/auth";
import Message from "@/components/Message";
import SignInStatusPanel from "@/components/SignInStatusPanel";
export default {
  name: "App",
  data() {
    return {};
  }, 
  components: {
    Message,
    SignInStatusPanel
  },
  mounted() {
    auth.restoreSignInStatus();
  },
};
</script>

