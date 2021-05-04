<template>
<div>
<input type="button" value="Редагувати" @click="edit" >
    <ul>
        <li>
        <h3>ПІБ: {{ worker.Name}}</h3>
        <h3>Посада: {{ worker.position}}</h3>
        <h3>З/п: {{ worker.salary }}</h3>
        <h3>К-сть дітей: {{worker.count_kids }}</h3>
        <h3>Стаж: {{ worker.experience }}</h3>
        </li>
    </ul>
</div>
</template>

<script>
import networking from "@/networking";
import { showErrorMessage } from "@/messaging";
export default {
    props: {
        id: String
    },
    data(){
        return{
            worker: {}
        }
    },
    async mounted() {
    try {
      this.worker = await networking.getWorkerById(this.id);
      console.log(this.worker);
      if (this.worker) this.correctId = true;
      else this.correctId = false;
    } catch (err) {
      showErrorMessage(err);
    }
  },
    method:{
        edit(){
            this.$router.push(`${this.worker.id}/edit`);
        }
    }
}
</script>

<style scoped>
li{
    width: 250px;
    height: 300px;
}
</style>