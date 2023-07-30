module.exports = (sequelize,DataType) =>{

    const Coursest = sequelize.define("Coursest",{

        course_number:{
            type:DataType.INTEGER,
            allowNull: false,
        },
        course_price:{
            type:DataType.REAL,
            allowNull: false,
        },
        course_employee_id:{
            type:DataType.INTEGER,
            allowNull: false,
        },
        course_status:{
            type:DataType.STRING,
            allowNull: false,
        },
        patientId:{
            type:DataType.INTEGER,
            allowNull: false,
        },
        
    })
    return Coursest
}