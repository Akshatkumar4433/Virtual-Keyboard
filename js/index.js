const english = ['q','w','e','r','t', 'y',
          'u','i','o', 'p','a','s',
          'd','f','g','h','j','k',
           'i', 'z','x',
           'c','v','b','n','m',];

Vue.component('key',{
   props:['keyInfo'],
   template: `
    <button v-on:click = 'keyInfo.task(keyInfo.character)'>{{keyInfo.character}}</button>
   `,
})

data = {
     alphabetList: alphabetListToDataset(english)
}

new Vue({el:'#app',data})

function alphabetListToDataset(alphabetList) {
     let Dataset = [];
     let KeyboardSize = 31;
     for(let i = 0, j = 0; i<KeyboardSize; i++) {
       let element = {id:i+1,
                      character:'',
                      task:task};
       if (i == 19) {
          element.character = 'shift';
       }
       else if (i == 27) {
          element.character = 'Backspace';
       }
       else if (i == 28) {
          element.character = '123';
       }
       else if (i == 29) {
         element.character = 'space';
       }
       else if (i == 30) {
         element.character = 'return';
       }
       else {
         element.character = alphabetList[j];
         j++;
       }
       Dataset.push(element);
     }
     return Dataset;
}


/***************
These are expriemnt
*******/

function task(button) {
  console.log(button)
}
