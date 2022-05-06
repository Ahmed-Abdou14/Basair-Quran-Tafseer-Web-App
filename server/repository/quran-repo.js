import juz from "../model/juz.js";
import page from "../model/page.js";
import surah from "../model/surah.js";
import verse from "../model/verse.js";
import mehwar from "../model/mehwar.js";
import tafsir from "../model/tafsir.js";
import quarter from "../model/quarter.js";

export default class QuranRepo {

    /*Pages*/
    getQuranPages(surahID, aya) {
        surahID = Number(surahID)
        aya = Number(aya)
        if (aya && surahID) return this.getQuranPageBySurahAyaId(surahID, aya);
        else if (surahID) return this.getQuranPageBySurahId(surahID);
        else return page.find();
    }

    getQuranPageByIndex(index) {
        if (isNaN(index) || index > 604) index = 1;
        else if (index < 1) index = 604;
        return page.findOne({index});
    }

    getQuranPageBySurahId(surahID) {
        return page.aggregate([
            {
                $match: {
                    startingSura: {$lte: surahID},
                    endingSura: {$gte: surahID}
                }
            },
            {$sort: {startingAya: 1}}
        ]).then(agg => agg[0]);
    }

    getQuranPageBySurahAyaId(surahID, aya) {
        return page.aggregate([
            {
                $match: {
                    $or: [
                        {
                            'startingSura': {$eq: surahID}, 'endingSura': {$eq: surahID},
                            'startingAya': {$lte: aya},
                            'endingAya': {$gte: aya}
                        },
                        {
                            $and:[
                                {'startingSura': {$lte: surahID}, 'endingSura': {$gte: surahID}},
                                {$expr: {$ne: ['$startingSura', '$endingSura']}},
                                {
                                    $or: [
                                        {'startingSura': surahID, 'startingAya': {$lte: aya}},
                                        {'endingSura': surahID, 'endingAya': {$gte: aya}}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ]).then(agg => agg[0]);
    }

    async getQuranPageWithSuwarAyaatByIndex(pageIndex) {
        const p = await this.getQuranPageByIndex(pageIndex).lean();
        const suwar = await surah.aggregate([
            {
                '$match': {
                    'id': {
                        '$lte': p.endingSura,
                        '$gte': p.startingSura
                    }
                }
            },
            {
                '$lookup': {
                    'from': 'verses',
                    'localField': 'id',
                    'foreignField': 'id',
                    'as': 'verses'
                }
            },
            {'$set': {'verses': '$verses.verses'}},
            {'$unwind': {'path': '$verses'}},
            {
                '$addFields': {
                    'verses': {
                        '$slice': [
                            '$verses',
                            //index from where we start the ayaat, lets call it x
                            {
                                '$cond': [{'$eq': ['$id', p.startingSura]},
                                    p.startingAya - 1,
                                    0]
                            },
                            //y-x, where y is the index of last aya in page, y - x = (ayaat count)
                            {
                                '$cond': [{'$eq': ['$id', p.endingSura]},
                                    {$subtract: [p.endingAya, {'$cond': [{'$eq': ['$id', p.startingSura]}, p.startingAya - 1, 0]}]},
                                    1000]
                            }
                        ]
                    }
                }
            }
        ]);
        p.juzArabicName = (await this.getQuranJuzsBySurahAyaId(suwar[0].id, suwar[0].verses[0].id)).name.arabic?.replaceAll(' ', '-');
        p.suwar = suwar;
        return p
    }

    async getQuranokPageObjByIndex(index) {
        const p = await this.getQuranPageWithSuwarAyaatByIndex(index)
        for (const surah of p.suwar) {
            let iAya = surah.verses[0].id;
            const fAya = surah.verses[surah.verses.length - 1].id;

            let surahSections = await this.getSurahMahawerSectionsByAyaatRange(surah.id, iAya, fAya);
            if (surahSections.length) {
                surah.sections = surahSections.map(section => {
                    return { //slicing verses of surah depending on section (iAya sometimes > startAya)
                        verses: surah.verses.slice(Math.max(section.startAya - iAya, 0), section.endAya - iAya + 1),
                        summary: section.text
                    }
                });
            }

            const firstSectionAya = surahSections[0]?.startAya || 0;
            const lastSectionAya = surahSections?.pop()?.endAya || 0;
            if (iAya < firstSectionAya || fAya > lastSectionAya) {
                if (surahSections.length) {
                    surah.verses = [
                        ...surah.verses.slice(0, firstSectionAya - 1),
                        ...surah.verses.slice(lastSectionAya)
                    ]
                }
                const surahTafsir = (await this.getSurahTafsirById(surah.id)).ayat;
                surah.verses.map(verse => verse.tafsir = surahTafsir[verse.id - 1].text);
            } else delete surah.verses;
        }
        return p;
    }

    /*Ayaat*/
    getSuwarAyaat() {
        return verse.find();
    }

    getSurahAyaatById(id) {
        return verse.findOne({id});
    }

    /*Tafsir*/
    getQuranTafsir() {
        return tafsir.find();
    }

    getSurahTafsirById(index) {
        return tafsir.findOne({index});
    }

    /*Mahawer*/
    getSurahMahawerById(surahID) {
        return mehwar.findOne({surahID});
    }

    getSurahMahawerSectionsByAyaatRange(surahID, startAya, endAya) {
        return mehwar.aggregate([
            {'$match': {'surahID': surahID}},
            {'$unwind': {'path': '$mahawer'}},
            {'$replaceRoot': {'newRoot': '$mahawer'}},
            {'$unwind': {'path': '$sections'}},
            {'$replaceRoot': {'newRoot': '$sections'}},
            {
                '$match': {
                    'startAya': {'$lte': endAya},
                    'endAya': {'$gte': startAya}
                }
            }
        ]);
    }

    /*Quarters*/
    getQuranQuarters() {
        return quarter.find();
    }

    getQuranQuarterByIndex(index) {
        return quarter.findOne({index});
    }

    /*Suwar*/
    getQuranSuwar(embedJuz) {
        if (embedJuz == 'true') return this.getQuranSuwarWithJuzEmbedded();
        return surah.find();
    }
    getQuranSurahById(id) {
        return surah.findOne({id});
    }
    getQuranSuwarWithJuzEmbedded() {
        return surah.aggregate([
            {
                '$lookup': {
                    'from': 'juzs',
                    'localField': 'juz',
                    'foreignField': 'index',
                    'as': 'juz'
                }
            },
            {'$unwind': {'path': '$juz'}}
        ]).then(agg => agg);
    }

    /*Juz*/
    getQuranJuzs() {
        return juz.find();
    }
    getQuranJuzById(index) {
        return juz.findOne({index});
    }
    getQuranJuzsBySurahAyaId(surahId, aya){
        return juz.aggregate([
            {
                '$match': {
                    '$or': [
                        {'sura': {'$lt': surahId}},
                        {'sura': surahId,'aya': {'$lte': aya}}
                    ]
                }
            },
            {'$sort': {'index': 1}}
        ]).then(agg => agg.pop());
    }
}