<template>
  <div class="my-footer is-small">
    <div class="hero-body">
      <div class="columns is-centered">
        <div class="column is-3">
          <h3>Acerca de</h3>
          <p class="margin-bottom-10">
            CubaPod es la plataforma cubana de podcasting.
          </p>
          <p class="margin-bottom-10">
            Surgió como una iniciativa para visibilizar la obra de los
            podcásters cubanos y hoy se ha convertido en el hogar de las voces
            de Cuba.
          </p>
          <p>
            <nuxt-link to="/acerca-de">Leer más...</nuxt-link>
          </p>
        </div>
        <div class="column is-2">
          <h3>Herramientas</h3>
          <ul>
            <li>
              <a href="https://t.me/CubaPodBot">
                <b-icon
                  icon="telegram"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                Bot en Telegram
              </a>
            </li>
            <li>
              <nuxt-link to="/podcaster">
                <b-icon
                  icon="lock"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                Zona de podcásters
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="column is-2">
          <h3>Acércate</h3>
          <ul>
            <li>
              <a
                href="https://www.notion.so/cubapod/CubaPod-94980743e7a848e89847d87dc84672ba"
                target="_blank"
              >
                <b-icon
                  icon="help-circle"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Ayuda</span>
              </a>
            </li>
            <li>
              <nuxt-link to="/contacto">
                <b-icon
                  icon="card-account-mail"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Contacto</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/academia">
                <b-icon
                  icon="school"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Academia</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link to="/donaciones">
                <b-icon
                  icon="heart"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Donaciones</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/datos">
                <b-icon
                  icon="chart-bar"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Datos y cifras</span>
              </nuxt-link>
            </li>
            <!-- li>
              <a href="https://rebrand.ly/BoletinCubaPod" target="_blank">
                <b-icon
                  icon="email-newsletter"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Boletín mensual</span>
              </a>
            </li -->
          </ul>
        </div>
        <div class="column is-2">
          <h3>Comunidad</h3>
          <ul>
            <li>
              <a href="https://medium.com/cubapod" target="_blank">
                <b-icon
                  icon="post-outline"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Blog</span>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/intent/follow?screen_name=CubaPod"
                target="_blank"
              >
                <b-icon
                  icon="twitter"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a href="https://facebook.com/CubaPod" target="_blank">
                <b-icon
                  icon="facebook"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://t.me/CubaPod" target="_blank">
                <b-icon
                  icon="telegram"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Telegram</span>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/company/cubapod" target="_blank">
                <b-icon
                  icon="linkedin"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/cuba.pod" target="_blank">
                <b-icon
                  icon="instagram"
                  size="is-small"
                  style="margin-right: 5pt"
                ></b-icon>
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="columns is-centered margin-top-10">
        <div
          class="column is-6 is-12 mobile"
          style="padding-left: 10pt; padding-right: 10pt"
        >
          <p class="has-text-centered margin-bottom-10">
            CubaPod es una plataforma sin fines de lucro y se sostiene gracias
            al apoyo de su comunidad. Considera apoyarnos con una
            <nuxt-link to="/donaciones">donación</nuxt-link>.
          </p>
          <div class="has-text-centered margin-top-20">
            <!-- nuxt-link to="/terminos">
              Términos de uso
            </nuxt-link>
            <i class="separator"></i>
            <nuxt-link to="/privacidad">
              Política de privacidad
            </nuxt-link>
            <i class="separator"></i -->
            <nuxt-link to="/equipo">
              Equipo
            </nuxt-link>
            <i class="separator"></i>
            <nuxt-link to="/prensa">
              Prensa
            </nuxt-link>
            <i class="separator"></i>
            <a href="https://stats.uptimerobot.com/P6B67I4Nnm" target="_blank">
              Status
            </a>
            <i class="separator"></i>
            <a href="https://developers.cubapod.net" target="_blank">
              API
            </a>
          </div>
          <p class="has-text-centered margin-top-20">
            <img
              src="/img/cubapod.jpg"
              alt=""
              width="60pt"
              style="border-radius: 50%"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.my-footer {
  padding: 40pt 20pt 40pt 20pt;
}
.my-footer a {
  color: #000000;
}
.my-footer h3 {
  margin-bottom: 10pt;
}
.separator::after {
  content: '·';
  margin: 0 10pt 0 10pt;
}
</style>
