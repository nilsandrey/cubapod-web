<template>
  <div>
    <!-- header -->
    <div class="cover">
      <section class="section">
        <div class="hero">
          <div class="hero-body">
            <h1 class="title has-text-white has-text-centered">
              Grabar pódcast en estudio profesional
            </h1>
            <div class="columns is-centered margin-bottom-20">
              <div class="column is-6 is-12-mobile">
                <p class="has-text-white">
                  Tenemos un estudio profesional que ofrece todos los servicios
                  necesarios, desde grabación, edición y masterización,
                  producción musical y más.
                </p>
              </div>
            </div>
            <div class="has-text-centered">
              <a href="#reservar">
                <b-button
                  type="is-primary"
                  size="is-large"
                  icon-left="calendar"
                >
                  Reserva tu cita
                </b-button>
              </a>
              <p class="has-text-white has-text-centered margin-top-10">
                <b>$375 CUP / hora</b>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- end header -->

    <!-- photos -->
    <section class="section">
      <div class="columns is-mobile is-multiline">
        <div
          v-for="img in [0, 1, 2, 3, 4, 5, 6, 7]"
          :key="img"
          class="column is-3-desktop is-4-tablet is-12-mobile"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-1by1">
                <img :src="`/img/studio/0${img}.png`" alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end photos -->

    <!-- reserve -->
    <div class="cover2">
      <section id="reservar" class="section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-6-desktop is-8-tablet is-12-mobile">
              <div class="card">
                <div class="card-content">
                  <div class="has-text-centered">
                    <img src="/img/studio/rr-brand.png" alt="" width="100pt" />
                  </div>
                  <h2 class="subtitle has-text-centered">
                    <span v-if="form.success">
                      Recibimos tu mensaje
                    </span>
                    <span v-if="!form.success">
                      Reserva tu cita
                    </span>
                  </h2>
                  <div v-if="form.success">
                    ¡Muchas gracias por reservar tu cita! Nos pondremos en
                    contacto contigo muy pronto.
                  </div>
                  <div v-if="!form.success">
                    <form
                      name="contact"
                      method="POST"
                      @submit.prevent="submitForm"
                    >
                      <!-- name -->
                      <label for="" class="label">Tu nombre</label>
                      <b-field>
                        <b-input
                          v-model="$v.form.name.$model"
                          icon="account"
                          placeholder="Tu nombre"
                          :disabled="form.loading"
                          @blur="$v.form.name.$touch()"
                        ></b-input>
                      </b-field>
                      <p
                        v-if="$v.form.name.$invalid && $v.form.name.$anyError"
                        class="has-text-danger margin-bottom-10"
                      >
                        <small>
                          <b-icon icon="alert-box" size="is-small"></b-icon>
                          ¿Cómo te llamas?
                        </small>
                      </p>
                      <!-- end name -->

                      <!-- email -->
                      <label for="" class="label">Tu correo</label>
                      <b-field>
                        <b-input
                          v-model="$v.form.email.$model"
                          native-type="email"
                          icon="email"
                          placeholder="alguien@ejemplo.com"
                          :disabled="form.loading"
                          @blur="$v.form.email.$touch()"
                        ></b-input>
                      </b-field>
                      <p
                        v-if="$v.form.email.$invalid && $v.form.email.$anyError"
                        class="has-text-danger margin-bottom-10"
                      >
                        <small>
                          <b-icon icon="alert-box" size="is-small"></b-icon>
                          Especifica tu correo y verifica que sea correcto.
                        </small>
                      </p>
                      <!-- end email -->

                      <!-- phone -->
                      <label for="" class="label">
                        Teléfono
                        <span><small>(opcional)</small></span>
                      </label>
                      <b-field>
                        <b-input
                          v-model="form.phone"
                          icon="phone"
                          placeholder="Tu teléfono"
                          :disabled="form.loading"
                        ></b-input>
                      </b-field>
                      <!-- end phone -->

                      <!-- message -->
                      <label for="" class="label">
                        Mensaje
                        <span><small>(opcional)</small></span>
                      </label>
                      <b-field>
                        <b-input
                          v-model="form.message"
                          type="textarea"
                          placeholder="¿Algo que necesitas que sepamos para reservar tu cita?"
                          :disabled="form.loading"
                        ></b-input>
                      </b-field>
                      <!-- end message -->

                      <p class="margin-bottom-10">
                        <b>Ubicación:</b>
                        <span>Playa, La Habana, Cuba</span>
                      </p>

                      <p class="margin-bottom-10">
                        <b>Precio:</b>
                        <span>$375 CUP / hora, una vez confirmada la cita</span>
                      </p>

                      <info class="margin-bottom-10">
                        Su mensaje será entregado al equipo de República
                        Records, nuestro estudio de grabación asociado. Se
                        pondrán en contacto con usted para confirmar la cita.
                      </info>

                      <b-button
                        type="is-primary"
                        size="is-medium"
                        native-type="submit"
                        icon-left="calendar"
                        expanded
                        :loading="form.loading"
                        :disabled="$v.form.$invalid"
                      >
                        Reservar cita
                      </b-button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- end reserve -->
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  auth: false,

  data() {
    return {
      form: {
        name: null,
        email: null,
        phone: null,
        message: null,
        loading: false,
        success: false
      }
    }
  },

  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },

    submitForm() {
      this.form.loading = true
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      this.$axios
        .$post(
          'https://formspree.io/f/xnqlalrq',
          this.encode({
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            message: this.form.message
          }),
          axiosConfig
        )
        .then(() => {
          this.form.loading = false
          this.form.success = true
        })
    }
  },

  head() {
    const title = 'Grabar en estudio | CubaPod'
    return {
      title,
      meta: [
        { name: 'og:title', content: title },
        { name: 'twitter:title', content: title }
      ]
    }
  },

  validations: {
    form: {
      name: { required },
      email: { required, email }
    }
  }
}
</script>

<style scoped>
.cover {
  background: url('/img/studio/cover.jpg');
  background-size: cover;
}
.cover .section {
  background: rgba(0, 0, 0, 0.7) !important;
}
.cover2 {
  background: url('/img/studio/cover2.jpg');
  background-size: cover;
}
.cover2 .section {
  background: rgba(0, 0, 0, 0.3) !important;
}
</style>
