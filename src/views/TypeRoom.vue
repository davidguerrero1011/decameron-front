<template>
  <div>
    <img alt="Vue logo" class="mb-3" src="../assets/decameron.png" />
    <div class="container">
      <h1 class="font-paragraps mb-5">
        Configuración Habitaciónes {{ hotelName }}
      </h1>

      <div class="row">
        <div class="col-md-4 my-4">
          <router-link
            class="btn btn-primary btn-lg shadow p-1 mb-5 rounded mx-4"
            :to="{ name: 'acommodation', params: { type: 1, hotel: id } }"
            >Crear</router-link
          >
        </div>
        <router-view />

        <div class="col-md-12">
          <table class="table table-bordered border-primary table-hover">
            <thead>
              <tr>
                <th scope="col" class="background-titles">#</th>
                <th scope="col" class="background-titles">
                  Total Cuartos Hotel
                </th>
                <th scope="col" class="background-titles">Tipo Cuarto</th>
                <th scope="col" class="background-titles">Acomodación</th>
                <th scope="col" class="background-titles">Número Cuarto</th>
                <th scope="col" class="background-titles">Opciones</th>
              </tr>
            </thead>
            <tbody v-if="(configuration = !0)">
              <tr v-for="details in detailsConfiguration" :key="details.id">
                <th scope="row" v-text="details.id"></th>
                <td v-text="details.rooms"></td>
                <td v-text="details.type"></td>
                <td v-text="details.type_acommodation"></td>
                <td v-text="details.rooms_number"></td>
                <td>
                  <router-link
                    class="btn btn-outline-primary mx-4 shadow p-1 mb-5 rounded"
                    :to="{
                      name: 'acommodation',
                      params: {
                        type: 2,
                        id: details.id,
                        hotel: details.hotel_id,
                      },
                    }"
                    >Editar</router-link
                  >
                  <button type="button" class="btn btn-outline-danger mx-4 shadow p-1 mb-5 rounded" @click="deleteRoom(details.id)">Borrar</button>
                </td>
              </tr>
            </tbody>

            <tbody v-else>
              <tr>
                <td colspan="7">
                  No hay cuartos configurados con acomodaciones.
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="submit"
            class="btn btn-outline-primary my-5 shadow p-1 mb-5 rounded"
            @click="returnHistory"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import router from "@/router";

export default {
  name: "TypeRoom",
  data() {
    return {
      path: `http://127.0.0.1:8000/api/`,
      id: null,
      hotel: [],
      configuration: 0,
      types: [],
      roomType: null,
      rooms: null,
      tAcommodation: null,
      detailsConfiguration: [],
      hotelName: null,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getHotel();

    let lengh = localStorage.getItem("conf");

    localStorage.setItem("hotelName", this.$route.params.name);
    this.hotelName = localStorage.getItem("hotelName");

    if (lengh != 0) {
      this.updateRoomsConf();
    }
  },
  methods: {
    getHotel() {
      axios
        .post(`${this.path}rooms`, {
          id: this.id,
        })
        .then((response) => {
          this.hotel = response.data.hotel;
          this.configuration = response.data.conf.length;
          console.log(response.data);
          localStorage.setItem("conf", this.configuration);

          response.data.type.forEach((element) => {
            this.types.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateRoomsConf() {
      axios
        .post(`${this.path}get-room`, {
          id: this.id,
        })
        .then((response) => {
          response.data.forEach((element) => {
            this.detailsConfiguration.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    storeRoomsConf(e) {

      let data = new FormData();
      data.append("roomType", this.roomType);
      data.append("tAcommodation", this.tAcommodation);
      data.append("rooms", this.rooms);
      console.log(`${this.path}store-conf`);

      axios
        .post(`${this.path}store-conf`, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      
      e.preventDefault();

    },
    returnHistory() {
      router.push({ name: "home" });
    },
    deleteRoom(id) {
      this.$swal({
      title: `Desea borrar la configuración del cuarto ${id}`,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {

      axios
        .delete(`${this.path}delete-room-conf/${id}`)
        .then((response) => {
          console.log(response);
          if (response.data[1] == "success") {
            this.$swal("Eliminado!", "", "success");
          } else {
            this.$swal("No se pudo eliminar!", "", "error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      } 
    });
    }
  },
};
</script>
  
  <style scoped>
.background-titles {
  background-color: blue;
  color: white;
}

.font-paragraps {
  color: blue;
}
</style>
  