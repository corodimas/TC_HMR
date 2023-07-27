module.exports = (sequelize,DataType) =>{

    const patients = sequelize.define("patients",{

        name:{
            type:DataType.STRING,
            allowNull: false,
        },
        age:{
            type:DataType.INTEGER,
            allowNull: false,
        },
        department_id:{
            type:DataType.INTEGER,
            allowNull: false,
        },
    })

    patients.associate = (models) =>{
        patients.hasMany(models.Courses,{
            onDelete: "cascade",
        });
    };
    return patients
}