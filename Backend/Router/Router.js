const { Router } = require("express");
const router  = Router();
const Controller_fxn = require('../Controlroom/Controller');
const authmiddleware = require('../middleware/auth');
const FeedBackcontroller = require('../Controlroom/Feedbackcontroller');
const HistorySaveController = require('../Controlroom/Datahandling');

router.post('/text_generator',Controller_fxn.Text_Generator);
router.post('/image_generator',Controller_fxn.Image_Generator);
router.post('/Ai_content_detector',Controller_fxn.AI_Content_Detector);
router.post('/Code_generator',Controller_fxn.Code_Generator);
router.post('/Image_detector',Controller_fxn.Image_detector);
router.post('/audio_generator',Controller_fxn.Video_generator);
router.post('/emailcode',Controller_fxn.SendEmailcode);
router.post('/verifycode',Controller_fxn.validateEmailcode);
router.post('/feedback',FeedBackcontroller.FeedBack);
router.post('/history-save',authmiddleware,HistorySaveController.History_content);
router.post('/userdata',authmiddleware,HistorySaveController.get_data);
router.post('/removedata',authmiddleware,HistorySaveController.Remove_Content);

module.exports = router;