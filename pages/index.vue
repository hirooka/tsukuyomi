<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Tsukuyomi
        </v-card-title>
        <v-card-text>
          <p>streaming...</p>
          <hr class="my-3">
          <a
            href="https://github.com/hirooka/tsukuyomi"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub (Tsukuyomi)
          </a>
          <br>
          <a
            href="https://github.com/hirooka/izanagi"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub (Izanagi)
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/epg"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
