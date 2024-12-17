<template>
  <div>
    <img alt="Vue logo" class="mb-3" src="../assets/decameron.png" />
    <div class="container">
      <div class="row">
        <h1 class="font-paragraps">
          {{ type == 1 ? "Crear" : "Editar" }} Configuración Cuartos
        </h1>

        <form class="row g-3" method="post" @submit="storeConfig">
          <div class="col-md-6">
            <label for="inputRoomsType" class="form-label">Tipo Cuarto</label>
            <select
              id="inputRoomsType"
              class="form-select shadow p-3 mb-5 bg-white rounded"
              v-model="room"
              :value="roomArrayConf.rooms_number"
              @change="getAcommodation"
            >
              <option selected>Seleccione el tipo de cuarto...</option>
              <option
                v-for="roomType in roomsType"
                :key="roomType.id"
                :value="roomType.id"
              >
                {{ roomType.type }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="inputAcommodationType" class="form-label"
              >Tipo Acomodación</label
            >
            <select
              id="inputAcommodationType"
              class="form-select shadow p-3 mb-5 bg-white rounded"
              v-model="typeAcommodation"
            >
              <option selected>Seleccione el tipo de acomodación...</option>
              <option
                v-for="acommodance in acommodances"
                :key="acommodance.id"
                :value="acommodance.id"
              >
                {{ acommodance.type_acommodation }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="inputRoomConf" class="form-label"
              >Cuarto a asignar</label
            >
            <input
              type="text"
              class="form-control shadow p-3 mb-5 bg-white rounded"
              id="inputRoomConf"
              v-model="numberRooms"
            />
          </div>
          <div class="col-md-12 mt-5">
            <button type="submit" class="btn btn-primary mx-3 shadow rounded">
              {{ type == 1 ? 'Crear' : 'Editar' }}  Hotel
            </button>
            <router-link
              type="submit"
              class="btn btn-outline-primary my-5 shadow rounded"
              :to="{ name: 'type', params: { id: hotel.id } }"
              >Volver</router-link
            >
          </div>
          <router-view />
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script>
import router from "@/router";

export default {
  name: "Acommodation",
  data() {
    return {
      path: `http://127.0.0.1:8000/api/`,
      confId: null,
      roomsType: [],
      acommodances: [],
      hotel: null,
      room: null,
      numberRooms: null,
      typeAcommodation: null,
      id: null,
      type: null,
      roomConf: null,
      roomArrayConf: []
    };
  },
  mounted() {
    this.type = this.$route.params.type;
    this.hotel = this.$route.params.hotel;

    if (this.type == 2) {
      this.id = this.$route.params.id;
    }

    this.getRooms();
    this.getRoomConfig();
  },
  methods: {
    getRooms() {
      axios
        .post(`${this.path}store-conf`)
        .then((response) => {
          response.data.forEach((element) => {
            this.roomsType.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAcommodation() {
      let data = new FormData();
      data.append("roomId", this.room);

      axios
        .post(`${this.path}acommodations`, data)
        .then((response) => {
          this.acommodances = [];
          response.data.acommodations.forEach((element) => {
            this.acommodances.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    storeConfig(e) {
      let data = new FormData();
      data.append("room", this.room);
      data.append("typeAcommodation", this.typeAcommodation);
      data.append("roomConf", this.roomConf);
      data.append("hotelId", this.hotel);

      axios
        .post(`${this.path}store-configuration`, data)
        .then((response) => {
          this.$swal({
            title:
              response.data.status == "success"
                ? "Asignacion Acomodamiento Exitoso"
                : "Error en Asignación",
            text: `${response.data.message}`,
            icon: response.data.status == "success" ? "success" : "warning",
            confirmButtonText: "Ok",
          });

          this.room = "";
          this.typeAcommodation = "";
          this.roomConf = "";

          if (response.data.status == "success") {
            router.push({ name: "type", params: { id: this.hotel } });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      e.preventDefault();
    },
    getRoomConfig() {
      let data = new FormData();
      data.append("id", this.id);

      axios
        .post(`${this.path}get-room-conf`, data)
        .then((response) => {
          this.numberRooms = response.data.rooms_number;
          this.typeAcommodation = response.data.acommodation_type_id;
          console.log(response.data);
          console.log(response.data.rooms_number);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>
  
<style scoped>
.font-paragraps {
  color: blue;
}
</style>