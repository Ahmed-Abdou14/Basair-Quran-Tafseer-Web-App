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
        loadModel(tafsir, 'tafsir.json'),
        loadModel(verse, 'verses.json'),
        loadModel(page, 'pages.json'),
        loadModel(quarter, 'quarters.json'),
        loadModel(surah, 'surahs.json'),
        loadModel(juz, 'juzs.json'),
        loadModel(mehwar, 'mahawer.json')
    ])
}
async function loadModel (model, file) {
    let docCount = await model.estimatedDocumentCount()
    if(!docCount) {
        const data = await fs.readJson(path.join(path.resolve(), `server/json/${file}`))
        await model.create(data);
    }
}
