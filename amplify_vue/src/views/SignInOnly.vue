<template>
  <amplify-sign-in v-if="!signedIn"
                   v-bind:signInConfig="options.signInConfig"
                   v-bind:usernameAttributes="options.usernameAttributes">
  </amplify-sign-in>
</template>

<script>
  import { components } from 'aws-amplify-vue'

  export default {
    name: 'app',
    components: {
      components
    },

    data: function () {
      return {
        options: {
          signInConfig: {
            // SignUpリンクを表示するか
            isSignUpDisplayed: false,
            header: '[overwrite] my header',
          },
          usernameAttributes: '[overwrite] my user name',
        },
        signedIn: false,
      }
    }
  }
</script>

<style scoped>

</style>