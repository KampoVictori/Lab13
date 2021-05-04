<template>
  <form @submit.prevent="save">
    ПІБ <input type="text" v-model="worker.Name"><br>
    Посада <input type="text" v-model="worker.position"> <br>
    З/п <input type="number" v-model.number="worker.salary"> <br>
    К-сть дітей <input type="number" v-model.number="worker.count_kids" > <br>
    Стаж <input type="number" v-model.number="worker.experience" > <br>
    <button type="submit">Зберегти</button>
  </form>
</template>
<script>
import { mapActions } from "vuex";
import { showMessage, showErrorMessage } from "@/messaging";
import networking from "@/networking";
export default {
  data() {
    return {
      worker: {
        Name: "",
          position:"",
          salary: 0,
          count_kids: 0,
          experience: 0 
      },
    };
  },
  methods: {
    ...mapActions(["addBook"]),
    async save() {
      try {
        const newWorker = await this.addWorker(this.worker);
        if (newWorker) {
          showMessage("успіх", `Робітник ${newWorker.Name} доданий`);
          this.$router.push(`/worker/${newWorker._id}`);
        }
      } catch (err) {
        showErrorMessage(err);
      }
    },
  },
};
</script>