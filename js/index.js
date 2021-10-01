Vue.component('custom-select', {
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
            this.$emit('list', false)
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
        },
    },
    computed: {
      filteredDistricts() {
          if (this.inputValue) {
            return this.districts.filter(item => item.name.toLowerCase().includes(this.inputValue.toLowerCase()));
          }
          return this.districts
        },
      showSelectedItems() {
          if (!this.selectedItems.length) {
            this.$emit('list', true)
            return 'Не выбрано'
          }
          return this.selectedItems.join(', ')
      }
    },
    props: [
        'title',
        'msg'
    ],
    template: `
        <div class="select-wrapper">
            <div class="select-title">{{ title }}</div>
            <div class="select" @click.stop="selectClickHandler">
                <div class="select__text">{{ showSelectedItems }}</div>
                <div class="select-dropdown" @click.stop>
                    <div class="select__input__wrapper">
                        <span class="icon__search"></span>
                        <input type="text" 
                            class="select__input" 
                            name="district" 
                            value="" 
                            placeholder="Поиск по районам" 
                            v-model="inputValue" 
                            @click.stop       
                        >
                        <span v-if="inputValue" class="icon__close" @click="inputValue = ''"></span>
                    </div>
                    <div v-if="selectedItems.length" class="select-dropdown__tags">
                        <div v-for="tag in selectedItems" class="tag__item" @click.stop>
                            <p class="tag__item__title">{{ tag }}</p>
                            <div class="tag__item__close" @click.stop="removeTag(tag)"></div>
                        </div>
                    </div>
                    <div class="select-dropdown__list">
                        <label v-for="disctrict in filteredDistricts" 
                                class="list__item"
                                :class="{disabled: !disctrict.enable}" 
                                :key="disctrict.id"
                        >
                            <input type="checkbox" 
                                class="list__item__chechbox" 
                                value="disctrict.name" 
                                @change="itemLabelCheck(disctrict)"
                                :checked="selectedItems.includes(disctrict.name)"
                            >
                            <span class="list__item__box"></span>
                            <span class="list__item__value" 
                                    :class="{formated: inputValue}"
                                    v-html="wrapWord(disctrict.name, inputValue)"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="select-error">{{ msg }}</div>
        </div>
    `
})

new Vue({
    el: '#app',
    data() {
        return {
            errorMessage: false
        }
    },
    methods: {
        onList(data) {
            console.log(data)
            this.errorMessage = data
        }
    },
    created() {
        document.addEventListener('click', (e) => {
            if (document.querySelector('.select').classList.contains('active')) {
                document.querySelector('.select').classList.remove('active')
                this.errorMessage
                    ? document.querySelector('.select').classList.add('error')
                    : document.querySelector('.select').classList.remove('error')
            }
        });
    }
})