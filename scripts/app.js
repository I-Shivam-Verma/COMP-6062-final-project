new Vue({
    el: '#app',
    data: {
        fact: '',
        weather: {
            temperature: '',
            wind: '',
            description: '',
        },
        wordDefinition: {
            word: '',
            phonetic: '',
            partOfSpeech: '',
            definition: ''
        },
        cityName: 'London'
    },
    methods: {
        getFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.fact = data.text;
                });
        },
        getWeather() {
            fetch(` https://weather-data.liamstewart.ca/${this.cityName}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                });
        },
        defineWord(word) {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(response => response.json())
                .then(data => {
                    const entry = data[0];
                    this.wordDefinition.word = entry.word;
                    this.wordDefinition.phonetic = entry.phonetic;
                    this.wordDefinition.partOfSpeech = entry.meanings[0].partOfSpeech;
                    this.wordDefinition.definition = entry.meanings[0].definitions[0].definition;
                });
        }
    },
    mounted() {
        this.getFact();
        this.getWeather();
    }
});
