import * as cheerio from 'cheerio';

async function loadEasterEgg(day){
    fetch(`https://adventofcode.com/2023/day/${day}`)
    .then(response => response.text())
    .then(html => {
        const $ = cheerio.load(html);
        const span = $("body main span");
        const title = $(span).attr().title;
        const text = $(span).html();
        return {day, text, title}
    })
}



loadEasterEggs();
async function loadEasterEggs() {
    try {
      const responses = await Promise.all(Array.from({length: 25},(_,i)=> {
        return fetch(`https://adventofcode.com/2023/day/${i+1}`)
            .then(response => response.text())
            .then(html => {
                if(i+1 == 3)console.log(html)
                const $ = cheerio.load(html);
                const span = $("body main span");
                const title = $(span).attr().title;
                const text = $(span).html();
                return {day: i+1, text, title}
            })
      }))
      console.log(responses);

      
    } catch (err) {
      console.log(err);
    }
  }