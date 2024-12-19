<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-4 col-xl-4 my-5">
          <router-link class="btn btn-primary" to="/create">Crear Hotel</router-link>
        </div>
        <router-view />

        <div class="col-md-12 col-sm-12 col-xl-12">
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
                <td>
                  <button :class="{ 'btn btn-primary': hotel.state == 1, 'btn btn-danger': hotel.state == 0 }" @click="activateOrInactiveHotel(hotel.id, hotel.state)">
                    {{ hotel.state == 1 ? 'Activo' : 'Inactivo' }}
                  </button>  
                </td>
                <td class="align-middle" v-if="hotel.state == 1">
                  <router-link class="btn btn-outline-primary shadow mx-3 p-1 rounded" :to="{ name: 'type', params: { id: hotel.id, name: hotel.name } }">Conf. Habitaciones</router-link>
                  <button class="btn btn-outline-danger" @click="borrarHotel(hotel.id)">Borrar</button>
                </td>
                <td v-else></td>
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
      stateButton: null,
    }
  },
  mounted() {
    this.getHotelsRegisters();
  },
  watch: {
    
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
    activateOrInactiveHotel(id, state) {
      this.stateRegister = state;
      axios.post(`${this.path}activate`, {
        'id': id,
        'state': state
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
    },
    borrarHotel(id) {
      this.$swal({
      title: `Desea borrar el hotel ${id}`,
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {

      axios
        .delete(`${this.path}delete-hotel/${id}`)
        .then((response) => {
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
