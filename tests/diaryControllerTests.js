const should = require('should');
const sinon = require('sinon');
const diaryController = require('../controllers/diaryController');

describe('Diary Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      const Diary = function (diary) { this.save = () => {}};

      const req = {
        body: {
            userID: 'wojciech.iskierka@protonmail.com'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = diaryController(Diary);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
