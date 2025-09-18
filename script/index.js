const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
};

const loadLevelWord = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelWord(json.data))
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
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
    `;

    wordContainer.appendChild(card);
   });
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
                <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button> 
                  `;
    //     4.append into container
        levelContainer.appendChild(btnDiv);

    }
   
};

loadLessons();