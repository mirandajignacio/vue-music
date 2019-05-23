import platziMusicSerive from "./platzi-music";

const trackService = {};

trackService.search = function(q) {
  const type = "track";

  return platziMusicSerive
    .get("/search", {
      params: {
        q,
        type
      }
    })
    .then(res => res.data);
};

trackService.getById = function(id) {
  return platziMusicSerive.get(`/tracks/${id}`).then(res => res.data);
};

export default trackService;
