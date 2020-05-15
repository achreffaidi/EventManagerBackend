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
var eventCountingController = require('./Controllers/EventCountingController')
var timeSlotController = require('./Controllers/TimeSlotController')
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


router.route('/plan')
    .post(planController.createPlan)
router.route('/plan')
    .put(planController.updatePlan)
router.route('/plan')
    .get(planController.getPlans)
router.route('/plan')
    .delete(planController.deletePlan)




router.route('/event/image')
    .post(eventImageController.new)
router.route('/event/image')
    .get(eventImageController.view)


router.route('/staff')
    .get(staffController.index)
router.route('/staff/events')
    .get(staffController.getEventsByStaff)

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


router.route('/event/request')
    .post(requestController.createRequest)
router.route('/event/request')
    .get(requestController.getRequestsByEvent)
router.route('/user/request')
    .get(requestController.getRequestsByUser)
router.route('/event/request')
    .put(requestController.update)



router.route('/presence')
    .get(eventCountingController.getEventCountingById)
router.route('/event/presence')
    .post(eventCountingController.new)
router.route('/event/presence')
    .get(eventCountingController.getEventCountingList)
router.route('/event/presence')
    .put(eventCountingController.update)
router.route('/event/presence')
    .delete(eventCountingController.delete)
router.route('/event/presence/user')
    .post(eventCountingController.addPresence)


router.route('/Event/timeslot')
    .post(timeSlotController.new)
router.route('/Event/timeslot')
    .get(timeSlotController.getTimeSlotsByEvent)
router.route('/Event/timeslot')
    .delete(timeSlotController.delete)

router.route('/login')
    .post(userController.login)

// Export API routes
module.exports = router;
