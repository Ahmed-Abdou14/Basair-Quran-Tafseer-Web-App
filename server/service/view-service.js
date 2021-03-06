//repository
import QuranRepo from '../repository/quran-repo.js';
const quranRepo = new QuranRepo();

class ViewService {

    async redirectToQuranPage(req, res) {
        try {
            if(req.params.index && isNaN(req.params.index)) res.status(400).send('Bad Request');
            else if(!req.params.index) res.redirect('/quran')
            else res.cookie('pageIndex', req.params.index).redirect('/quran')
        } catch (e) {
            res.status(404).send(e);
        }
    }

    async renderQuranPage(req, res) {
        const quranokPage = await quranRepo.getQuranokPageObjByIndex(req.cookies.pageIndex);
        res.render('quran', {
            quranokPage,
            toArabicNumeral: (n) => n.toLocaleString('ar-sa')
        });
    }

    async renderNavigationPage(req, res) {
        try {
            const juzs = await quranRepo.getQuranJuzs().lean();
            res.render('navigation', {
                juzs
            });
        } catch (e) {
            res.status(404).send(e);
        }
    }

    async renderMahawerPage(req, res) {
        const mahawer = await quranRepo.getSurahMahawerById(req.query.surahId)?.lean();
        if(!mahawer) {
            const surah = await quranRepo.getQuranSurahById(req.query.surahId);
            res.status(404).send(`Surah: ${surah.englishName} does not have mahawer yet`)
        }
        res.render('mahawer', {
            mahawer
        });
    }
}

export default new ViewService();