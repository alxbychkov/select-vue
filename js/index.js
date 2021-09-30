
new Vue({
    el: '#app',
    data() {
        return {
            districts: [
                'Ново-Переделкино',
                'Обручевский',
                'Перово',
                'Печатники',
                'Орехово-Матвеевское Северное и еще какое-то'
            ],

            inputValue: '',
        }
    },
    methods: {
        selectClickHandler(e) {
            e.currentTarget.classList.contains('active') ? e.currentTarget.classList.remove('active') : e.currentTarget.classList.add('active')
            console.log(this)
        }
    }
})