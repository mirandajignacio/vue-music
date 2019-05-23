<template lang="pug">
  main
    transition(name="move")
      pm-notification(v-show="showNotification")
        p(slot="body") No se encontraron resultados
    transition(name="move")
      pm-loader(v-show="isLoading")
    section.section
      nav.nav.has-shadow
        .container
          input.input.is-large(
            type="text",
            placeholder="Buscar canciones"
            v-model="searchQuery"
            @keyup.enter="search")
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p
          small {{searchMessage}}
      .container
        .columns.is-multiline
          .column.is-one-quarter(v-for="t in tracks")
            pm-track(
              v-blur="t.preview_url",
              :class="{'is-active': t.id === selectedTrack}",
              :track="t",
              @select="setSelectedTrack"
            )
</template>

<script>
import PmLoader from "@/components/shared/Loader.vue";
import PmTrack from "@/components/Track.vue";
import PmNotification from "@/components/shared/Notification.vue";
import trackService from "@/services/track";
export default {
  name: "app",
  data() {
    return {
      searchQuery: "",
      isLoading: false,
      showNotification: false,
      selectedTrack: {},
      tracks: []
    };
  },
  methods: {
    search() {
      this.isLoading = true;
      if (!this.searchQuery) {
        return;
      }
      trackService.search(this.searchQuery).then(res => {
        console.log(res);
        this.showNotification = res.tracks.total === 0;
        this.tracks = res.tracks.items;
        this.isLoading = false;
      });
    },
    setSelectedTrack(id) {
      console.log(id);
      this.selectedTrack = id;
    }
  },
  computed: {
    searchMessage() {
      return `Encontrados: ${this.tracks.length}`;
    }
  },
  watch: {
    showNotification() {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      }
    }
  },
  components: {
    PmTrack,
    PmLoader,
    PmNotification
  }
};
</script>

<style lang="scss">
.is-active {
  border: 3px #23d160 solid;
}
</style>

