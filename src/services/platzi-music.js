import trae from "trae";
import configService from "./config";

const platziMusicSerive = trae.create({
  baseUrl: configService.apiUrl
});

export default platziMusicSerive;
