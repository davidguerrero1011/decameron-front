<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-4 my-5">
          <router-link class="btn btn-primary" to="/create">Crear Hotel</router-link>
        </div>
        <router-view />

        <div class="col-md-12">
          <table class="table table-bordered border-primary table-hover mb-5">
            <thead>
              <tr>
                <th scope="col" class="title-table">#</th>
                <th scope="col" class="title-table">Hotel</th>
                <th scope="col" class="title-table">Dirección</th>
                <th scope="col" class="title-table">Ciudad</th>
                <th scope="col" class="title-table">Nit</th>
                <th scope="col" class="title-table">Cuartos</th>
                <th scope="col" class="title-table">Estado</th>
                <th scope="col" class="title-table">Opciones</th>
              </tr>
            </thead>
            <tbody v-if="hotels.length > 0">
              <tr v-for="hotel in hotels" :key="hotel.id">
                <th scope="row" v-text="hotel.id"></th>
                <td v-text="hotel.name"></td>
                <td v-text="hotel.address"></td>
                <td v-text="hotel.name"></td>
                <td v-text="hotel.nit_number"></td>
                <td v-text="hotel.rooms"></td>
                <td :class="{ 'text-primary': hotel.state == 1, 'text-danger': hotel.state == 0 }">{{ hotel.state == 1 ? 'Activo' : 'Inactivo' }}</td>
                <td v-if="hotel.state == 1">
                  <router-link class="btn btn-outline-primary mx-4 shadow p-1 mb-5 rounded" :to="{ name: 'type', params: { id: hotel.id, name: hotel.name } }">Conf. Habitaciones</router-link>
                </td>
                <td v-else>
                  <button class="btn btn-outline-danger mx-4" @click="activateHotel(hotel.id)">Activar Hotel</button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td class="font-paragraps" colspan="8">No hay hoteles registrados todavia que mostrar.</td> 
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: "HelloWorld",
  data() {
    return {
      path: `http://127.0.0.1:8000/api/`,
      hotels: [],
    }
  },
  mounted() {
    this.getHotelsRegisters();
  },
  methods: {
    getHotelsRegisters() {
      axios.post(`${this.path}hotels`)
        .then((response) => {
          response.data.forEach(element => {
            this.hotels.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    activateHotel(id) {
      axios.post(`${this.path}activate`, {
        'id': id
      })
        .then((response) => {
          this.$swal({
              title: response.data[0].state == "success" ? 'Almacenado Exitoso' : 'Error',
              text: `${response.data[1].message}`,
              icon: response.data[0].state == "success" ? 'success' : 'error',
              confirmButtonText: 'Ok'
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.font-paragraps {
  color: blue;
}

.title-table {
  background-color: blue;
  color: white;
}
</style>
