const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let tagsSchema = mongoose.Schema({
        title: {type: String},
        description: {type: String},
});

const Tags = mongoose.model('Tags', tagsSchema);

module.exports = Tags;

var listOfTagsName = [
        "Боклyци", 
        "Коли", 
        "Подобрения", 
        "Светофар", 
        "Пешеходни", 
        "Тротоар", 
        "Селски", 
        "Басейн", 
        "Дърво", 
        "Пейки", 
        "Осветление", 
        "Сгради", 
        "Кошче", 
        "Дупки", 
        "Шахти", 
        "Предпазители", 
        "Пътни знаци", 
        "Язовир", 
        "Боядисване", 
        "Навеси"
];


module.exports.initialize = () => {
        listOfTagsName.forEach(function(name) {   
                Tags.findOne({title:  name}).then(tags =>{
                if(!tags){
                        let tag = {
                                title: name,
                                description: "Проблем със боклуци"
                        }
                        Tags.create(tag);
                }
                });
        });
}