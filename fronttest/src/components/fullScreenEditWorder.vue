<template>
   <form  v-on:submit.prevent = "save">
    ПІБ <input type="text" v-model.lazy="editWorker.Name"><br>
    Посада <input type="text" v-model.lazy="editWorker.position"> <br>
    З/п <input type="number" v-model.number.lazy="editWorker.salary"> <br>
    К-сть дітей <input type="number" v-model.number.lazy="editWorker.count_kids" > <br>
    Стаж <input type="number" v-model.number.lazy="editWorker.experience" > <br>
    <button type="submit" >Редагувати </button>
    <button type="reset"> Очистити </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import networking from "@/networking";
import { showMessage } from "@/messaging";
export default {
    props: {
        id: String
    },
    data(){
        return {
      worker: {},
      correctId: false,
    };
    },
    async mounted() {
    this.worker = await networking.getWorkerById(this.id);
    if (this.worker) this.correctId = true;
    else this.correctId = false;
  },
    method:{
        ...mapActions(["updateWorker"]),
    async save() {
      this.worker._id = this.id;
      if (this.worker.file) {
        const file = await networking.uploadImage(this.worker.file);
        const baseUrl = "https://localhost:3443";
        this.worker.Cover =`${baseUrl}/files/${file.filename}`;
      }
      const updatedWorker = await this.updateWorker(this.worker);
      if (updatedWorker) {
        showMessage("Успіх", `Успішно оновлено ${updatedWorker.Name}`);
        this.$router.push(`/worker/${updatedWorker._id}`);
      }
    },
    }
}
</script>