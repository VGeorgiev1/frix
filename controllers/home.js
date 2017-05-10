const mongoose=require('mongoose');
const Problem=mongoose.model('Prob');



module.exports = {
  index: (req, res) => {
      Problem.find({}).populate('author').then(problems => {
          res.render('home/index', {problems: problems});
      })
  }
};