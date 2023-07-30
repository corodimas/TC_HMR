const express = require("express")
const router = express.Router()
const { Courses ,Coursest } = require('../models')

router.get("/", async (req,res)=>{
    const list_of_courses = await Courses.findAll();
    res.json(list_of_courses)
});


router.get('/:PatientId', async (req,res) =>{
    const PatientId = req.params.PatientId
    const courses = await Courses.findAll({where: {patientId: PatientId, course_status : "ongoing"}});
    res.json(courses);
});

router.get('/cf/:PatientId', async (req,res) =>{
  const PatientId = req.params.PatientId
  const courses = await Courses.findAll({where: {patientId: PatientId, course_status : "finished"}});
  res.json(courses);
});


router.get('/coursest/:PatientId', async (req,res) =>{
  const PatientId = req.params.PatientId
  const courses = await Coursest.findAll({where: {patientId: PatientId}});
  res.json(courses);
});

router.post("/", async (req, res) => {
  const courses = req.body;
  const createdCourse = await Courses.create(courses); 
  const courseId = createdCourse.id; 

  const number = courses.course_times; 
  const coursestData = [];
  for (let i = 0; i < number; i++) {
      coursestData.push({
          course_number: i,
          course_price: courses.course_price / courses.course_times,
          course_employee_id: "-1",
          course_status: "ongoing",
          CourseId : courseId,
          patientId : courses.patientId,
      });
  }
  await Coursest.bulkCreate(coursestData);

  res.json(coursestData);
});


router.delete('/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const deletedCourse = await Courses.destroy({ where: { id: courseId } });
      const deletedCoursest = await Coursest.destroy({where: {CourseId: courseId}})
      if (deletedCourse) {
        res.status(200).json({ message: "Course deleted successfully." });
      } else {
        res.status(404).json({ error: "Course not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the course." });
    }
  });

  router.put('/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const newCourseStatus = req.body.course_status;
    try {
      const courseToUpdate = await Courses.findByPk(courseId);
      if (!courseToUpdate) {
        return res.status(404).json({ error: "Course not found." });
      }
      courseToUpdate.course_status = newCourseStatus;
      await courseToUpdate.save();
      res.json(courseToUpdate);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the course status." });
    }
  });

  router.put('/coursest/:courseId/:coursestId', async (req, res) => {
    const courseId = req.params.courseId;
    const coursestId = req.params.coursestId
    const newCourseStatus = "finished";
    try {
      const courseToUpdate = await Coursest.findOne({ where: { CourseId: courseId, course_number: coursestId } });
      if (!courseToUpdate) {
        return res.status(404).json({ error: "Course not found." });
      }
      courseToUpdate.course_status = newCourseStatus;
      await courseToUpdate.save();
      res.json(courseToUpdate);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the course status." });
    }
  });

  router.put('/courseUpdata/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const courseToUpdate = await Courses.findByPk(courseId);
      if (!courseToUpdate) {
        return res.status(404).json({ error: "Course not found." });
      }
      courseToUpdate.course_times = courseToUpdate.course_times-1;
      await courseToUpdate.save();
      res.json(courseToUpdate);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the course status." });
    }
  });

  router.put('/coursefinished/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const courseToUpdate = await Courses.findByPk(courseId);
      if (!courseToUpdate) {
        return res.status(404).json({ error: "Course not found." });
      }
      courseToUpdate.course_status = "finished";
      await courseToUpdate.save();
      res.json(courseToUpdate);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the course status." });
    }
  });


module.exports = router

