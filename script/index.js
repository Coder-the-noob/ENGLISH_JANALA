const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(' ');
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    if(status === true ){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else{
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach((btn) => btn.classList.remove('active'));
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((json) => {

        removeActive(); // remove active class from all buttons
        // add active class to the clicked button
        const clickBtn = document.getElementById(`lessonn-btn-${id}`);
        clickBtn.classList.add('active');
        displayLevelWord(json.data);
    } );
};

const loadwordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayWordDetail(data.data);


};

const displayWordDetail = (word) => {
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
         <div class="">
                <h2 class="text-2xl font-bold     "> ${word.word} (<i class="fa-solid fa-microphone-lines"></i>   :${word.pronunciation})</h2>
            </div>

            <div class="">
                <h2 class="font-bold">Meaning</h2>
                <p class="font-bangla">${word.meaning}</p>
            </div>

            <div class="">
                <h2 class="font-bold">Example</h2>
                <p class="">${word.sentence}</p>
            </div>

            <div class="">
                <h2 class="font-bold">Synonyms</h2>
                <div class="">${createElements(word.synonyms)}</div>
            </div>
    `;

    document.getElementById('word_modal').showModal();
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length === 0){
        wordContainer.innerHTML = `
         
         <div class="text-center col-span-full space-y-6 py-10">

         <img class="w-30 mx-auto" src="./assets/alert-error.png" alt="No Data Found" />
        <p class="text-xl font-medium text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p> 
        <h2 class="text-3xl font-bold font-bangla">নেক্সট Lesson এ যান।</h2>
       </div>

        `;
        manageSpinner(false);
        return;
}

   words.forEach((word) => {
    console.log(word);
    const card = document.createElement('div');

    card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p class="font-semibold">Meaning | Pronunciation</p>
            <div class="font-semibold text-2xl font-bangla">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'}/ ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>

            <div class="flex justify-between items-center">
                <button onclick="loadwordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
    `;

    wordContainer.appendChild(card);
   });
   manageSpinner(false);
};

const displayLesson = (lessons) => {
    // 1.get the container and empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // 2. get into every lessons

    for(let lesson of lessons){
        //  3.create Element

        console.log(lesson);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
                <button id='lessonn-btn-${lesson.level_no}' onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                  ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button> 
                  `;
    //     4.append into container
        levelContainer.appendChild(btnDiv);

    }
   
};

loadLessons();

document.getElementById('btn-search').addEventListener('click', () => {

    removeActive(); // remove active class from all buttons
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
        const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));

        displayLevelWord(filterWords);
    });

    
});