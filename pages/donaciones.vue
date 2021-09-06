<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">
          Ayúdanos a difundir el podcasting cubano
        </h1>

        <div class="columns is-centered">
          <div class="column is-6-desktop is-12-mobile">
            <p class="margin-bottom-10">
              CubaPod es una plataforma sin fines de lucro y se sostiene gracias
              al apoyo de su comunidad.
            </p>
            <p>
              El 25 de agosto
              <a
                href="https://medium.com/cubapod/cubapod-dice-adi%C3%B3s-be35c9c31bf0"
                target="_blank"
              >
                anunciamos
              </a>
              la situacción de irrentablilidad de nuestro proyecto. Intentamos
              salvar esta plataforma y necesitamos tu ayuda para eso, considera
              dejar una donación.
            </p>
          </div>
        </div>

        <!-- QvaPay -->
        <div class="columns is-centered">
          <div class="column is-narrow is-12-mobile has-text-centered">
            <div class="card">
              <div class="card-content">
                <a href="https://qvapay.com/payme/CubaPod">
                  <img src="/img/donations/qvapay.png" alt="QvaPay" />
                </a>
                <p>
                  <a href="https://qvapay.com/payme/CubaPod">
                    https://qvapay.com/payme/CubaPod
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- end QvaPay -->

        <div class="columns is-centered">
          <!-- Transfermóvil -->
          <div
            class="column is-narrow is-12-mobile"
            style="padding-left: 10pt; padding-right: 10pt"
          >
            <div class="card">
              <div class="card-content">
                <p class="has-text-centered margin-bottom-10">
                  <b>CUP / Transfermóvil</b>
                </p>
                <p class="has-text-centered">
                  <img
                    src="/img/donations/transfermovil.png"
                    alt=""
                    width="250pt"
                  />
                </p>
              </div>
            </div>
          </div>
          <!-- endTransfermóvil -->

          <!-- EnZona -->
          <div
            class="column is-narrow is-12-mobile"
            style="padding-left: 10pt; padding-right: 10pt"
          >
            <div class="card">
              <div class="card-content">
                <p class="has-text-centered margin-bottom-10">
                  <b>CUP / EnZona</b>
                </p>
                <p class="has-text-centered">
                  <img src="/img/donations/enzona.png" alt="" width="250pt" />
                </p>
              </div>
            </div>
          </div>
          <!-- end EnZona -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  head() {
    const title = 'Donaciones | CubaPod'
    return {
      title,
      meta: [
        { name: 'og:title', content: title },
        { name: 'twitter:title', content: title }
      ]
    }
  }
}
</script>

<style scoped></style>
