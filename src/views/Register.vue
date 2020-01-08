<template>
  <v-container fluid class="white">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        prepend-icon="mdi-email"
        type="text"
      ></v-text-field>

      <v-text-field
        v-model="username"
        :rules="usernameRules"
        label="Username"
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
        <v-btn color="info" @click="handleRegister">
          注册
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { register } from "@/api/user";
export default {
  name: "Register",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    username: "",
    usernameRules: [v => !!v || "Username is required"],
    passwordRules: [v => !!v || "Password is required"]
  }),

  methods: {
    handleRegister() {
      if (this.$refs.form.validate()) {
        let loginForm = {
          username: this.username,
          email: this.email,
          password: this.password
        };
        register(loginForm)
          .then(() => {
            this.$router.push({ path: "/login" });
            this.reset();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
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
    }
  }
};
</script>
