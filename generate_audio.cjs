const fs = require('fs');
const https = require('https');
const path = require('path');

const exhibits = [
  {
    name: 'yvn-501-hy.mp3',
    lang: 'hy',
    text: 'Ցուցանմուշ YVN-501։ Մեկանգամյա պլաստիկ ջրի շիշ՝ Մաշտոցի պողոտա 24 հասցեում։ Բնության մեջ դրա քայքայումը կարող է տևել մոտ 450 տարի։'
  },
  {
    name: 'yvn-501-en.mp3',
    lang: 'en',
    text: 'Exhibit YVN-501. A single-use plastic water bottle documented at 24 Mashtots Avenue. It can take around 450 years to decompose in nature.'
  },
  {
    name: 'yvn-305-hy.mp3',
    lang: 'hy',
    text: 'Ցուցանմուշ YVN-305։ Ծխախոտի մնացորդներ՝ Կոմիտասի պողոտա 12 հասցեում։ Ծխախոտի ֆիլտրը կարող է բնության մեջ քայքայվել մոտ 12 տարվա ընթացքում։'
  },
  {
    name: 'yvn-305-en.mp3',
    lang: 'en',
    text: 'Exhibit YVN-305. Cigarette butts documented at 12 Komitas Avenue. A cigarette filter can take around 12 years to decompose in nature.'
  },
  {
    name: 'yvn-102-hy.mp3',
    lang: 'hy',
    text: 'Ցուցանմուշ YVN-102։ Մեկանգամյա էլեկտրոնային սիգարետ՝ Թումանյան փողոց 18 հասցեում։ Դրա քայքայումը կարող է տևել մոտ 500 տարի։'
  },
  {
    name: 'yvn-102-en.mp3',
    lang: 'en',
    text: 'Exhibit YVN-102. A disposable vape documented at 18 Tumanyan Street. Its materials can take around 500 years to decompose.'
  },
  {
    name: 'yvn-208-hy.mp3',
    lang: 'hy',
    text: 'Ցուցանմուշ YVN-208։ Մեկանգամյա սուրճի բաժակ՝ Գարեգին Նժդեհի հրապարակում։ Դրա քայքայումը կարող է տևել մոտ 30 տարի։'
  },
  {
    name: 'yvn-208-en.mp3',
    lang: 'en',
    text: 'Exhibit YVN-208. A takeaway coffee cup documented at Garegin Nzhdeh Square. It can take around 30 years to decompose.'
  },
  {
    name: 'yvn-409-hy.mp3',
    lang: 'hy',
    text: 'Ցուցանմուշ YVN-409։ Ջարդված ապակե շիշ՝ Շինարարների փողոց 14 հասցեում։ Ապակին բնության մեջ կարող է պահպանվել մոտ մեկ միլիոն տարի։'
  },
  {
    name: 'yvn-409-en.mp3',
    lang: 'en',
    text: 'Exhibit YVN-409. A shattered glass bottle documented at 14 Shinararner Street. Glass can remain in nature for around one million years.'
  }
];

const targetDir = path.join('/home/karen/YerevanPulse', 'public', 'audio', 'exhibits');

if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir, { recursive: true });
}

function downloadAudio(item, callback) {
  const encodedText = encodeURIComponent(item.text);
  const url = "https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=" + item.lang + "&q=" + encodedText;
  const filePath = path.join(targetDir, item.name);

  const file = fs.createWriteStream(filePath);
  https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      console.log('Downloaded:', item.name);
      callback();
    });
  }).on('error', function(err) {
    fs.unlink(filePath, () => {});
    console.error('Error downloading:', item.name, err.message);
    callback();
  });
}

let idx = 0;
function next() {
  if (idx < exhibits.length) {
    downloadAudio(exhibits[idx], () => {
      idx++;
      setTimeout(next, 500); // 500ms delay to avoid rate limiting
    });
  } else {
    console.log('All audio files generated successfully.');
  }
}

next();
