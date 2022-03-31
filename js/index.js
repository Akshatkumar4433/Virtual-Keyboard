const englishInLowerCase = ['q','w','e','r','t', 'y',
          'u','i','o', 'p','a','s',
          'd','f','g','h','j','k',
           'i', 'z','x',
           'c','v','b','n','m',];

const englishInUpperCase = englishInLowerCase.map(element => {
                              return element.toUpperCase();
                            })

const special = ['1', '2' ,'3','4','5','6' ,
                 '7','8','9','0',',','.',
                  '{',"}",'(', ")", '$','!',
                   "@",'#',"+",'-','/',
                    "*",'_',"%",];

//24
Vue.component('key',{
   props:['keyInfo'],
   template: `
    <button v-on:click = 'keyInfo.task(keyInfo.character)'
        v-bind:class = 'keyInfo.classes'>{{keyInfo.character}}</button>

   `,
})

data = {
     //alphabetList: this.alphabetListToDataset(english)
     languageInLowerCase:englishInLowerCase,
     languageInUpperCase: englishInUpperCase,
     special:special,
     alphabetList: [],
     displayText: "",
     is123: false,
     isShiftOn:false,
}

methods = {
     alphabetListToDataset: alphabetListToDataset,
     task:task,
}

new Vue({el:'#app',
        data,
        methods,
        created: function() {
          this.alphabetList = this.alphabetListToDataset(this.languageInLowerCase)
        },
       })



function alphabetListToDataset(alphabetList) {
     let Dataset = [];
     let KeyboardSize = 32;
     let task = this.task;
     for(let i = 0, j = 0; i<KeyboardSize; i++) {
       let element = {id:i+1,
                      character:'',
                      task:task,
                      classes:'box all-items'};
       if (i == 19) {
          element.character = 'shift';
          element.classes = element.classes + ' ' + 'item-shift'
       }
       else if (i == 27) {
          element.character = 'DEL';
          element.classes = element.classes + ' ' + 'item-DEL'
       }
       else if (i == 28) {
         element.character = 'MISC'
         element.classes = element.classes + ' ' + 'item-MICS'

       }
       else if (i == 29) {
          element.character = '123';
          element.classes = element.classes + ' ' + 'item-123'

       }

       else if (i == 30) {
         element.character = 'space';
         element.classes = element.classes + ' ' + 'item-space'
       }

       else if (i == 31) {
         element.character = 'return';
         element.classes = element.classes + ' ' + 'item-return'
       }

       else {
         element.character = alphabetList[j];
         element.classes = element.classes + ' ' + 'item-alphabets'
         j++;
       }
       Dataset.push(element);
     }
     return Dataset;
}

function task(character) {
    if (character == 'return') {
         this.displayText += '\n'
    }
    else if (character == 'DEL') {
         this.displayText = this.displayText.slice(0,this.displayText.length - 1);
    }
    else if (character == 'space') {
        this.displayText += " "
    }
    else if (character == '123') {
       if (!this.is123) {
         this.alphabetList = this.alphabetListToDataset(this.special);
         this.is123 = true
       }
       else {
         this.alphabetList = this.alphabetListToDataset(this.languageInLowerCase);
         this.is123 = false;
       }
    }
    else if (character == 'MISC') {
      console.log('do nothing')
    }
   else if (character == 'shift') {
       if (!this.isShiftOn && !this.is123) {
         this.alphabetList = this.alphabetListToDataset(this.languageInUpperCase)
         this.isShiftOn = true;
       }
       else {
         this.alphabetList = this.alphabetListToDataset(this.languageInLowerCase)
         this.isShiftOn = false;
       }
   }
   else {
   this.displayText += character;
 }
 }
