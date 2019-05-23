<template lang="pug">
  .container(v-if="track && track.album")
    .columns
      .column.is-3.has-text-centered
        figure.media-left
          p.image
            img(:src="track.album.images[0].url")
          p
            a.button.is-primary.is-large 
              span.icon(@click="selectTrack") 🔊 
      .column.is-8
        .panel
          .panel-heading
            h2.title {{ trackTitle }}
          .panel-block
            article.media-content
              .media-content
                .content
                  ul(v-for="(v, k) in track")
                    li
                      strong {{ k }}:&nbsp;
                      span {{ v }}
              nav.level
                .level-left
                  a.level-item
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import trackMixin from "@/mixins/track";
export default {
  mixins: [trackMixin],
  created() {
    const id = this.$route.params.id;
    if (!this.track || !this.track.id || this.track.id !== id) {
      this.getTrackById({ id }).then(() => {
        console.log("Track loaded.");
      });
    }
  },
  computed: {
    ...mapState(["track"]),
    ...mapGetters(["trackTitle"])
  },
  methods: {
    ...mapActions(["getTrackById"])
  }
};
</script>

<style lang="scss" scoped>
.columns {
  margin: 20px;
}
</style>
