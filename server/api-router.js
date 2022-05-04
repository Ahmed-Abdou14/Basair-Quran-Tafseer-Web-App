import express from 'express';
import quranService from "./service/quran-service.js";

const apiRouter = express.Router();

apiRouter.route('/mahawer')
    .get(quranService.getSurahMahawerById)

apiRouter.route('/mahawer/sections')
    .get(quranService.getSurahMahawerSectionsByAyaatRange)

apiRouter.route('/juzs')
    .get(quranService.getQuranJuzs);
apiRouter.route('/juzs/:juzID')
    .get(quranService.getQuranJuzById);

apiRouter.route('/suwar')
    .get(quranService.getQuranSuwar);

apiRouter.route('/pages')
    .get(quranService.getQuranPages)
apiRouter.route('/pages/:index')
    .get(quranService.getQuranPageByIndex)

apiRouter.route('/quranokPage/:index')
    .get(quranService.getQuranokPageObjByIndex)

apiRouter.route('/ayaat')
    .get(quranService.getSuwarAyaat)
apiRouter.route('/ayaat/:id')
    .get(quranService.getSurahAyaatById)

apiRouter.route('/quarters')
    .get(quranService.getQuranQuarters)
apiRouter.route('/quarters/:index')
    .get(quranService.getQuranQuarterByIndex)

apiRouter.route('/tafsir')
    .get(quranService.getQuranTafsir)
apiRouter.route('/tafsir/:index')
    .get(quranService.getSurahTafsirById)

export default apiRouter;