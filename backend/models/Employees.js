module.exports = (sequelize,DataType) =>{

    const Employees = sequelize.define("Employees",{

        name:{
            type:DataType.STRING,
            allowNull: false,
        },
        age:{
            type:DataType.INTEGER,
            allowNull: false,
        },
        role:{
            type:DataType.STRING,
            allowNull: false,
        },
        status:{
            type:DataType.STRING,
            allowNull: false,
        },
        department_id:{
            type:DataType.INTEGER,
            allowNull: false,
        },
    })
    return Employees
}