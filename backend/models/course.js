module.exports = (sequelize,DataType) =>{

    const Courses = sequelize.define("Courses",{

        department_id:{
            type:DataType.INTEGER,
            allowNull: false,
        },
        course_name:{
            type:DataType.STRING,
            allowNull: false,
        },
        course_detail:{
            type:DataType.STRING,
            allowNull: false,
        },
        course_price:{
            type:DataType.REAL,
            allowNull: false,
        },
        course_times:{
            type:DataType.INTEGER,
            allowNull: false,
        },
        course_comid:{
            type:DataType.INTEGER,
            allowNull: false,
        },
        course_status:{
            type:DataType.STRING,
            allowNull: false,
        },
        
    })
    Courses.associate = (models) =>{
        Courses.hasMany(models.Coursest,{
            onDelete: "cascade",
        });
    };
    return Courses
}