//Models
import juz from "../model/juz.js";
import page from "../model/page.js";
import surah from "../model/surah.js";
import verse from "../model/verse.js";
import mehwar from "../model/mehwar.js";
import tafsir from "../model/tafsir.js";
import quarter from "../model/quarter.js";

//Libraries
import fs from "fs-extra";
import path from "path";

export async function loadModels() {
    await Promise.all([
        loadModel(page, 'pages.json'),
        loadModel(verse, 'verses.json'),
        loadModel(tafsir, 'tafsir.json'),
        loadModel(mehwar, 'quran-mahawer.json'),
        loadModel(quarter, 'quarters.json'),
        loadModel(surah, 'surahs.json'),
        loadModel(juz, 'juzs.json')
    ])
}
async function loadModel (model, file) {
    const docCount = await model.estimatedDocumentCount()
    if(!docCount) {
        const data = await fs.readJson(path.join(path.resolve(), `server/json/${file}`))
        await model.create(data);
        console.log(`${file} loaded successfully!`);
    }
}

/*
export async function fixSurahsJson() {
    const suwar = await fs.readJson(path.join(path.resolve(), `server/json/surahs.json`));
    const juzs = await fs.readJson(path.join(path.resolve(), `server/json/juzs.json`))

    for (const surah of suwar) {
        for (const juz of juzs) {
            if(juz.sura === surah.id){
                if(juz.aya === 1)
                    surah.juz = juz.index
                else surah.juz = juz.index-1;
                break;
            }else if(juz.sura > surah.id){
                surah.juz = juz.index-1
                break;
            }
        }
    }
    await fs.outputFile(path.join(path.resolve(), `server/json/surahs.json`), JSON.stringify(suwar))
}*/
