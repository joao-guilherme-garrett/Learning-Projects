<template>
  <v-footer dark padless>
    <v-card flat tile class="black white--text py-12 px-5" width="100%">
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="4" class="pa-16">
          <v-toolbar color="transparent" flat>
            <v-badge color="#D5F0DB" dot>
              <v-img src="1.png" contain width="30"></v-img>
            </v-badge>

            <v-toolbar-title class="ml-4">
              <span class="green--text">e</span><strong>My Groceries</strong>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-0">
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-1 white--text"
              icon
              fab
              outlined
              small
            >
              <v-icon size="20px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="2">
          <v-card-text class="white--text pt-0">
            <h3>Sobre</h3>
          </v-card-text>
          <v-card-text class="grey--text"> Como funciona </v-card-text>
          <v-card-text class="grey--text mt-n4"> Nossos programas </v-card-text>
          <v-card-text class="grey--text mt-n4"> Promoções </v-card-text>
          <v-card-text class="grey--text mt-n4"> Indique um amigo </v-card-text>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="2">
          <v-card-text class="white--text pt-0">
            <h3>Dellvery</h3>
          </v-card-text>
          <v-card-text class="grey--text"> Preço do delivery </v-card-text>
          <v-card-text class="grey--text mt-n4"> Métodos de pagamento </v-card-text>
          <v-card-text class="grey--text mt-n4"> Acompanhe a entrega </v-card-text>
          <v-card-text class="grey--text mt-n4"> Retornos </v-card-text>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4">
          <v-card-text class="white--text pt-0">
            <h3>Contato</h3>
          </v-card-text>
          <v-card-text class="grey--text"> My Groceries </v-card-text>
          <v-card-text class="grey--text mt-n4">
            Rua Exemplar, 456
          </v-card-text>
          <v-card-text class="grey--text mt-n4"> www.mygroceries.com </v-card-text>
          <v-card-text class="grey--text mt-n4"> 41 3333 9999 </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      "fab fa-apple",
      "fab fa-google-plus-g",
      "fab fa-twitter",
      "fab fa-facebook-f",
    ],
  }),
};
</script>

<style>
</style>