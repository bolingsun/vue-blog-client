<template>
  <v-container fluid class="white">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        prepend-icon="mdi-account"
        type="text"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        name="password"
        prepend-icon="mdi-lock"
        type="password"
      />
      <div class="d-flex justify-center">
        <v-btn class="mr-2" color="warning" @click="handleLogin">
          登录
        </v-btn>
        <v-btn color="info" text @click="LinkToRegister">
          注册
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
// import { login } from "@/api/user";
export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"]
  }),

  methods: {
    handleLogin() {
      if (this.$refs.form.validate()) {
        // console.log("通过");
        let loginForm = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("user/login", loginForm)
          .then(() => {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            this.$router.push({
              path: "/"
            });
          })
          .catch(err => {
            console.log(err);
          });
        // login(para).then(res => {
        //   console.log(res);
        //   this.reset();
        // });
      } else {
        // console.log("不通过");
        return false;
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    LinkToRegister() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>
