<template>
  <div>
    <img alt="Vue logo" class="mb-3" src="../assets/decameron.png" />
    <div class="container">
      <h1 class="title-color">Crear Hotel</h1>
      <div class="row">
        <form class="row g-3" @submit="sendHotelRegisters" method="post">
          <div class="col-md-6">
            <label for="inputHotel" class="form-label">Nombre Hotel</label>
            <input type="text" class="form-control shadow p-3 mb-5 bg-white rounded" id="inputHotel" v-model="hotel" placeholder="Hotel"
            />
          </div>
          <div class="col-md-6">
            <label for="inputAddress" class="form-label">Dirección</label>
            <input
              type="text"
              class="form-control shadow p-3 mb-5 bg-white rounded"
              id="inputAddress"
              v-model="address"
              placeholder="Dirección"
            />
          </div>
          <div class="col-md-6">
            <label for="inputCities" class="form-label">Ciudades</label>
            <select id="inputCities" class="form-select shadow p-3 mb-5 bg-white rounded" v-model="cityId">
              <option selected>Escoja la ciudad...</option>
              <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.city }}</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="inputNit" class="form-label">Nit</label>
            <input
              type="text"
              class="form-control shadow p-3 mb-5 bg-white rounded"
              id="inputNit"
              v-model="nit"
              placeholder="Numero de identificación tributaria"
            />
          </div>
          <div class="col-md-6">
            <label for="inputRooms" class="form-label">Rooms</label>
            <input
              type="text"
              class="form-control shadow p-3 mb-5 bg-white rounded"
              id="inputRooms"
              v-model="rooms"
              placeholder="Número de Cuartos"
            />
          </div>
          <div class="col-md-6">
            <label for="inputCities" class="form-label">Estado</label>
            <select id="inputCities" class="form-select shadow p-3 mb-5 bg-white rounded" v-model="state">
              <option selected>Escoja el estado...</option>
              <option v-for="(state, index) in states" :key="index" :value="index">{{ state }}</option>
            </select>
          </div>
          <div class="col-12 my-5">
            <button type="submit" class="btn btn-primary mx-3 shadow p-3 mb-5 rounded">Crear</button>
            <button type="submit" class="btn btn-outline-primary shadow p-3 mb-5 rounded" @click="returnHistory">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: "CreateHotels",
  data() {
    return {
      path: `http://127.0.0.1:8000/api/`,
      cities: [],
      states: ["Inactivo", "Activo"],
      hotel:   null,
      address: null,
      cityId:  null,
      nit:     null,
      rooms:   null,
      state:   null,
      errors:  [],
    };
  },
  mounted() {
    this.getCities();
  },
  methods: {
    getCities() {
      axios
        .post(`${this.path}cities`)
        .then((response) => {
          response.data.forEach((element) => {
            this.cities.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendHotelRegisters(e) {

        let data = new FormData();
        data.append('hotel',   this.hotel);
        data.append('address', this.address);
        data.append('cityId',  this.cityId);
        data.append('nit',     this.nit);
        data.append('rooms',   this.rooms);
        data.append('state',   this.state);

        axios.post(`${this.path}store`, data)
        .then((response) => {
            this.$swal({
                title: response.data.state[0] == "success" ? 'Almacenado Exitoso' : 'Error',
                text: `${response.data.messages}`,
                icon: response.data.state[0] == "success" ? 'success' : 'error',
                confirmButtonText: 'Ok'
            });
            
            this.hotel = '';
            this.address = '';
            this.cityId = '';
            this.nit = '';
            this.rooms = '';
            this.state = '';

            if (response.data.state[0] == "success") {
                router.push({ name: 'home'});
            }

        })
        .catch((error) => {
          console.log(error);
        });

        e.preventDefault();

    },
    returnHistory() {
        router.push({ name: 'home'});
    }
  },
};
</script>

<style scoped>

.title-color {
  color: blue;
}

</style>