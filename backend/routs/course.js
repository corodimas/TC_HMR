const express = require("express")
const router = express.Router()
const { Courses } = require('../models')

router.get("/", async (req,res)=>{
    const list_of_courses = await Courses.findAll();
    res.json(list_of_courses)
});


router.get('/:PatientId', async (req,res) =>{
    const PatientId = req.params.PatientId
    const courses = await Courses.findAll({where: {patientId: PatientId}});
    res.json(courses);
});

router.post("/", async (req,res)=>
{
    const courses = req.body
    await Courses.create(courses)
    res.json(courses);
})

router.delete('/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const deletedCourse = await Courses.destroy({ where: { id: courseId } });
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
      // Find the course by its ID
      const courseToUpdate = await Courses.findByPk(courseId);
  
      if (!courseToUpdate) {
        return res.status(404).json({ error: "Course not found." });
      }
  
      // Update the course_status property
      courseToUpdate.course_status = newCourseStatus;
  
      // Save the changes to the database
      await courseToUpdate.save();
  
      res.json(courseToUpdate);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the course status." });
    }
  });
  

module.exports = router