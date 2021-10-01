
new Vue({
    el: '#app',
    data() {
        return {
            districts: [
                {
                    id: 0,
                    name: 'Ново-Переделкино',
                    enable: true
                },
                {
                    id: 1,
                    name: 'Обручевский',
                    enable: false
                },
                {
                    id: 2,
                    name: 'Перово',
                    enable: true
                },
                {
                    id: 3,
                    name: 'Печатники',
                    enable: true
                },
                {
                    id: 4,
                    name: 'Орехово-Матвеевское Северное и еще какое-то Южное',
                    enable: true
                },
                {
                    id: 5,
                    name: 'Гольяново',
                    enable: true
                },
                {
                    id: 6,
                    name: 'Орехово',
                    enable: true
                }
            ],
            
            inputValue: '',

            selectedItems: []
        }
    },
    methods: {
        selectClickHandler(e) {
            e.currentTarget.classList.contains('active') ? e.currentTarget.classList.remove('active') : e.currentTarget.classList.add('active')
            e.currentTarget.classList.contains('error') && e.currentTarget.classList.remove('error')
            this.inputValue = ''
        },

        itemLabelCheck(item) {
            if (this.districts.find(i => i.name === item.name).enable && !this.selectedItems.find(i => i === item.name)) {
                this.selectedItems.push(item.name)
            }
            else {
                this.selectedItems = [...this.selectedItems].filter(i => i !== item.name)
            }
        },

        removeTag(item) {
            if (this.selectedItems.indexOf(item) !== -1) this.selectedItems = [...this.selectedItems].filter(i => i !== item)
        },

        wrapWord(word, findText) {
            if (findText) {
                const index = word.toLowerCase().indexOf(findText.toLowerCase())
                const selectedWord = word.substring(0, index) + '<i class="highlighted">' + word.substring(index,index + findText.length) + "</i>" + word.substring(index + findText.length)
                return selectedWord
            } else return word
        }
    },
    computed: {
      filteredDistricts() {
          if (this.inputValue) {
            return this.districts.filter(item => item.name.toLowerCase().includes(this.inputValue.toLowerCase()));
          }
          return this.districts
        },
      showSelectedItems() {
          if (!this.selectedItems.length) return 'Не выбрано'
          return this.selectedItems.join(', ')
      }
    },
    created() {
        document.addEventListener('click', (e) => {
            if (document.querySelector('.select').classList.contains('active')) {
                document.querySelector('.select').classList.remove('active')
                this.selectedItems.length
                    ? document.querySelector('.select').classList.remove('error')
                    : document.querySelector('.select').classList.add('error')
            }
        });
    }
})