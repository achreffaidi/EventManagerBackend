// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var contactController = require('./Controllers/contactController');
var userController = require('./Controllers/UserController');
var eventController = require('./Controllers/EventController');
var planController = require('./Controllers/planController');
var requestController = require('./Controllers/requestController');
var eventImageController = require('./Controllers/EventImageController');
var staffController = require('./Controllers/StaffController');
// Contact routes


router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/users/:user_id')
    .get(userController.view)


router.route('/events')
    .get(eventController.index)
    .post(eventController.new);

router.route('/events/:event_id')
    .get(eventController.view)
    .patch(eventController.update)
    .put(eventController.update)
    .delete(eventController.delete);



router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);


router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

router.route('/plan')
    .post(planController.createPlan)
router.route('/plan')
    .put(planController.updatePlan)
router.route('/plan')
    .get(planController.getPlans)
router.route('/plan')
    .delete(planController.deletePlan)

router.route('/event/request')
    .post(requestController.createRequest)


router.route('/event/image')
    .post(eventImageController.new)
router.route('/event/image')
    .get(eventImageController.view)


router.route('/staff')
    .get(staffController.index)
router.route('/event/staff')
    .post(staffController.new)
router.route('/event/staff')
    .get(staffController.getStaffByEvent)
router.route('/event/staff')
    .put(staffController.update)
router.route('/event/staff')
    .delete(staffController.delete)
router.route('/event/staff/permissions')
    .get(staffController.getPermissions)





// Export API routes
module.exports = router;